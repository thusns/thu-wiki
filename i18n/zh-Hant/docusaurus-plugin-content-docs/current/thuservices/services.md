# 清華服務使用指北（主要面向 Linux 用戶）

本文將重點放在清華一些服務在 Linux 機器，包括遠端伺服器上的使用說明

以及校園專供 Windows 10 的啟動指南


## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

依照校園網建議，在設定 DNS 和 NTP 時，至少要使用校園網路提供的服務。

目前，校園網內只能使用校園網路提供的 DNS，其餘 DNS 不保證工作。

## SSLVPN

在 Linux 機器上沒有 PULSE SECURE 用戶端，除了可以使用 WEB VPN 外，也可使用 `openconnect` 來做到連接清華VPN。

若是 Debian 系，包括 Ubuntu，可以使用

```bash
$ apt-get install openconnect
```

若是 Arch Linux，可以使用

```bash
$ pacman -S openconnect
```

安裝此軟體。其餘發行版請自行查閱相應源。

安裝完畢後，使用

>
> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn
>

指定協定為 Juniper 的情況下，用戶端不會被指派 IPv6 位址，如果改成 Pulse Connect Secure 則可以取得到一個 IPv6 位址。同時也需要指定 UserAgent 才能正確取得 IPv6 路由，否則會嘗試將所有 IPv6 流量路由到 VPN。

用如下的方式可以正確取得 IPv6 位址和路由（具體是 2402:f000::/32）：

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

輸入帳號及密碼後即連接上校園網，可存取校內服務（INFO/USEREG）。

值得注意的是，與清華無關的流量依舊依照原有路由發出，此行為與 Windows 下不同。 （此项需求证）

## 上網認證

### 校園網基礎知識

[清華大學校園網使用簡介](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf)（由於網頁升級連結已失效，可參閱本站的[備份](file/CampusNetworkLectureNotes201909.pdf)）

[存取上網使用說明](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf)（本站[備援](file/RealNameAuthentication20190121.pdf)）

[清華大學校園網路有線區域網路使用者進入系統使用說明（問與答）](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf)（由於網頁升級連結已失效，可參閱本站的[備份](file/RealNameAuthenticationFAQ20190614.pdf)）

上述文件太長不看版：在校園網中上網分為兩步，一步是准入，另一步是準出。

沒有准入與準出時，機器只能 ping 通 `166.111.8.28` 與 `2402:f000:1:801::8:28`，如果你有對應 v4 與 v6 位址。校內其他地址不通。

對於 IPv4 而言，當有准入而沒有準出時，機器可以 ping 通校內機器，但不能 ping 通校外機器，即不能上網。只有當有准入而且有準出時，機器可以連接外網。

對 IPv6 而言，v6 只有准入這一步驟，有了存取，即可以連接外網。

對於 2 層接入的機器（紫荊宿舍網，教學樓無線網絡，一些院系的網絡），v4 認證與 v6 認證是聯動進行的，即當 v4 准入時，v6 同時也准入。對於 3 層接取的機器（某些系的網路），v4 與 v6 需要分別准入。

`Tsinghua-Secure` 使用的是另一套認證系統。

### 命令列認證 自動認證

請參閱 [utils.md](utils.md) 中的認證工具總表。

以下參考 [GoAuthing](https://github.com/z4yx/GoAuthing)

#### 命令列認證

該軟體實現了七個主要功能，分別是

```bash
auth-thu auth # v4准入
auth-thu deauth # 解除v4准入
auth-thu auth -6 # v6准入
auth-thu deauth -6 # 解除v6准入
auth-thu login # v4准出
auth-thu logout # 解除v4准出
auth-thu online # 保持机器在线
```

普通用戶將其放在家目錄下，作為命令列工具使用，即可滿足大部分認證需求。

已知問題：在使用者通過`auth-thu auth -C`（僅准入）後呼叫`auth-thu login`（僅準出），準出會失敗。

#### 自動認證

對於系統管理員來說，可能存在伺服器實現自動認證的需求。

下載好檔案以後請合理放置在對應目錄（如 /usr/local/bin）下，同時將設定檔放在合理目錄下，即可使用

要做到自動 **準出**，需將其中附帶的 `goauthing.service` 或 `goauthing@.service` 放置 `/etc/systemd/system/` 資料夾下 ，並調整相應內容以符合程式檔案以及設定檔的路徑，使用

``` bash
$ systemctl enable goauthing.service
```

啟動對應服務，即可達到自動認證的目的。如果要實現帳戶資訊儲存在使用者家中目錄中而不是 `/etc` 中，可以參考 `goauthing@.service`。

如果要實現 `v6` 的自動准入，可參考 `goauthing6.service` 和 `goauthing6@.service`。如果只要 v4 的自動准入，需要將 `goauthing.service` 中的 `auth` 變為 `auth -C`，且刪除 `login` 一行。

如果有打包者將此打包，請 PR。目前在 AUR 中存在 `auth-thu-bin` 套件（`auth-thu` 套件已經過時）。

### 遠端伺服器代認證

（從筆者的經驗來看，usereg 的對准入準出成功和失敗的回饋較少，建議採用命令列以及網頁認證，而只將 usereg 作為狀態面板使用）

在某些伺服器上無法使用瀏覽器開啟 [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn) 來認證，只能使用 [命令列工具](### 命令行认证 自动认证) 或「准入代認證」的方式來實現准入。

對於代認證，需要先知道伺服器的 IPv4 位址，形如 `166.111.x.x` 或 `59.66.x.x` 或 `101.x.x.x`，之後開啟 [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) 「准入代認證」部分，填入 IP 即可准入，在准入時可以選擇是否開啟准出。

對於某些三層接取的機器，如果要實現 v6 的准入，也可在「准入代認證」中實現准入。

對於有些伺服器存在准入但沒有準出的情況，可以使用「連線其他 IP」來實現準出。

關於准入與准出的問題，歡迎 PR。

關於 IPv4 與 IPv6 在准入准出上線與斷線時的表現，以及校內二層接取/三層接取的表現，歡迎 PR

### 遠端伺服器網頁認證

有時 `usereg` 中的資訊並不準確，如果此時還能 `ssh` 登入機器，除了先前提到的「命令列認證」外，還可以在登入時使用選項

```
ssh -D <port> host
```

這樣在本地會搭建以 `<port>` 為連接埠的 socks5 代理，如果在瀏覽器中使用該代理，即可與往常一樣實現網頁認證。

尤其要注意的是，不能直接訪問 auth4/auth6 來進行認證（參考問與答），需要通過跳轉的方式來訪問 auth4/auth6 以獲取正確的 ac\_id.3.3 可以訪問 info/learn/login 來跳轉，也可通過 3.3.3.3 和 [3:3:3::3] 一般。後者對於三層存取的使用者來說是較為方便的存取 auth6 的方案。

### Tsinghua-Secure

如果是校內環境，先連線 `Tsinghua-Secure无线网使用指南` 進入 [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) , 登入後在 `自注册及修改口令处` 設定 Tsinghua-Secure 使用的密碼，此密碼不需要與 info 密碼相同。

#### NetworkManager

設定好後，可使用 `NetworkManager` 連線該 Wifi，可參考 its 的文件 [清華大學無線校園網 802.1x 認證登入用戶端設定說明](https://its.tsinghua.edu.cn/info/1333/2318.htm)（本站[備援](file/tsinghua-secure-config.pdf)）

範例配置 `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection` 如下

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

此範例配置僅啟用了 IPv6 並取得特定後綴（請自行挑選後綴以免位址相撞），同時使用了 `@tsinghua` 的 `identity` 以保證不佔用準出名額。

特別要注意的是，如果你同時符合下面三個條件：

1.  `NetworkManager` 使用了 `wpa_supplicant` 後端
1.  使用了 3.0.0 以上版本的 `openssl`
1.  使用的發行版沒有給 `wpa_supplicant` 打上 [修復 tls 1.0/1.1 連接的 patch](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2) （目前確認 Ubuntu 有 patch，NixOS 沒有 patch）

那麼你的 `NetworkManager` 可能由於 tls 1.0 連接被禁用而連不上 `Tsinghua-Secure`，此時有以下兩種解決方法，任何一種都能解決：

1.  升級 NetworkManager 到 `1.41.5-dev` 以上，準確的說是確保 [這個 commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df) 已經被包含。在上述設定檔的 `[802-1x]` 一節中加入一行 `phase1-auth-flags=32`（`NetworkManager` 中 `tls-1-0-enable` 此選項對應 `0x20`，換算成十進位是 `32`，這一換算關係目前沒有在文件裡記錄，所以不保證 32 這個數字總是有效 `32`，這個換算關係目前沒有在文件裡記錄，所以不保證 32 這個數字總是有效@ @ @ `tls-1-0-enable`）。
1.  給自己的 `wpa_supplicant` 打上前面提到的 patch。

#### wpa_supplicant

也可使用 `wpa_supplicant` 完成對應 wifi 連線。安裝 `wpa_supplicant`，編輯 `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`， 其中 `XXXX` 為本機網路卡名稱，輸入以下配置

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
        # 使用 3.0.0 及以上版本的 openssl，同时发行版没有打上相应 patch 的话（参见上一节），tls 1.0/1.1 会被默认禁用，无法连接 Tsinghua-Secure。下面这行可以解除禁用
        phase1="tls_disable_tlsv1_0=0"
        phase2="auth=MSCHAPV2"
        priority=9
}     
```

其中 `username` 與 `password` 為自己帳號對應資訊。之後輸入

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

即可連接。

註：本配置由[orv](http://hep.tsinghua.edu.cn/~orv)貢獻。

#### iwd

由於 Tsinghua-Secure 的憑證問題（dhparams 中 p 的長度僅為 1024，不符合 [Linux 核心的 1536 長度需求](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52)），而 iwd 依賴核心的密碼學工具，預設使用 iwd 無法連線。

[NickCao](https://github.com/NickCao) 為此提供了 [dhack 內核模組](https://github.com/NickCao/dhack) 與 ell 工具補丁（如下）；前者通過劫持相應符號實現補丁，後者在 nix 構建軟體包時直接替換源碼中的參數。用戶可以依此類推自行建立核心與工具。

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

另外配置如下

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

### Tsinghua-Secure 僅校內登入方式

我們注意到，連接 Tsinghua-Secure 後取得的 IPv4 位址會自動進入準出表中，有可能在未預期的情況下擠佔斷線已有的準出設備。

經過測試發現，如果登入時使用的 username 為「username@tsinghua」（例如lh14@tsinghua），那麼其登入行為與「僅校內登入」一樣。這種情況下v4只有准入，v6有准入與準出。

使用此方式認證後，筆者測驗可以透過「net.tsinghua.edu.cn」來準出，但有線網中這個行為不一樣。

## 校園網特性討論

### 二層隔離/鄰居發現隔離

校園網的一大特性，是二層隔離/鄰居發現隔離。對v4來說，是前者；對v6來說，是後者。這個機制為了安全而設計，但對不少開發者/使用者來說較為不方便。

這個特性本質上是核心交換器對廣播域進行了劃分，甚至使得只有一個客戶端與網關在一個廣播域中。

#### IPv4

當我們分配到例如 59.66.130.xx/24 的 IP 時，如果我們想要連接 59.66.130.yy/24，我們可能會發現無法連線。注意到這兩個在一個 /24 中，即一個二層中，這種情況下兩台機器會透過ARP發現對方，但在學校的一些機制下，ARP不能工作。

這種情況下，需要在兩台機器上增加以下路由。

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

需根據實際情況修改對應參數。

#### IPv6

紫荊的 IPv6 不存在該問題，由於其位址是 /128 的。

當我們在一個 Tsinghua-Secure 下時，我們會透過 SLAAC 分配地址，即大家的地址都在一個同一個 /64 下，當互相之間想通信時，需要透過 NDP 進行發現。由於校園網的一些機制，NDP可能不會成功。

這種情況下，需要在兩台機器上增加以下路由

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```
參數需要根據實際情況確認，第一個為 /64 的前綴，可以參考獲得的位址或參考 RA 來書寫，第二個為網關的 LL 位址，與預設路由中顯示的位址相同，第三個為無線網路卡。

### 低埠阻斷

依照前面的「使用簡介」文檔，IPv4 對 0 到 1024，8000 到 8100，3389 以及 9100 連接埠進行阻斷。另外由於眾所周知的原因，1080、4781、7890 埠也被阻斷。

2022 年秋季開始，IPv6 對低埠部分進行阻斷。

### 動態 IP

對於動態IP，我們可以使用 DDNS 解決，各大供應商，例如 DNSPod，dns.he.net，cloudflare 都提供了該服務。

以 dns.he.net 為例，先增加一個 A/AAAA 記錄，並選擇使用 DDNS，在建立好後建立更新 Token，記為 T。我們書寫以下腳本

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```
注意Token為其中的T。其餘參數依需求修改。

並用 cron 定期執行該腳本，例如每五分鐘一次。可參考 https://crontab.guru/ 指令以取得具體闡釋。

#### IPv6 靜態後綴或短 IPv6 位址

我們知道，在 SLAAC 下（常見於Tsinghua-Secure），IPv6 位址的後64位元可以由客戶端自行決定，這時我們可以配置靜態後綴，乃至短後綴，如果一個機器只在一個地點下，幾乎可以認為前綴固定（需要驗證）。

（吐槽：token 這套工具，幾乎不在標準裡面被提及，文檔也少（IPv6 的文檔本來就少），還是很小眾的東西；畢竟誰需要靜態後綴呢，同一個子網下的機器，與其使用靜態後綴進行通信（沒錯，沒有隻有後綴的路由項，所以到網內另一台機器需要一個靜態後綴的靜態

往常我們分配到的 IPv6 較複雜，這是因為使用了 EUI64 或隱私擴展，對於EUI64，可以在位址中發現 `ff:fe` 的欄位。

我們可以透過 iproute2 或傳統套件配置靜態後綴，後者的使用方法請谷歌，前者的方法在此給出。

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

在執行此命令 **之前**，我們需要注意，我們需要將網卡的 `forwarding` 關閉（ **在配置時** ，配置後可以打開轉送），並打開 `accept_ra` 與 `autoconf`，並將其他 dhcp 客戶端的 v6 功能關閉。

（吐槽：dhcpcd 雖然說是個 dhcp 用戶端，它把 SLAAC 的事情也接管了，就很惱。按照傳統只需要開了 `accept_ra` 與 `autoconf`，Linux 核心就會自動配置v6位址。如果 `forwarding=1`時，我們需要使 `accept_ra=2`）

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

以上命令的一些參數請按需替換。我們可以將以上指令放在啟動腳本中，使得自動設定 token。

#### 嘗試取得某一特定IPv4、IPv6位址

你校對於DHCP請求（v4與v6術語不同，不嚴謹表述）中的特定地址請求是寬容的。

dhcpcd 配置

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

配置中某些資訊已編輯，請參考 man page 與實際網路環境來進行設定。

以下附上一些 log，來探討該配置生效的過程。筆者認為，需要在舊 lease 失效或舊地址被人搶佔後該配置才能使用。

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

### 系所網路（三層存取）的 IPv6

有些系所網是三層連接的校園網在網內配置的是 SLAAC。

有些機器（例如 Windows 的預設設定和一些 Linux 的預設設定）配置了隱私擴充後，在 SLAAC 環境下其 IPv6 位址會不斷改變，由於學校的存取是對 IPv6 位址進行的，具體表現就是在用 auth6 准入 IPv6 一段時間後就失去了准入 auth6。

一種方法是關掉 IPv6 隱私臨時位址（可 Google 查閱相關資料），另一種方式是使用自動存取用戶端，例如前面提到的 auth-thu 的 goauthing6.service

### 不符合 RFC 的 DHCPv6

> 你校的 DHCPv6 server 會不承認某些 DUID，對於這樣的 DHCP 請求會不回應。即使向學校反映問題，學校嘗試讓廠商修復後，問題仍然存在。
>
> 根據相關人士訊息，只有 DUID Type 1，也就是 DUID-LLT 被承認，以下給出 dhcpcd 的相應配置方式。
>
> 先將 `/etc/dhcpcd.conf` 中的 `duid` 打開，同時保證沒有開啟 `clientid`。然後我們檢查下列文件
>
> ```
> $ cat /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
> ```
>
> 若以 `00:01` 開頭，則表示為 DUID-LLT，否則（或檔案不存在）需改為上述格式。同時需要檢查最後的 `ff:ff:ff:ff:ff:ff` 是否為相關網路卡的MAC位址，如果不是需要更改為對應位址。
>
> **更新** 的測試發現，我們並不知道你校的 DHCPv6 是如何運作的，其如何工作完全是玄學。有的開啟了 Anonymize 即可使用，有的開啟了也嘗試失敗。
>
> 一些體驗可以參考 https://pwe.cat/zijing-dhcpv6/

最近的嘗試發現，使用較新版本的 `systemd-networkd` 能穩定地取得位址。

### 30分鐘無流量掉入

根據先前提到的《准入上網使用說明》，電腦長時間（目前為 30 分鐘）不使用網路時，認證系統會關閉其網路連線； <del>伺服器如有必要可每 10 分鐘 ping 1 次 ping.tsinghua.edu.cn。 </del>（已失效）

### 掉准出後無法準出

某些長久運作的機器可能掉準出，即無法連接校外網。這種情況下，不少同學可能在 usereg 或命令列中嘗試 **準出** ，但是發現準出不成功。 **在 usereg 上，即使顯示機器在準出表中，在機器上也無法存取校外網路** 。我們認為這是校園網的某些設備的狀態同步可能出現了問題。

對於這種問題，有一種可能的解決嘗試，就是先將登出 **准入** ，然後再准入並准出，這樣可能會刷新學校某些機器的狀態，從而使得准出能成功。注意！登出准入是非常危險的操作！您可能會經歷 ssh 斷線，從而與機器永久失聯！請在充分了解該操作的意義與知道如何在登出准入後恢復准入的情況下操作！

### 進入後（僅校內登入後）無法準出

上文中我們提到了 Tsinghua-Secure 僅校內登入的方法，命令列（請查閱相關參數）與網頁端（准入介面的僅校內複選框）也有對應的僅校內登入方案。但有同學觀測到在僅校內登入後，透過 net.tsinghua.edu.cn 來進行準出無法準出，usereg 準出也無法成功。這與上面的問題一樣應該也是某些設備狀態的問題，目前無解。

### 未准入時其他機器能 ping 通，但不能 ssh

不能 ssh 是預策略（參考本章校園網基礎知識一節中的《清華大學校園網有線電視局域網用戶准入系統使用說明（問與答）》）決定的

能 ping 通也是預先策略決定的，不過這一點沒有文件；即，未准入時放行 ICMP reply 套件。

## 清華雲盤

建議使用 [seafile.com/download](https://seafile.com/download) 中的 Linux 用戶端，而不是 Terminal 用戶端，因為 Terminal 用戶端需要獨立密碼，此密碼不同於 INFO 密碼，不能取得，故不能透過 Terminal 用戶端登入。

由於手動安裝軟體的方式是不為推崇的，請使用套件管理器取得對應軟體。對 Arch Linux 用戶，Linux 用戶端就是

```bash
pacman -S seafile-client
```

而非 `pacman -S seafile`，此套件為 Terminal 用戶端。其餘發行版請自行找到對應包。

### 使用 Terminal 客戶端

Terminal 用戶端在 8.0.4 版本後以後支援使用 Token 進行同步，你可以在 [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/) 中找到大部分發行版 AMD64 架構的來源，如果你所使用的套件管理器中 `seafile` 或 `seafile-cli` 版本號低於 `8.0.4`2@2@2.

#### 獲取 Token

在瀏覽器中登入清華雲盤，Cookie 中的 `seahub_auth` 應該是 `用户名（学号@tsinghua.edu.cn）@Token` 的模式，最後一段是 Token 。每個帳戶的 Token 是唯一的，不會過期。

在能正常運作 `seaf-cli` 後，可以使用命令列進行同步操作

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### 取代部分檔案實作 Token 登入

`seaf-cli` 實質上透過 `pysearpc` 與 `seaf-daemon` 通訊，因此大部分發行版預設來源中較低版本的 `seafile` 在只取代 `seaf-cli` 的情況下也能正常運作。這裡提供一個安裝 Terminal 用戶端後替換 `seaf-cli` 實作 Token 登入的簡單方法。

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### 編譯 Terminal 客戶端

具體的編譯流程可以參考 [build_seafile](https://manual.seafile.com/build_seafile/linux/)，但要注意幾點：

- 下載並編譯每個倉庫中的最新原始碼或最新的 release
- 可以忽略文件中的 `ccnet` 部分，倉庫已經消失並且不存在相關依賴
- make 有機率失敗，可以多來幾次
- 若安裝完成後 `seaf-cli` 報錯，例如 `No module named 'seafile'` 可參考上一節手動複製 `seafile` 包

### Chrome 提醒下載的檔案危險

此現象可能是奇妙同學的奇妙操作導致 Chrome 將清華雲盤域名標記，進而所有文件下載都會提醒可能有危險並阻止。

請忽略此提醒。當然，如果您下載的真的是奇妙的文件，請您自查。

## ISATAP（已停止）

目前，該服務已停止。
  
參考 [ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn)。另有 [AUR 包 thu-isatap](https://aur.archlinux.org/packages/thu-isatap) 供參考。

目前只有校內公網IPv4的可使用該服務，校外不可。注意 `166.111.21.1` 這個IP是不會回應ping包的。

### 取得IPv6掛PT

由於在家中使用 SSLVPN 後可取得校內公網 IP，可使用 ISATAP 取得清華 IPv6 位址，以達到掛 PT 的功能，此處不做詳細展開。

## WIN 10 激活

在 Linux 下使用該指令取得相關 cmd 指令

```
$ dig -t TXT win10.harrychen.xyz +short
```

或在 Windows 下使用

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

然後在連上 sslvpn 的情況下執行該腳本即可激活

## 正版作業系統與軟體下載

### ITS

造訪 https://its.tsinghua.edu.cn 登入後即可取得 Win10，防毒軟體，WPS，MS Visio，MS Visual Studio，MATLAB 等正版軟體的下載方式

### TUNA

造訪 https://mirrors.tuna.tsinghua.edu.cn ，點擊取得下載連結即可。

## 校內 IP 段

校內共有 6 個 /16，可參考 https://bgp.he.net/AS45576

```
; 重要校园服务基本位于此网段，例如主页
; 机房也常用该网段
; 此网段还可在教学楼、图书馆获取
166.111.0.0/16
; 常用于机房与院系网
101.5.0.0/16
101.6.0.0/16
; 紫荆，C 楼等学生区，以及南部居民区
59.66.0.0/16
; 无线网（两个 /16 还不够用呢）
183.172.0.0/16
183.173.0.0/16
; 内部使用（大概是供路由器等网络基础设施使用）
118.229.0.0/20
```

v6 一般使用 `2402:f000::/32`，也有部分地區使用 `2001:250:200::/48`（網研院）。有一段 `2001:da8:200::/48` 但未見使用。
