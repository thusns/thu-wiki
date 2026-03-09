---

---
# Tsinghua Service Usage Guide (hauptsächlich für Linux-Benutzer)

Dieser Artikel konzentriert sich auf die Nutzungsanweisungen einiger Tsinghua-Dienste auf Linux-Maschinen, einschließlich Remote-Servern.

und Aktivierungsanleitung für Windows 10 auf dem Campus


## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

Gemäß den Campusnetz-Empfehlungen müssen Sie bei der Konfiguration von DNS und NTP mindestens die vom Campusnetz bereitgestellten Dienste nutzen.

Derzeit kann nur das vom Campus-Netzwerk bereitgestellte DNS innerhalb des Campus-Netzwerks verwendet werden. Die Funktion anderer DNS kann nicht garantiert werden.

## SSLVPN

Auf einem Linux-Rechner gibt es keinen PULSE SECURE-Client. Zusätzlich zur Verwendung von WEB VPN können Sie auch `openconnect` verwenden, um eine Verbindung zu Tsinghua VPN herzustellen.

Wenn es sich um ein Debian-System, einschließlich Ubuntu, handelt, können Sie es verwenden

```bash
$ apt-get install openconnect
```

Wenn es sich um Arch Linux handelt, können Sie es verwenden

```bash
$ pacman -S openconnect
```

Installieren Sie diese Software. Für andere Distributionen prüfen Sie bitte selbst die entsprechenden Quellen.

Nach der Installation verwenden

>
> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn
>

Wenn das angegebene Protokoll Juniper ist, wird dem Client keine IPv6-Adresse zugewiesen. Wenn es auf Pulse Connect Secure umgestellt wird, kann es eine IPv6-Adresse erhalten. Außerdem muss ein UserAgent angegeben werden, um IPv6-Routen korrekt zu erhalten, andernfalls wird versucht, den gesamten IPv6-Verkehr an das VPN weiterzuleiten.

Verwenden Sie die folgende Methode, um die IPv6-Adresse und -Route (insbesondere 2402:f000::/32) korrekt zu erhalten:

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

Nach Eingabe Ihres Accounts und Passwortes werden Sie mit dem Campusnetz verbunden und können auf die Campus-Dienste zugreifen (INFO/USEREG).

Es ist erwähnenswert, dass der Verkehr, der nichts mit der Tsinghua-Universität zu tun hat, immer noch über die ursprüngliche Route weitergeleitet wird. Dieses Verhalten unterscheidet sich von dem unter Windows. (Bedarfsbescheinigung für diesen Artikel)

## Internetauthentifizierung

### Grundkenntnisse des Campusnetzwerks

[清华大学校园网使用简介](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf) (Da der Link zum Upgrade der Webseite abgelaufen ist, lesen Sie bitte [备份](pathname:///docs/thuservices/file/CampusNetworkLectureNotes201909.pdf) auf dieser Website.)

[准入上网使用说明](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf) (diese Seite[备份](pathname:///docs/thuservices/file/RealNameAuthentication20190121.pdf))

[清华大学校园网有线局域网用户准入系统使用说明（问与答）](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf) (Da der Link zum Upgrade der Webseite abgelaufen ist, lesen Sie bitte [备份](pathname:///docs/thuservices/file/RealNameAuthenticationFAQ20190614.pdf) auf dieser Website.)

Das obige Dokument ist zu lang und ich möchte es nicht lesen: Es gibt zwei Schritte, um auf das Campus-Netzwerk auf das Internet zuzugreifen: der eine ist der Zugriff und der andere der Zugriff.

Wenn kein Zugriff und Zugriff besteht, kann die Maschine nur `166.111.8.28` und `2402:f000:1:801::8:28` anpingen, wenn Sie über die entsprechenden v4- und v6-Adressen verfügen. Andere Adressen auf dem Campus sind nicht verfügbar.

Wenn bei IPv4 Zugriff besteht, aber kein Zugriff vorhanden ist, kann der Computer den Computer auf dem Campus anpingen, aber nicht den Computer außerhalb des Campus, d. h. er kann nicht auf das externe Netzwerk zugreifen. Nur wenn eine Berechtigung zum Betreten und Verlassen vorliegt, kann die Maschine eine Verbindung zum externen Netzwerk herstellen.

Für IPv6 gibt es in v6 nur den Zulassungsschritt. Mit der Zulassung können Sie sich mit dem externen Netzwerk verbinden.

Bei Maschinen mit Layer-2-Zugriff (Zijing-Wohnheimnetzwerk, drahtloses Netzwerk für Lehrgebäude und einige Abteilungsnetzwerke) sind die Authentifizierung von Version 4 und die Authentifizierung von Version 6 verknüpft, d. h. wenn Version 4 zugelassen wird, wird gleichzeitig auch Version 6 zugelassen. Für Maschinen mit Layer-3-Zugriff (Netzwerke einiger Abteilungen) müssen v4 und v6 separat zugelassen werden.

`Tsinghua-Secure` verwendet ein anderes Authentifizierungssystem.

### Automatische Authentifizierung über die Befehlszeilenauthentifizierung

Siehe die Zusammenfassung der Authentifizierungstools in [utils.md](utils.md).

Referenz unten [GoAuthing](https://github.com/z4yx/GoAuthing)

#### Befehlszeilenauthentifizierung

Die Software implementiert sieben Hauptfunktionen, nämlich

```bash
auth-thu auth # v4准入
auth-thu deauth # 解除v4准入
auth-thu auth -6 # v6准入
auth-thu deauth -6 # 解除v6准入
auth-thu login # v4准出
auth-thu logout # 解除v4准出
auth-thu online # 保持机器在线
```

Normale Benutzer können es in ihrem Home-Verzeichnis ablegen und es als Befehlszeilentool verwenden, um die meisten Authentifizierungsanforderungen zu erfüllen.

Bekanntes Problem: Nachdem der Benutzer `auth-thu auth -C` (nur Eintritt) übergibt und `auth-thu login` (nur Ausstieg) aufruft, schlägt der Ausstieg fehl.

#### automatische Authentifizierung

Für Systemadministratoren besteht möglicherweise die Notwendigkeit, dass Server eine automatische Authentifizierung implementieren.

Nachdem Sie die Datei heruntergeladen haben, legen Sie sie bitte im entsprechenden Verzeichnis ab (z. B. /usr/local/bin). Legen Sie gleichzeitig die Konfigurationsdatei in einem geeigneten Verzeichnis ab und Sie können sie verwenden.

Um eine automatische **genaue Ausgabe** zu erreichen, müssen Sie den angehängten `goauthing.service` oder `goauthing@.service` im Ordner `/etc/systemd/system/` ablegen und den entsprechenden Inhalt so anpassen, dass er mit dem Pfad der Programmdatei und der Konfigurationsdatei übereinstimmt

``` bash
$ systemctl enable goauthing.service
```

Starten Sie den entsprechenden Dienst, um den Zweck der automatischen Authentifizierung zu erreichen. Wenn Sie Kontoinformationen im Home-Verzeichnis des Benutzers statt in `/etc` speichern möchten, können Sie auf `goauthing@.service` verweisen.

Wenn Sie die automatische Zulassung von `v6` implementieren möchten, lesen Sie bitte `goauthing6.service` und `goauthing6@.service`. Wenn Sie nur die automatische v4-Zulassung wünschen, müssen Sie `auth` in `goauthing.service` in `auth -C` ändern und die Zeile `login` löschen.

Wenn jemand dies verpackt, bitte PR. Das Paket `auth-thu-bin` existiert derzeit im AUR (das Paket `auth-thu` ist veraltet).

### Authentifizierung des Remote-Servers

(Aus Erfahrung des Autors hat usereg weniger Feedback zum Erfolg und Misserfolg des Ein- und Ausstiegs. Es wird empfohlen, die Befehlszeilen- und Webseitenauthentifizierung zu verwenden und usereg nur als Statusfeld zu verwenden.)

Auf einigen Servern können Sie [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn) nicht mit einem Browser zur Authentifizierung öffnen. Sie können nur [命令行工具](### 命令行认证 自动认证) oder „Zugriffsauthentifizierung“ verwenden, um Zugriff zu erhalten.

Für die Proxy-Authentifizierung müssen Sie zunächst die IPv4-Adresse des Servers in der Form `166.111.x.x` oder `59.66.x.x` oder `101.x.x.x` kennen. Öffnen Sie dann den Abschnitt [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) „Zugriff auf Proxy-Authentifizierung“ und geben Sie die IP ein, um Zugriff zu erhalten. Beim Einlass können Sie wählen, ob der Zugang aktiviert werden soll.

Wenn Sie bei einigen Maschinen mit dreischichtigem Zugriff Zugriff auf Version 6 erreichen möchten, können Sie den Zugriff auch über „Access Agency Authentication“ erreichen.

Für einige Server, die Zugriff haben, aber keinen Zugriff haben, können Sie „Mit anderen IPs verbinden“ verwenden, um Zugriff zu erhalten.

Bezüglich Fragen der Ein- und Ausreise sind PRs willkommen.

Hinsichtlich der Performance von IPv4 und IPv6 bei Online- und Offline-Ein- und -Austritt sowie der Performance des Layer-2-Zugangs/Layer-3-Zugangs auf dem Campus sind PRs willkommen.

### Authentifizierung der Remote-Server-Webseite

Manchmal sind die Informationen in `usereg` nicht korrekt. Wenn Sie sich zu diesem Zeitpunkt noch mit `ssh` am Computer anmelden können, können Sie neben der zuvor erwähnten „Befehlszeilenauthentifizierung“ auch Optionen beim Anmelden verwenden.

```
ssh -D <port> host
```

Auf diese Weise wird lokal ein Socks5-Proxy mit `<port>` als Port erstellt. Wenn Sie diesen Proxy im Browser verwenden, können Sie wie gewohnt eine Webseitenauthentifizierung erreichen.

Insbesondere ist es wichtig zu beachten, dass Sie zur Authentifizierung nicht direkt auf auth4/auth6 zugreifen können (siehe Fragen und Antworten). Sie müssen über Jump auf auth4/auth6 zugreifen, um die richtige ac\_id zu erhalten. Im Allgemeinen können Sie auf info/learn/login zugreifen, um zu springen, oder Sie können durch 3.3.3.3 und [3:3:3::3] springen. Letzteres ist eine bequemere Lösung für Benutzer mit dreistufigem Zugriff, um auf auth6 zuzugreifen.

### Tsinghua-Sicher

Wenn es sich um eine Umgebung auf dem Campus handelt, stellen Sie zunächst eine Verbindung zu `Tsinghua-Secure无线网使用指南` her, um [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) einzugeben. Legen Sie nach der Anmeldung das von Tsinghua-Secure verwendete Passwort in `自注册及修改口令处` fest. Dieses Passwort muss nicht mit dem Info-Passwort identisch sein.

#### NetzwerkManager

Nach der Einrichtung können Sie mit `NetworkManager` eine Verbindung zum WLAN herstellen. Sie können sich auf die Dokumentation [清华大学无线校园网 802.1x 认证登录客户端配置说明](https://its.tsinghua.edu.cn/info/1333/2318.htm) (diese Website [备份](pathname:///docs/thuservices/file/tsinghua-secure-config.pdf)) beziehen.

Die Beispielkonfiguration `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection` lautet wie folgt

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

Diese Beispielkonfiguration aktiviert nur IPv6 und erhält ein bestimmtes Suffix (bitte wählen Sie das Suffix selbst, um Adresskollisionen zu vermeiden) und verwendet `identity` von `identity`, um sicherzustellen, dass das Kontingent nicht belegt ist.

Besonderes Augenmerk sollte darauf gelegt werden, wenn Sie die folgenden drei Bedingungen gleichzeitig erfüllen:

1.  `NetworkManager` verwendet das Backend `wpa_supplicant`
1.  Verwendung von Version 3.0.0 und höher von `openssl`
1.  In der verwendeten Distribution ist `wpa_supplicant` nicht mit [修复 tls 1.0/1.1 连接的 patch](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2) markiert (derzeit wird bestätigt, dass Ubuntu über einen Patch verfügt, NixOS jedoch nicht über einen Patch).

Dann kann Ihr `NetworkManager` möglicherweise keine Verbindung zu `Tsinghua-Secure` herstellen, da die TLS 1.0-Verbindung deaktiviert ist. In diesem Fall gibt es zwei Lösungen, von denen jede gelöst werden kann:

1.  Aktualisieren Sie NetworkManager auf `1.41.5-dev` und höher. Um genau zu sein, stellen Sie sicher, dass [这个 commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df) enthalten ist. Fügen Sie eine Zeile `phase1-auth-flags=32` (`tls-1-0-enable` in `NetworkManager`) zum Abschnitt `[802-1x]` der obigen Konfigurationsdatei hinzu. Diese Option entspricht `0x20`, konvertiert in Dezimalzahl `32`. Diese Konvertierungsbeziehung ist derzeit nicht im Dokument aufgezeichnet, daher gibt es keine Garantie dafür, dass die Zahl 32 immer gültig ist. Eine sicherere Methode besteht darin, `802-1x.phase1-auth-flags` mithilfe von `nmcli` manuell auf `tls-1-0-enable` zu setzen.
1.  Wenden Sie den oben genannten Patch auf Ihren `wpa_supplicant` an.

#### wpa_supplicant

Sie können auch `wpa_supplicant` verwenden, um die entsprechende WLAN-Verbindung herzustellen. Installieren Sie `wpa_supplicant`, bearbeiten Sie `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`, wobei `XXXX` der Name der lokalen Netzwerkkarte ist, und geben Sie die folgende Konfiguration ein

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

Darunter sind `username` und `password` die entsprechenden Informationen Ihres eigenen Kontos. Dann treten Sie ein

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

Sie sind bereit, eine Verbindung herzustellen.

Hinweis: Diese Konfiguration wurde von [orv](http://hep.tsinghua.edu.cn/~orv) beigesteuert.

#### iwd

Aufgrund des Zertifikatproblems von Tsinghua-Secure (die Länge von p in dhparams beträgt nur 1024, was nicht mit [Linux 内核的 1536 长度需求](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52) übereinstimmt) und iwd auf dem Kryptografie-Tool des Kernels basiert, kann die Standardverwendung von iwd keine Verbindung herstellen.

[NickCao](https://github.com/NickCao) stellt zu diesem Zweck [dhack 内核模块](https://github.com/NickCao/dhack) und alle Tool-Patches (unten) bereit; Ersteres implementiert den Patch, indem es die entsprechenden Symbole entführt, und letzteres ersetzt die Parameter direkt im Quellcode, wenn nix das Softwarepaket erstellt. Benutzer können analog ihre eigenen Kernel und Tools erstellen.

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

Darüber hinaus ist die Konfiguration wie folgt

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

### Tsinghua-Secure, nur Anmeldemethode auf dem Campus

Wir haben festgestellt, dass die nach der Verbindung mit Tsinghua-Secure erhaltene IPv4-Adresse automatisch in die Tabelle der zulässigen ausgehenden Daten eingetragen wird, die unter unerwarteten Umständen die vorhandenen ausgehenden ausgehenden Geräte belegen kann.

Nach Tests wurde festgestellt, dass das Anmeldeverhalten dasselbe ist wie bei „Nur Anmeldung auf dem Campus“, wenn der beim Anmelden verwendete Benutzername „Benutzername@tsinghua“ ist (z. B. lh14@tsinghua). In diesem Fall hat v4 nur Zugriff und v6 hat Zugriff und Ausgang.

Nach Verwendung dieser Methode zur Authentifizierung kann der Autorentest zur Authentifizierung über „net.tsinghua.edu.cn“ verwendet werden, das Verhalten ist jedoch im kabelgebundenen Netzwerk anders.

## Diskussion über die Merkmale des Campus-Netzwerks

### Isolation der zweiten Schicht/Nachbarerkennungsisolation

Ein Hauptmerkmal des Campus-Netzwerks ist die Layer-2-Isolation/Neighbor-Discovery-Isolation. Für Version 4 ist es das erstere; Für Version 6 ist es Letzteres. Dieser Mechanismus dient der Sicherheit, ist jedoch für viele Entwickler/Benutzer unbequem.

Diese Funktion teilt die Broadcast-Domäne im Wesentlichen durch den Core-Switch auf, sodass sich nur ein Client und ein Gateway in derselben Broadcast-Domäne befinden.

#### IPv4

Wenn uns eine IP wie 59.66.130.xx/24 zugewiesen wird und wir eine Verbindung zu 59.66.130.yy/24 herstellen möchten, stellen wir möglicherweise fest, dass wir keine Verbindung herstellen können. Beachten Sie, dass sich diese beiden in einer /24-Ebene befinden, also in einer zweiten Ebene. In diesem Fall erkennen sich die beiden Maschinen über ARP, aber unter bestimmten Mechanismen in der Schule kann ARP nicht funktionieren.

In diesem Fall müssen Sie auf beiden Maschinen die folgenden Routen hinzufügen.

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

Die entsprechenden Parameter müssen entsprechend der tatsächlichen Situation geändert werden.

#### IPv6

Bei Bauhinias IPv6 tritt dieses Problem nicht auf, da die Adresse /128 lautet.

Wenn wir unter Tsinghua-Secure stehen, werden wir Adressen über SLAAC zuweisen, das heißt, alle Adressen liegen unter demselben /64. Wenn wir miteinander kommunizieren möchten, müssen wir sie über NDP entdecken. Aufgrund einiger Mechanismen des Campus-Netzwerks ist NDP möglicherweise nicht erfolgreich.

In diesem Fall müssen Sie auf beiden Maschinen die folgenden Routen hinzufügen

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```
Die Parameter müssen entsprechend der tatsächlichen Situation bestätigt werden. Das erste ist das /64-Präfix, das unter Bezugnahme auf die erhaltene Adresse oder auf die RA geschrieben werden kann. Die zweite ist die LL-Adresse des Gateways, die mit der in der Standardroute angezeigten Adresse identisch ist. Die dritte ist die drahtlose Netzwerkkarte.

### geringe Portblockierung

Laut dem vorherigen Dokument „Usage Introduction“ blockiert IPv4 die Ports 0 bis 1024, 8000 bis 8100, 3389 und 9100. Darüber hinaus sind aus bekannten Gründen auch die Ports 1080, 4781 und 7890 blockiert.

Ab Herbst 2022 wird IPv6 den Low-Port-Anteil blockieren.

### Dynamische IP

Für dynamische IP können wir DDNS verwenden, um das Problem zu lösen. Große Anbieter wie DNSPod, dns.he.net und cloudflare bieten diesen Dienst an.

Am Beispiel von dns.he.net fügen Sie zunächst einen A/AAAA-Eintrag hinzu und entscheiden sich für die Verwendung von DDNS. Erstellen Sie nach der Erstellung ein Update-Token mit der Bezeichnung T. Wir schreiben das folgende Skript

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```
Beachten Sie, dass Token das T darin ist. Ändern Sie die übrigen Parameter nach Bedarf.

Und verwenden Sie cron, um das Skript regelmäßig auszuführen, beispielsweise alle fünf Minuten. Eine ausführliche Erklärung finden Sie im Befehl https://crontab.guru/.

#### Statisches IPv6-Suffix oder kurze IPv6-Adresse

Wir wissen, dass unter SLAAC (üblich in Tsinghua-Secure) die letzten 64 Bits der IPv6-Adresse vom Client bestimmt werden können. Zu diesem Zeitpunkt können wir ein statisches Suffix oder sogar ein kurzes Suffix konfigurieren. Wenn sich eine Maschine nur an einem Standort befindet, kann das Präfix fast als fest gelten (Verifizierung erforderlich).

(Tucao: Token ist eine Reihe von Tools, die in Standards fast nie erwähnt werden, und es gibt nur wenige Dokumente (es gibt nur wenige Dokumente für IPv6), und es ist immer noch eine sehr Nischensache; denn wer braucht schon statische Suffixe? Anstatt statische Suffixe für die Kommunikation zwischen Maschinen im selben Subnetz zu verwenden (ja, es gibt keine Routing-Elemente, die nur Suffixe haben, Sie müssen also immer ein Präfix zu einer anderen Maschine im Netzwerk hinzufügen), ist es besser, eine statische private Adresse zu konfigurieren.)

Normalerweise ist die uns zugewiesene IPv6 komplizierter, da EUI64 oder Datenschutzerweiterungen verwendet werden. Für EUI64 ist das Feld `ff:fe` in der Adresse zu finden.

Wir können das statische Suffix über iproute2 oder das traditionelle Paket konfigurieren. Bitte Google für die Verwendung des letzteren, und die Methode des ersteren ist hier angegeben.

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

**Bevor wir diesen Befehl ausführen**, müssen wir beachten, dass wir `forwarding` der Netzwerkkarte deaktivieren müssen (**während der Konfiguration**, die Weiterleitung kann nach der Konfiguration aktiviert werden), `accept_ra` und `autoconf` öffnen und die v6-Funktion anderer DHCP-Clients deaktivieren müssen.

(Tucao: Obwohl dhcpcd ein DHCP-Client ist, übernimmt er auch SLAAC, was sehr ärgerlich ist. Traditionell müssen Sie nur `accept_ra` und `autoconf` öffnen, und der Linux-Kernel konfiguriert automatisch die v6-Adresse. Wenn `forwarding=1` verwendet wird, müssen wir `accept_ra=2` verwenden.)

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

Bitte ersetzen Sie bei Bedarf einige Parameter des obigen Befehls. Wir können den obigen Befehl in das Startskript einfügen, um das Token automatisch zu konfigurieren.

#### Versuchen Sie, eine bestimmte IPv4- oder IPv6-Adresse zu erhalten

Sie sind tolerant gegenüber Anfragen nach bestimmten Adressen in DHCP-Anfragen (die Terminologie von v4 und v6 ist unterschiedlich und nicht streng festgelegt).

dhcpcd-Konfiguration

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

Einige Informationen in der Konfiguration wurden bearbeitet. Informationen zur Konfiguration finden Sie in der Manpage und in der tatsächlichen Netzwerkumgebung.

Im Anhang finden Sie einige Protokolle, die den Prozess des Inkrafttretens dieser Konfiguration untersuchen. Der Autor ist der Ansicht, dass diese Konfiguration erst verwendet werden kann, nachdem die alte Lease abgelaufen ist oder die alte Adresse vorbelegt wurde.

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

### IPv6 für Abteilungsnetzwerk (Layer-3-Zugriff)

Bei einigen Abteilungsnetzwerken handelt es sich um Campusnetzwerke mit dreischichtigem Zugriff, und SLAAC ist im Netzwerk konfiguriert.

Nachdem einige Maschinen (z. B. die Standardeinstellungen von Windows und einige Linux-Standardeinstellungen) mit Datenschutzerweiterungen konfiguriert wurden, ändern sich ihre IPv6-Adressen in der SLAAC-Umgebung weiterhin. Da die Zulassung der Schule auf IPv6-Adressen basiert, besteht die konkrete Manifestation darin, dass der Zugriff verloren geht, nachdem auth6 für einen bestimmten Zeitraum für den Zugriff auf IPv6 verwendet wurde, und Sie sich erneut bei auth6 anmelden müssen.

Eine Möglichkeit besteht darin, die private temporäre IPv6-Adresse zu deaktivieren (Sie können bei Google nach relevanten Informationen suchen), und die andere Möglichkeit besteht darin, einen automatischen Zulassungsclient zu verwenden, wie z. B. den oben erwähnten goauthing6.service von auth-thu.

### Nicht RFC-kompatibles DHCPv6

> Der DHCPv6-Server Ihrer Schule erkennt bestimmte DUIDs nicht und antwortet nicht auf solche DHCP-Anfragen. Selbst nachdem die Schule das Problem gemeldet und versucht hatte, den Hersteller zur Behebung des Problems zu bewegen, bestand das Problem weiterhin.
>
> Laut relevanten Quellen wird nur DUID Typ 1, also DUID-LLT, erkannt. Die entsprechende Konfigurationsmethode von dhcpcd ist unten angegeben.
>
> Öffnen Sie zunächst `duid` in `/etc/dhcpcd.conf` und stellen Sie sicher, dass `clientid` nicht geöffnet ist. Anschließend überprüfen wir die folgenden Dateien
>
> ```
> $ cat /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
> ```
>
> Wenn es mit `00:01` beginnt, zeigt es DUID-LLT an, andernfalls (oder die Datei existiert nicht) muss sie in das oben genannte Format geändert werden. Gleichzeitig müssen Sie prüfen, ob das letzte `ff:ff:ff:ff:ff:ff` die MAC-Adresse der entsprechenden Netzwerkkarte ist. Wenn nicht, müssen Sie es in die entsprechende Adresse ändern.
>
> **UPDATE** Tests haben ergeben, dass wir keine Ahnung haben, wie DHCPv6 an Ihrer Schule funktioniert. Wie es funktioniert, ist völlig metaphysisch. Einige können verwendet werden, wenn die Anonymisierung aktiviert ist, während einige Versuche auch dann fehlschlagen, wenn die Anonymisierung aktiviert ist.
>
> Einige Erfahrungen finden Sie unter https://pwe.cat/zijing-dhcpv6/

Bei jüngsten Versuchen wurde festgestellt, dass die Verwendung einer neueren Version von `systemd-networkd` die Adresse stabil erhalten kann.

### Wenn 30 Minuten lang kein Verkehr herrscht, verlieren Sie den Zugang.

Gemäß der zuvor erwähnten „Anleitung für den Internetzugang“ schließt das Authentifizierungssystem seine Netzwerkverbindung, wenn der Computer das Netzwerk längere Zeit (derzeit 30 Minuten) nicht nutzt. <del>Bei Bedarf kann der Server alle 10 Minuten einen Ping an ping.tsinghua.edu.cn senden. </del>(Abgelaufen)

### Es ist nicht möglich, den genauen Ausgang korrekt zu beenden, nachdem der genaue Ausgang verloren gegangen ist

Einige Computer, die schon seit längerem in Betrieb sind, können möglicherweise keine Verbindung zum Netzwerk außerhalb des Campus herstellen. In diesem Fall versuchen viele Schüler möglicherweise einen **genauen Export** in usereg oder der Befehlszeile, stellen jedoch fest, dass der genaue Export nicht erfolgreich ist. **Bei Benutzerregistrierung kann von der Maschine aus nicht auf das Netzwerk außerhalb des Campus zugegriffen werden, selbst wenn die Maschine in der genauen Exportliste angezeigt wird**. Wir gehen davon aus, dass dies ein Problem bei der Statussynchronisierung einiger Geräte im Campusnetzwerk ist.

Eine mögliche Lösung für dieses Problem besteht darin, sich zuerst abzumelden, dann einzutreten und zu verlassen. Dadurch kann der Status einiger Maschinen in der Schule aktualisiert werden, sodass der Ausstieg erfolgreich sein kann. Beachten! Das Abmelden ist ein sehr gefährlicher Vorgang! Es kann sein, dass SSH-Verbindungen unterbrochen werden und der Kontakt zu Ihrem Computer dauerhaft verloren geht! Bitte bedienen Sie es, nachdem Sie die Bedeutung dieses Vorgangs vollständig verstanden haben und wissen, wie Sie den Zugriff nach dem Abmelden wiederherstellen können!

### Kein Verlassen nach der Zulassung möglich (nur nach Anmeldung am Campus)

Wir haben oben die Tsinghua-Secure-Anmeldemethode nur auf dem Campus erwähnt. Es gibt auch entsprechende On-Campus-Login-Lösungen auf der Kommandozeile (bitte entsprechende Parameter prüfen) und der Webseite (Kontrollkästchen nur On-Campus auf der Zugangsoberfläche). Einige Studenten stellten jedoch fest, dass nach der Anmeldung auf dem Campus die Anmeldung über net.tsinghua.edu.cn und die Benutzerregistrierungsanmeldung fehlschlugen. Wie das oben genannte Problem dürfte es sich auch hier um ein Problem mit dem Status bestimmter Geräte handeln, für das es derzeit keine Lösung gibt.

### Wenn dies nicht zulässig ist, können andere Maschinen pingen, aber kein SSH.

Die Unfähigkeit von SSH wird durch die Vorrichtlinie bestimmt (siehe „Anweisungen (Fragen und Antworten) zum Benutzerzugriffssystem für das kabelgebundene LAN des Campus-Netzwerks der Tsinghua-Universität“ im Abschnitt „Grundlagen des Campus-Netzwerks“ dieses Kapitels).

Ob ein Ping möglich ist, hängt ebenfalls von der Vorrichtlinie ab, dies ist jedoch nicht dokumentiert. Das heißt, ICMP-Antwortpakete sind zulässig, wenn sie nicht zugelassen sind.

## Tsinghua-Wolkenscheibe

Es wird empfohlen, in [seafile.com/download](https://seafile.com/download) den Linux-Client anstelle des Terminal-Clients zu verwenden, da der Terminal-Client ein eigenständiges Passwort benötigt. Dieses Passwort unterscheidet sich vom INFO-Passwort und kann nicht abgerufen werden, sodass Sie sich nicht über den Terminal-Client anmelden können.

Da eine manuelle Softwareinstallation nicht empfohlen wird, verwenden Sie bitte einen Paketmanager, um die entsprechende Software zu erhalten. Für Arch Linux-Benutzer ist der Linux-Client

```bash
pacman -S seafile-client
```

Anstelle von `pacman -S seafile` ist dieses Paket der Terminal-Client. Für andere Distributionen suchen Sie bitte selbst nach den entsprechenden Paketen.

### Verwenden des Terminal-Clients

Der Terminal-Client unterstützt die Verwendung von Token zur Synchronisierung ab Version 8.0.4. Die Quelle der AMD64-Architektur für die meisten Versionen finden Sie in [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/). Wenn die Versionsnummer von `seafile` oder `seafile-cli` im von Ihnen verwendeten Paketmanager niedriger als `8.0.4` ist, können Sie es installieren und später auf die Methode zum Ersetzen einiger Dateien zurückgreifen, oder Sie können die neueste Version direkt manuell kompilieren.

#### Token erhalten

Melden Sie sich im Browser bei Tsinghua Cloud Disk an. Der `seahub_auth` im Cookie sollte dem Muster von `用户名（学号@tsinghua.edu.cn）@Token` entsprechen und der letzte Absatz ist das Token. Der Token jedes Kontos ist einzigartig und läuft nicht ab.

Nachdem `seaf-cli` normal ausgeführt werden kann, können Sie die Befehlszeile verwenden, um Synchronisierungsvorgänge durchzuführen.

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### Ersetzen Sie einige Dateien, um die Token-Anmeldung zu implementieren

`seaf-cli` kommuniziert im Wesentlichen mit `seaf-daemon` über `pysearpc`, sodass die niedrigere Version von `seafile` in den Standardquellen der meisten Distributionen problemlos funktioniert, indem einfach `seaf-cli` ersetzt wird. Hier ist eine einfache Möglichkeit, die Token-Anmeldung zu implementieren, indem Sie `seaf-cli` nach der Installation des Terminal-Clients ersetzen.

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### Kompilieren Sie den Terminal-Client

Informationen zum spezifischen Kompilierungsprozess finden Sie unter [build_seafile](https://manual.seafile.com/build_seafile/linux/). Es sind jedoch einige Punkte zu beachten:

- Laden Sie den neuesten Quellcode oder die neueste Version in jedem Warehouse herunter und kompilieren Sie ihn
- Sie können den Teil `ccnet` im Dokument ignorieren, das Lager ist verschwunden und es gibt keine relevanten Abhängigkeiten.
- Es besteht die Wahrscheinlichkeit, dass make scheitert. Du kannst es noch ein paar Mal versuchen.
- Wenn `seaf-cli` nach Abschluss der Installation einen Fehler meldet, z. B. `No module named 'seafile'`, können Sie im vorherigen Abschnitt nachschlagen, um das Paket `seafile` manuell zu kopieren

### Chrome warnt davor, dass heruntergeladene Dateien gefährlich sind

Dieses Phänomen kann durch die seltsame Vorgehensweise der Qiaoqiu-Studenten verursacht werden, die dazu führte, dass Chrome den Tsinghua Cloud Disk-Domänennamen markierte und dann alle Datei-Downloads daran erinnerte, dass sie gefährlich sein könnten, und blockiert wurde.

Bitte ignorieren Sie diese Erinnerung. Wenn Sie eine wirklich fantastische Datei heruntergeladen haben, überprüfen Sie diese natürlich bitte selbst.

## ISATAP (gestoppt)

Derzeit ist der Dienst gestoppt.
  
Referenz [ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn). Es gibt auch [AUR 包 thu-isatap](https://aur.archlinux.org/packages/thu-isatap) als Referenz.

Derzeit können nur öffentliche IPv4-Benutzer auf dem Campus diesen Dienst nutzen, nicht jedoch Benutzer außerhalb des Campus. Beachten Sie, dass diese IP nicht auf Ping-Pakete `166.111.21.1` reagiert.

### Holen Sie sich IPv6-verknüpftes PT

Da Sie die öffentliche Campus-IP über SSLVPN zu Hause erhalten können, können Sie ISATAP verwenden, um die Tsinghua-IPv6-Adresse abzurufen und die PT-Funktion zu erreichen, die hier nicht im Detail erläutert wird.

## WIN 10-Aktivierung

Verwenden Sie diesen Befehl unter Linux, um relevante cmd-Anweisungen zu erhalten

```
$ dig -t TXT win10.harrychen.xyz +short
```

oder unter Windows verwenden

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

Führen Sie dann das Skript aus, während Sie mit SSLVPN verbunden sind, um es zu aktivieren

## Original-Betriebssystem- und Software-Downloads

### SEIN

Besuchen Sie https://its.tsinghua.edu.cn und melden Sie sich an, um die Download-Methode für Originalsoftware wie Win10, Antivirensoftware, WPS, MS Visio, MS Visual Studio, MATLAB usw. zu erhalten.

### THUNFISCH

Besuchen Sie https://mirrors.tuna.tsinghua.edu.cn und klicken Sie, um den Download-Link zu erhalten.

## IP-Segment auf dem Campus

Es gibt 6/16 in der Schule, siehe https://bgp.he.net/AS45576

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

v6 __THU_WIKI_TOKEN_0 __, und __THU_WIKI_TOKEN_1 __ (Web College). Es gibt einen __thU_WiKI_Token_2_, aber es wird nicht verwendet。
