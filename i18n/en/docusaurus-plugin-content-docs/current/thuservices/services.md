---

---
# Guide to Using THU Services (Primarily for Linux Users)

This article focuses on usage instructions for some Tsinghua services on Linux machines, including remote servers.

It also includes a guide for activating the campus-exclusive Windows 10.

## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

As recommended by the campus network, you should use at least the campus network-provided services when configuring DNS and NTP.

Currently, only campus network-provided DNS can be used within the campus network; other DNS servers are not guaranteed to work.

## SSLVPN

There is no PULSE SECURE client for Linux machines. Besides using WEB VPN, you can also use `openconnect` to connect to the Tsinghua VPN.

For Debian-based systems, including Ubuntu, you can use:

```bash
$ apt-get install openconnect
```

For Arch Linux, you can use:

```bash
$ pacman -S openconnect
```

to install the software. For other distributions, please consult therespective package sources.

After installation, use:

> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn

When specifying the Juniper protocol, the client will not be assigned an IPv6 address. If you switch to Pulse Connect Secure, you can obtain an IPv6 address. You also need to specify the UserAgent to correctly obtain IPv6 routes; otherwise, it will attempt to route all IPv6 traffic through the VPN.

The following method correctly obtains IPv6 address and routes (specifically 2402:f000::/32):

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

After entering your username and password, you will be connected to the campus network and can access on-campus services (INFO/USEREG).

It is worth noting that traffic unrelated to Tsinghua will still go through the original routing, which differs from the behavior on Windows. (This needs verification.)

## Network Authentication

### Campus Network Basics

[Introduction to Tsinghua University Campus Network](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf) (Link broken due to website upgrade; see our [backup](/docs/thuservices/file/CampusNetworkLectureNotes201909.pdf))

[Network Access Authentication Instructions](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf) (Our [backup](/docs/thuservices/file/RealNameAuthentication20190121.pdf))

[Tsinghua University Campus Wired LAN User Authentication System FAQ](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf) (Link broken due to website upgrade; see our [backup](/docs/thuservices/file/RealNameAuthenticationFAQ20190614.pdf))

TL;DR of the above documents: Internet access on the campus network involves two steps — one is "network access" (准入, admission), and the other is "external access" (准出, egress).

Without either admission or egress, a machine can only ping `166.111.8.28` and `2402:f000:1:801::8:28`, if you have the corresponding v4 and v6 addresses. Other on-campus addresses are unreachable.

For IPv4: with admission but without egress, the machine can ping on-campus machines but cannot ping off-campus machines, i.e., cannot access the external internet. Only with both admission and egress can the machine connect to the external network.

For IPv6: v6 only requires admission — once admitted, the machine can connect to the external network.

For Layer 2 access machines (Zijing dormitory network, teaching building wireless networks, some department networks), v4 and v6 authentication are linked — when v4 is admitted, v6 is admitted simultaneously. For Layer 3 access machines (some department networks), v4 and v6 require separate admission.

`Tsinghua-Secure` uses a different authentication system.

### CLI Authentication & Auto Authentication

See the authentication tools summary in [utils.md](utils.md).

The following references [GoAuthing](https://github.com/z4yx/GoAuthing).

#### CLI Authentication

This software implements seven main functions:

```bash
auth-thu auth # v4 admission
auth-thu deauth # revoke v4 admission
auth-thu auth -6 # v6 admission
auth-thu deauth -6 # revoke v6 admission
auth-thu login # v4 egress
auth-thu logout # revoke v4 egress
auth-thu online # keep the machine online
```

Regular users can place it in their home directory and use it as a command-line tool to meet most authentication needs.

Known issue: After a user uses `auth-thu auth -C` (admission only), calling `auth-thu login` (egress only) will fail.

#### Auto Authentication

System administrators may need servers to authenticate automatically.

After downloading the files, place them in the appropriate directory (e.g., /usr/local/bin), and place the configuration file in a suitable directory.

To achieve automatic **egress**, place the included `goauthing.service` or `goauthing@.service` in the `/etc/systemd/system/` folder, adjust the contents to match the program file and configuration file paths, and use:

```bash
$ systemctl enable goauthing.service
```

to start the corresponding service, achieving automatic authentication. If you want account information stored in the user's home directory instead of `/etc`, refer to `goauthing@.service`.

To achieve automatic `v6` admission, refer to `goauthing6.service` and `goauthing6@.service`. If you only want automatic v4 admission, change `auth` to `auth -C` in `goauthing.service` and remove the `login` line.

If any packager packages this, please PR. Currently, the `auth-thu-bin` package exists in the AUR (the `auth-thu` package is outdated).

### Remote Server Proxy Authentication

(From the author's experience, usereg provides minimal feedback on admission/egress success or failure. It is recommended to use CLI and web authentication, and use usereg only as a status dashboard.)

On some servers where you cannot open [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn) in a browser for authentication, you can only use [CLI tools](### CLI Authentication & Auto Authentication) or "proxy admission" to achieve admission.

For proxy authentication, you first need to know the server's IPv4 address, in the form `166.111.x.x`, `59.66.x.x`, or `101.x.x.x`. Then open [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn), go to the "Proxy Admission" section, and enter the IP to gain admission. During admission, you can choose whether to enable egress.

For some Layer 3 access machines, v6 admission can also be achieved through "Proxy Admission."

For servers that have admission but no egress, you can use "Connect Other IP" to achieve egress.

PRs are welcome regarding admission and egress issues.

PRs are welcome regarding the behavior of IPv4 and IPv6 during admission/egress connection and disconnection, as well as the behavior of on-campus Layer 2/Layer 3 access.

### Remote Server Web Authentication

Sometimes the information in `usereg` is inaccurate. If you can still `ssh` into the machine, besides the previously mentioned "CLI Authentication," you can use the following option when logging in:

```
ssh -D <port> host
```

This creates a socks5 proxy on your local machine at `<port>`. If you use this proxy in your browser, you can perform web authentication as usual.

It is especially important to note that you cannot directly visit auth4/auth6 for authentication (refer to the FAQ). You need to access auth4/auth6 through redirection to obtain the correct ac_id. Generally, you can access info/learn/login for redirection, or use 3.3.3.3 and [3:3:3::3] for redirection. The latter is a convenient way for Layer 3 access users to reach auth6.

### Tsinghua-Secure

If you are on campus, first connect to `Tsinghua-Secure Wireless Network Usage Guide` and go to [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn). After logging in, set the Tsinghua-Secure password under "Self-Registration and Password Change." This password does not need to match your INFO password.

#### NetworkManager

After setting up, you can use `NetworkManager` to connect to this WiFi. Refer to the ITS documentation [Tsinghua University Wireless Campus Network 802.1x Authentication Login Client Configuration Guide](https://its.tsinghua.edu.cn/info/1333/2318.htm) (Our [backup](/docs/thuservices/file/tsinghua-secure-config.pdf)).

Sample configuration `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection`:

```
[connection]
id=Tsinghua-Secure
uuid=44638cf4-782e-4aaa-9ab9-f7a7e68de54c
type=wifi
permissions=
timestamp=1661836652

[wifi]
mac-address-blacklist=
mode=infrastructure
seen-bssids=30:7B:AC:09:BF:EB;30:7B:AC:09:DD:8B;30:7B:AC:09:EF:CB;30:7B:AC:0A:18:2B;30:7B:AC:40:7F:CC;30:7B:AC:40:80:AC;30:7B:AC:40:A0:8A;30:7B:AC:65:0D:2B;30:7B:AC:65:22:6B;30:7B:AC:67:A5:4A;30:7B:AC:67:ED:8A;30:7B:AC:67:F5:8A;30:7B:AC:67:FC:4A;30:7B:AC:67:FC:59;30:7B:AC:92:ED:0C;30:7B:AC:93:08:8A;30:7B:AC:93:0F:CC;30:7B:AC:93:1D:6C;30:7B:AC:93:1D:7A;30:7B:AC:93:2B:2C;30:7B:AC:93:32:2C;30:7B:AC:93:33:2C;30:7B:AC:98:C0:CA;30:7B:AC:98:C1:0C;30:7B:AC:98:C1:CA;30:7B:AC:98:C5:6A;30:7B:AC:98:C8:0A;70:D9:31:23:AF:D2;94:28:2E:3F:ED:CA;94:28:2E:40:0E:CA;A8:58:40:5A:66:B2;A8:58:40:5B:7A:D2;A8:58:40:D5:D1:12;A8:58:40:D5:D3:22;A8:58:40:D5:D3:32;A8:58:40:D6:03:F2;A8:58:40:D6:25:F2;A8:58:40:D6:3C:F2;A8:58:40:D6:3F:52;A8:58:40:D6:44:B2;A8:58:40:D6:45:72;A8:58:40:D6:97:12;A8:58:40:D7:14:D2;
ssid=Tsinghua-Secure

[wifi-security]
key-mgmt=wpa-eap

[802-1x]
eap=peap;
identity=<username>@tsinghua
password=<redacted>
phase2-auth=mschapv2

[ipv4]
dns-search=
method=disabled

[ipv6]
addr-gen-mode=eui64
dns-search=
ignore-auto-dns=true
method=auto
token=::114:514:1919:810

[proxy]
```

This sample configuration only enables IPv6 and obtains a specific suffix (please choose your own suffix to avoid address collisions), and uses the `@tsinghua` identity to ensure it does not occupy an egress slot.

It is particularly important to note that if you simultaneously meet all three of the following conditions:

1.  `NetworkManager` uses the `wpa_supplicant` backend
1.  You are using `openssl` version 3.0.0 or above
1.  Your distribution has not applied the [patch to fix tls 1.0/1.1 connections](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2) to `wpa_supplicant` (currently confirmed: Ubuntu has the patch, NixOS does not)

Then your `NetworkManager` may be unable to connect to `Tsinghua-Secure` because tls 1.0 connections are disabled. In this case, there are two solutions — either one will work:

1.  Upgrade NetworkManager to `1.41.5-dev` or above. Specifically, ensure [this commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df) is included. Add a line `phase1-auth-flags=32` to the `[802-1x]` section of the configuration file (`NetworkManager`'s `tls-1-0-enable` option corresponds to `0x20`, which is `32` in decimal. This conversion is not currently documented, so the number 32 is not guaranteed to always be valid. A more reliable method is to manually use `nmcli` to set `802-1x.phase1-auth-flags` to `tls-1-0-enable` for Tsinghua-Secure).
1.  Apply the aforementioned patch to your `wpa_supplicant`.

#### wpa_supplicant

You can also use `wpa_supplicant` for WiFi connection. Install `wpa_supplicant`, edit `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`, where `XXXX` is your network card name, and enter the following configuration:

```
ctrl_interface=/var/run/wpa_supplicant
update_config=1

network={
        ssid="Tsinghua-Secure"
        proto=RSN
        key_mgmt=WPA-EAP
        pairwise=CCMP
        eap=PEAP
        identity="username"
        password="password"
        # If using openssl 3.0.0+ and your distro hasn't applied the relevant patch (see previous section), tls 1.0/1.1 is disabled by default, preventing connection to Tsinghua-Secure. The line below re-enables it.
        phase1="tls_disable_tlsv1_0=0"
        phase2="auth=MSCHAPV2"
        priority=9
}
```

Replace `username` and `password` with your account information. Then enter:

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

to connect.

Note: This configuration was contributed by [orv](http://hep.tsinghua.edu.cn/~orv).

#### iwd

Due to Tsinghua-Secure's certificate issues (the dhparams p length is only 1024, which does not meet the [Linux kernel's 1536 length requirement](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52)), and since iwd depends on the kernel's cryptographic tools, connecting to Tsinghua-Secure with iwd is not possible by default.

[NickCao](https://github.com/NickCao) provided the [dhack kernel module](https://github.com/NickCao/dhack) and an ell library patch (shown below). The former patches by hijacking the relevant symbols, while the latter directly replaces parameters in the source code when building packages with Nix. Users can follow this approach to build their own kernel and tools.

```nix
iwd.override {
  ell = ell.overrideAttrs (_: {
    postPatch = ''
      substituteInPlace ell/tls-suites.c \
        --replace 'params->prime_len < 192' 'params->prime_len < 128'
    '';
  });
}
```

Additional configuration:

```
[Security]
EAP-Method=PEAP
EAP-Identity=<username>
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=<username>
EAP-PEAP-Phase2-Password=<passwd>
[Settings]
AutoConnect=true
```

### Tsinghua-Secure Campus-Only Login Method

We noticed that the IPv4 address obtained after connecting to Tsinghua-Secure is automatically added to the egress table, which may unexpectedly displace existing egress devices.

Testing revealed that if the username used during login is "username@tsinghua" (e.g., lh14@tsinghua), the login behavior is the same as "campus-only login." In this case, v4 only has admission, while v6 has both admission and egress.

After authenticating this way, testing confirmed that egress can be achieved through "net.tsinghua.edu.cn," but the behavior differs on wired networks.

## Campus Network Characteristics Discussion

### Layer 2 Isolation / Neighbor Discovery Isolation

A major characteristic of the campus network is Layer 2 isolation / Neighbor Discovery isolation. For v4, it's the former; for v6, it's the latter. This mechanism is designed for security but is quite inconvenient for many developers/users.

This characteristic essentially means the core switch partitions the broadcast domain, even to the point where only one client and the gateway are in the same broadcast domain.

#### IPv4

When we are assigned an IP like 59.66.130.xx/24, we might find that we cannot connect to 59.66.130.yy/24. Note that these two are in the same /24, i.e., the same Layer 2 network. In this case, the two machines would discover each other through ARP, but under certain campus mechanisms, ARP does not work.

In this situation, the following routes need to be added on both machines:

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

Parameters should be modified according to the actual situation.

#### IPv6

Zijing's IPv6 does not have this issue because addresses are /128.

When we are on Tsinghua-Secure, addresses are assigned via SLAAC, meaning everyone's addresses are in the same /64. When machines want to communicate with each other, they need to discover each other through NDP. Due to certain campus network mechanisms, NDP may not succeed.

In this situation, the following routes need to be added on both machines:

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```

Parameters should be determined according to the actual situation: the first is the /64 prefix (refer to the obtained address or RA); the second is the gateway's link-local address (same as shown in the default route); the third is the wireless network interface.

### Low Port Blocking

According to the "Usage Guide" document mentioned earlier, IPv4 blocks ports 0-1024, 8000-8100, 3389, and 9100. Additionally, for well-known reasons, ports 1080, 4781, and 7890 are also blocked.

Starting from Fall 2022, IPv6 also blocks some low ports.

### Dynamic IP

For dynamic IPs, we can use DDNS. Major providers such as DNSPod, dns.he.net, and Cloudflare all offer this service.

Using dns.he.net as an example: first add an A/AAAA record and select DDNS. After creation, create an update Token (referred to as T). Write the following script:

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```

Note that the Token is T in the script. Modify other parameters as needed.

Use cron to execute this script periodically, for example every five minutes. Refer to https://crontab.guru/ for specific instructions.

#### IPv6 Static Suffix or Short IPv6 Address

Under SLAAC (common with Tsinghua-Secure), the last 64 bits of an IPv6 address can be decided by the client. We can configure a static suffix, or even a short suffix. If a machine stays in one location, the prefix can be considered nearly fixed (needs verification).

(Side note: The token tooling is barely mentioned in standards, documentation is scarce (IPv6 documentation is already scarce), and it's quite niche. After all, who needs a static suffix? For machines in the same subnet, rather than using static suffixes for communication (indeed, there's no suffix-only route entry, so reaching another machine in the network requires always prepending the prefix), it's better to configure a static private address.)

Normally, the assigned IPv6 addresses are quite complex because EUI64 or privacy extensions are used. For EUI64, you can spot the `ff:fe` field in the address.

We can configure a static suffix through iproute2 or traditional tools. For the latter, please Google; the iproute2 method is given here:

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

**Before** running this command, note that you need to disable `forwarding` on the network interface (**during configuration**; it can be re-enabled afterward), enable `accept_ra` and `autoconf`, and disable the v6 functionality of other DHCP clients.

(Side note: Although dhcpcd is a DHCP client, it also takes over SLAAC, which is annoying. Traditionally, you only need to enable `accept_ra` and `autoconf`, and the Linux kernel will automatically configure v6 addresses. If `forwarding=1`, we need to set `accept_ra=2`.)

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

Replace some parameters in the above commands as needed. We can put these commands in a startup script to automatically configure the token.

#### Attempting to Obtain a Specific IPv4/IPv6 Address

The university is lenient about specific address requests in DHCP requests (terminology differs for v4 and v6; stated imprecisely).

dhcpcd configuration:

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

Some information in the configuration has been redacted. Please refer to the man page and actual network environment for proper configuration.

Below are some logs to explore how this configuration takes effect. The author believes this configuration can only be used after the old lease expires or the old address is claimed by someone else.

```
Apr 02 07:00:21 Zenith dhcpcd[497]: enp3s0: IAID 64:1a:ff:ff
Apr 02 07:00:22 Zenith dhcpcd[497]: enp3s0: soliciting a DHCP lease (requesting 59.66.190.254)
Apr 02 07:00:22 Zenith dhcpcd[497]: enp3s0: offered 59.66.190.254 from 166.111.8.9
Apr 02 07:00:22 Zenith dhcpcd[497]: enp3s0: probing address 59.66.190.254/24
Apr 02 07:00:22 Zenith dhcpcd[497]: enp3s0: confirming prior DHCPv6 lease
Apr 02 07:00:32 Zenith dhcpcd[497]: enp3s0: failed to confirm prior DHCPv6 address
Apr 02 07:00:32 Zenith dhcpcd[497]: enp3s0: adding default route via fe80::9629:2fff:fe37:xxxx
Apr 02 07:00:33 Zenith dhcpcd[497]: enp3s0: ADV 2402:f000:4:3:888:1926:8:17/128 from fe80::9629:2fff:fe37:xxxx
Apr 02 07:00:34 Zenith dhcpcd[497]: enp3s0: REPLY6 received from fe80::9629:2fff:fe37:ffff
Apr 02 07:00:34 Zenith dhcpcd[497]: enp3s0: adding address 2402:f000:4:3:888:1926:8:17/128
```

### Departmental Network (Layer 3 Access) IPv6

Some departmental networks use Layer 3 access with SLAAC configured within the network.

Some machines (e.g., Windows defaults and some Linux defaults) with privacy extensions enabled will have constantly changing IPv6 addresses under SLAAC. Since campus admission is based on IPv6 addresses, the specific behavior is that IPv6 admission is lost after some time, requiring re-login to auth6.

One solution is to disable IPv6 privacy temporary addresses (Google for instructions); another is to use an automatic admission client, such as the previously mentioned auth-thu's goauthing6.service.

### Non-RFC-Compliant DHCPv6

> The university's DHCPv6 server may not recognize certain DUIDs and will not respond to such DHCP requests. Even after reporting this issue to the university and their attempts to have the vendor fix it, the problem persists.
>
> According to relevant sources, only DUID Type 1 (DUID-LLT) is recognized. The corresponding dhcpcd configuration is provided below.
>
> First, enable `duid` in `/etc/dhcpcd.conf` and ensure that `clientid` is not enabled. Then check the following file:
>
> ```
> $ cat /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
> ```
>
> If it starts with `00:01`, it indicates DUID-LLT; otherwise (or if the file doesn't exist), it needs to be changed to the above format. Also check whether the trailing `ff:ff:ff:ff:ff:ff` is the MAC address of the relevant network card; if not, change it accordingly.
>
> **Updated** testing found that we do not actually know how the university's DHCPv6 works — its behavior is essentially a mystery. Some succeeded by enabling Anonymize, while others failed even with it enabled.
>
> Some experiences can be referenced at https://pwe.cat/zijing-dhcpv6/

Recent attempts have found that using a newer version of `systemd-networkd` can reliably obtain addresses.

### 30-Minute Idle Disconnection from Network Access

According to the "Network Access Authentication Instructions" mentioned earlier, if a computer does not use the network for an extended period (currently 30 minutes), the authentication system will close its network connection. <del>Servers can ping ping.tsinghua.edu.cn once every 10 minutes if necessary.</del> (No longer effective.)

### Unable to Access External Network After Losing Authorization

Some long-running machines may lose egress, i.e., lose the ability to connect to the external network. In this case, many users may try to **authorize egress** through usereg or the command line, but find it unsuccessful. **On usereg, even if the machine appears in the egress table, internet access from the machine may still not work.** We believe this is due to state synchronization issues in some campus network equipment.

A possible solution is to first **log out of admission**, then re-admit and authorize egress. This may refresh the state of some campus equipment and allow egress to succeed. Warning! Logging out of admission is a very dangerous operation! You may experience SSH disconnection, permanently losing access to the machine! Only perform this operation if you fully understand its implications and know how to restore admission after logging out!

### Unable to Access External Network After Campus-Only Login

As mentioned above, Tsinghua-Secure has a campus-only login method. The command line (see relevant parameters) and web interface (the "campus-only" checkbox on the admission page) also have corresponding campus-only login options. However, some users have observed that after campus-only login, egress through net.tsinghua.edu.cn fails, and usereg egress also fails. Like the issue above, this is likely a state issue with some equipment, and currently has no solution.

### Other Machines Can Ping but Cannot SSH When Not Authenticated

The inability to SSH is determined by the pre-policy (refer to the "Tsinghua University Campus Wired LAN User Authentication System FAQ" in the Campus Network Basics section of this chapter).

The ability to ping is also determined by the pre-policy, though this is not documented; specifically, ICMP reply packets are allowed through when not authenticated.

## Tsinghua Cloud Drive

It is recommended to use the Linux client from [seafile.com/download](https://seafile.com/download) rather than the Terminal client, because the Terminal client requires an independent password that is different from the INFO password and cannot be obtained, making it impossible to log in through the Terminal client.

Since manually installing software is not recommended, please use your package manager to obtain the software. For Arch Linux users, the Linux client is:

```bash
pacman -S seafile-client
```

Not `pacman -S seafile`, which is the Terminal client. For other distributions, please find the corresponding package.

### Using the Terminal Client

The Terminal client supports Token-based synchronization since version 8.0.4. You can find repositories for most distributions (AMD64 architecture) at [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/). If the `seafile` or `seafile-cli` version in your package manager is below `8.0.4`, you can install it and refer to the file replacement method below, or compile the latest version manually.

#### Obtaining a Token

Log in to Tsinghua Cloud Drive in your browser. The `seahub_auth` cookie should follow the pattern `username(student-id@tsinghua.edu.cn)@Token`, where the last segment is the Token. Each account's Token is unique and does not expire.

After `seaf-cli` is working properly, you can use the command line for synchronization:

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### Replacing Partial Files for Token Login

`seaf-cli` essentially communicates with `seaf-daemon` through `pysearpc`, so lower-version `seafile` packages from most distribution repositories can still work normally when only `seaf-cli` is replaced. Here is a simple method to replace `seaf-cli` for Token login after installing the Terminal client:

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### Compiling the Terminal Client

The specific compilation process can be referenced at [build_seafile](https://manual.seafile.com/build_seafile/linux/), but note the following:

- Download and compile the latest source code or latest release from each repository
- The `ccnet` section in the documentation can be ignored — the repository has disappeared and there are no related dependencies
- `make` may fail randomly; you can try multiple times
- If `seaf-cli` reports errors after installation, such as `No module named 'seafile'`, refer to the previous section to manually copy the `seafile` package

### Chrome Warning About Dangerous Downloads

This phenomenon may be caused by certain users' peculiar actions that led Chrome to flag the Tsinghua Cloud Drive domain, causing all file downloads to trigger a potentially dangerous warning and be blocked.

Please ignore this warning. Of course, if you are actually downloading questionable files, please check yourself.

## ISATAP (Discontinued)

Currently, this service has been discontinued.

Refer to [ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn). There is also an [AUR package thu-isatap](https://aur.archlinux.org/packages/thu-isatap) for reference.

Currently, only on-campus public IPv4 addresses can use this service; off-campus access is not available. Note that `166.111.21.1` will not respond to ping packets.

### Getting IPv6 for PT

Since using SSLVPN from home provides an on-campus public IP, ISATAP can be used to obtain a Tsinghua IPv6 address for PT purposes. Details are not elaborated here.

## WIN 10 Activation

On Linux, use this command to obtain the relevant cmd instructions:

```
$ dig -t TXT win10.harrychen.xyz +short
```

Or on Windows, use:

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

Then execute the script while connected to SSLVPN to activate Windows.

## Licensed OS and Software Downloads

### ITS

Visit https://its.tsinghua.edu.cn and log in to obtain download links for licensed software including Win10, antivirus software, WPS, MS Visio, MS Visual Studio, MATLAB, etc.

### TUNA

Visit https://mirrors.tuna.tsinghua.edu.cn and click to get download links.

## Campus IP Ranges

The campus has 6 /16 blocks. Refer to https://bgp.he.net/AS45576

```
; Important campus services are mostly on this range, e.g., the homepage
; Server rooms also commonly use this range
; This range is also available in teaching buildings and libraries
166.111.0.0/16
; Commonly used for server rooms and department networks
101.5.0.0/16
101.6.0.0/16
; Zijing, Building C and other student areas, and southern residential areas
59.66.0.0/16
; Wireless network (two /16s are still not enough!)
183.172.0.0/16
183.173.0.0/16
; Internal use (probably for routers and other network infrastructure)
118.229.0.0/20
```

v6 generally uses `2402:f000::/32`. Some areas also use `2001:250:200::/48` (Network Research Institute). There is a `2001:da8:200::/48` range but it has not been seen in use.
