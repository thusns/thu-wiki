# Guide d'utilisation du service Tsinghua (principalement pour les utilisateurs Linux)

Cet article se concentrera sur les instructions d'utilisation de certains services Tsinghua sur les machines Linux, y compris les serveurs distants.

et guide d'activation pour Windows 10 sur le campus


## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

Selon les recommandations du réseau du campus, lors de la configuration de DNS et NTP, vous devez au moins utiliser les services fournis par le réseau du campus.

Actuellement, seul le DNS fourni par le réseau du campus peut être utilisé au sein du réseau du campus, et le fonctionnement des autres DNS n'est pas garanti.

## SSLVPN

Il n'y a pas de client PULSE SECURE sur une machine Linux. En plus d'utiliser WEB VPN, vous pouvez également utiliser `openconnect` pour vous connecter au VPN Tsinghua.

S'il s'agit d'un système Debian, y compris Ubuntu, vous pouvez utiliser

```bash
$ apt-get install openconnect
```

S'il s'agit d'Arch Linux, vous pouvez utiliser

```bash
$ pacman -S openconnect
```

Installez ce logiciel. Pour les autres distributions, veuillez vérifier vous-même les sources correspondantes.

Après l'installation, utilisez

>
> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn
>

Lorsque le protocole spécifié est Juniper, le client ne se verra pas attribuer d'adresse IPv6. S'il est modifié en Pulse Connect Secure, il peut obtenir une adresse IPv6. Un UserAgent doit également être spécifié pour obtenir correctement les routes IPv6, sinon tout le trafic IPv6 sera tenté d'être acheminé vers le VPN.

Utilisez la méthode suivante pour obtenir correctement l’adresse et la route IPv6 (en particulier 2402:f000::/32) :

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

Après avoir saisi votre compte et votre mot de passe, vous serez connecté au réseau du campus et pourrez accéder aux services du campus (INFO/USEREG).

Il convient de noter que le trafic non lié à l’Université Tsinghua est toujours acheminé selon l’itinéraire d’origine. Ce comportement est différent de celui sous Windows. (Certificat de demande pour cet article)

## Authentification Internet

### Connaissance de base du réseau de campus

[清华大学校园网使用简介](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf) (Le lien de mise à niveau de la page Web ayant expiré, veuillez vous référer à [备份](file/CampusNetworkLectureNotes201909.pdf) sur ce site)

[准入上网使用说明](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf) (ce site[备份](file/RealNameAuthentication20190121.pdf))

[清华大学校园网有线局域网用户准入系统使用说明（问与答）](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf) (Le lien de mise à niveau de la page Web ayant expiré, veuillez vous référer à [备份](file/RealNameAuthenticationFAQ20190614.pdf) sur ce site)

Le document ci-dessus est trop long et je ne veux pas le lire : Il y a deux étapes pour accéder à Internet sur le réseau du campus, l'une est l'accès et l'autre est l'accès.

Lorsqu'il n'y a pas d'accès et d'accès, la machine ne peut pinger que `166.111.8.28` et `2402:f000:1:801::8:28`, si vous disposez des adresses v4 et v6 correspondantes. Les autres adresses sur le campus ne sont pas disponibles.

Pour IPv4, lorsqu'il y a un accès mais pas d'accès, la machine peut envoyer une requête ping à la machine sur le campus, mais ne peut pas envoyer une requête ping à la machine hors campus, c'est-à-dire qu'elle ne peut pas accéder au réseau externe. Ce n'est que lorsqu'il y a une autorisation d'entrée et de sortie que la machine peut se connecter au réseau externe.

Pour IPv6, la v6 n'a que l'étape d'admission. Avec l'admission, vous pouvez vous connecter au réseau externe.

Pour les machines avec accès de couche 2 (réseau des dortoirs Zijing, réseau sans fil du bâtiment d'enseignement et certains réseaux de département), l'authentification v4 et l'authentification v6 sont liées, c'est-à-dire que lorsque la v4 est admise, la v6 est également admise en même temps. Pour les machines avec accès couche 3 (réseaux de certains départements), les v4 et v6 doivent être admis séparément.

`Tsinghua-Secure` utilise un système d'authentification différent.

### Authentification en ligne de commande Authentification automatique

Voir le résumé des outils d'authentification dans [utils.md](utils.md).

Référence ci-dessous [GoAuthing](https://github.com/z4yx/GoAuthing)

#### Authentification en ligne de commande

Le logiciel implémente sept fonctions principales, à savoir

```bash
auth-thu auth # v4准入
auth-thu deauth # 解除v4准入
auth-thu auth -6 # v6准入
auth-thu deauth -6 # 解除v6准入
auth-thu login # v4准出
auth-thu logout # 解除v4准出
auth-thu online # 保持机器在线
```

Les utilisateurs ordinaires peuvent le placer dans leur répertoire personnel et l'utiliser comme outil de ligne de commande pour répondre à la plupart des besoins d'authentification.

Problème connu : une fois que l'utilisateur a passé `auth-thu auth -C` (entrée uniquement) et appelé `auth-thu login` (sortie uniquement), la sortie échouera.

#### authentification automatique

Pour les administrateurs système, il peut être nécessaire que les serveurs mettent en œuvre une authentification automatique.

Après avoir téléchargé le fichier, veuillez le placer dans le répertoire correspondant (tel que /usr/local/bin). En même temps, placez le fichier de configuration dans un répertoire raisonnable et vous pourrez l'utiliser.

Pour obtenir une **sortie précise** automatique, vous devez placer le `goauthing.service` ou `goauthing@.service` ci-joint sous le dossier `/etc/systemd/system/` et ajuster le contenu correspondant pour qu'il corresponde au chemin du fichier programme et du fichier de configuration, utilisez

``` bash
$ systemctl enable goauthing.service
```

Démarrez le service correspondant pour atteindre l’objectif d’authentification automatique. Si vous souhaitez stocker les informations du compte dans le répertoire personnel de l'utilisateur au lieu de `/etc`, vous pouvez vous référer à `goauthing@.service`.

Si vous souhaitez mettre en œuvre l'admission automatique de `v6`, veuillez vous référer à `goauthing6.service` et `goauthing6@.service`. Si vous souhaitez uniquement l'admission automatique v4, vous devez remplacer `auth` dans `goauthing.service` par `auth -C` et supprimer la ligne `login`.

Si quelqu'un propose cela, veuillez PR. Le package `auth-thu-bin` existe actuellement dans l'AUR (le package `auth-thu` est obsolète).

### Authentification du serveur distant

(D'après l'expérience de l'auteur, usereg a moins de retours sur le succès et l'échec de l'entrée et de la sortie. Il est recommandé d'utiliser l'authentification par ligne de commande et par page Web, et d'utiliser uniquement usereg comme panneau d'état)

Sur certains serveurs, vous ne pouvez pas utiliser un navigateur pour ouvrir [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn) pour l'authentification. Vous ne pouvez utiliser que [命令行工具](### 命令行认证 自动认证) ou « Authentification d'accès » pour obtenir l'accès.

Pour l'authentification proxy, vous devez d'abord connaître l'adresse IPv4 du serveur, sous la forme de `166.111.x.x` ou `59.66.x.x` ou `101.x.x.x`. Ouvrez ensuite la section [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) "Accès à l'authentification proxy" et renseignez l'IP pour y accéder. Lors de l'admission, vous pouvez choisir d'activer ou non l'accès.

Pour certaines machines avec accès à trois couches, si vous souhaitez obtenir un accès v6, vous pouvez également obtenir l'accès dans « Access Agency Authentication ».

Pour certains serveurs qui ont accès mais pas d'accès, vous pouvez utiliser « Se connecter à d'autres adresses IP » pour obtenir l'accès.

Concernant les questions d’entrée et de sortie, les PR sont les bienvenus.

Concernant les performances d'IPv4 et d'IPv6 lorsque l'admission et la sortie se font en ligne et hors ligne, ainsi que les performances de l'accès de couche 2/de couche 3 sur le campus, les PR sont les bienvenus.

### Authentification de la page Web du serveur distant

Parfois, les informations contenues dans `usereg` ne sont pas exactes. Si vous pouvez toujours vous connecter à la machine avec `ssh` à ce moment-là, en plus de « l'authentification par ligne de commande » mentionnée précédemment, vous pouvez également utiliser des options lors de la connexion.

```
ssh -D <port> host
```

De cette façon, un proxy chaussettes5 avec `<port>` comme port sera construit localement. Si vous utilisez ce proxy dans le navigateur, vous pouvez réaliser l'authentification de page Web comme d'habitude.

En particulier, il est important de noter que vous ne pouvez pas accéder directement à auth4/auth6 pour l'authentification (voir Q&A). Vous devez accéder à auth4/auth6 via jump pour obtenir le bon ac\_id. Généralement, vous pouvez accéder à info/learn/login pour sauter, ou vous pouvez passer par 3.3.3.3 et [3:3:3::3]. Cette dernière est une solution plus pratique pour les utilisateurs disposant d'un accès à trois couches pour accéder à auth6.

### Tsinghua-Sécurisé

S'il s'agit d'un environnement sur le campus, connectez-vous d'abord à `Tsinghua-Secure无线网使用指南` pour saisir [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn). Après vous être connecté, définissez le mot de passe utilisé par Tsinghua-Secure dans `自注册及修改口令处`. Ce mot de passe ne doit pas nécessairement être le même que le mot de passe info.

#### Gestionnaire de réseau

Après la configuration, vous pouvez utiliser `NetworkManager` pour vous connecter au Wifi. Vous pouvez vous référer à sa documentation [清华大学无线校园网 802.1x 认证登录客户端配置说明](https://its.tsinghua.edu.cn/info/1333/2318.htm) (ce site [备份](file/tsinghua-secure-config.pdf))

L'exemple de configuration `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection` est le suivant

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

Cet exemple de configuration active uniquement IPv6 et obtient un suffixe spécifique (veuillez choisir le suffixe vous-même pour éviter les collisions d'adresses) et utilise `identity` de `identity` pour garantir que le quota n'est pas occupé.

Une attention particulière doit être portée si vous remplissez simultanément les trois conditions suivantes :

1.  `NetworkManager` utilise le backend `wpa_supplicant`
1.  Utilisation de la version 3.0.0 et supérieure de `openssl`
1.  La distribution utilisée n'a pas `wpa_supplicant` marqué par [修复 tls 1.0/1.1 连接的 patch](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2) (il est actuellement confirmé qu'Ubuntu a un patch, mais NixOS n'a pas de patch)

Ensuite, votre `NetworkManager` ne pourra peut-être pas se connecter à `Tsinghua-Secure` car la connexion tls 1.0 est désactivée. Dans ce cas, il existe deux solutions, chacune pouvant être résolue :

1.  Mettez à niveau NetworkManager vers `1.41.5-dev` et supérieur, pour être précis, assurez-vous que [这个 commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df) est inclus. Ajoutez une ligne `phase1-auth-flags=32` (`tls-1-0-enable` dans `NetworkManager`) à la section `[802-1x]` du fichier de configuration ci-dessus. Cette option correspond à `0x20`, converti en décimal `32`, cette relation de conversion n'est actuellement pas enregistrée dans le document, il n'y a donc aucune garantie que le nombre 32 sera toujours valide. Une méthode plus garantie consiste à définir manuellement `802-1x.phase1-auth-flags` sur `tls-1-0-enable` en utilisant `nmcli`.
1.  Appliquez le patch mentionné ci-dessus sur votre `wpa_supplicant`.

#### wpa_supplicant

Vous pouvez également utiliser `wpa_supplicant` pour compléter la connexion wifi correspondante. Installez `wpa_supplicant`, modifiez `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`, où `XXXX` est le nom de la carte réseau locale, entrez la configuration suivante

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

Parmi eux, `username` et `password` sont les informations correspondantes de votre propre compte. Entrez ensuite

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

Vous êtes prêt à vous connecter.

Remarque : Cette configuration a été contribuée par [orv](http://hep.tsinghua.edu.cn/~orv).

#### je suis

En raison du problème de certificat de Tsinghua-Secure (la longueur de p dans dhparams n'est que de 1024, ce qui n'est pas conforme à [Linux 内核的 1536 长度需求](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52)), et iwd s'appuie sur l'outil de cryptographie du noyau, l'utilisation par défaut d'iwd ne peut pas se connecter.

[NickCao](https://github.com/NickCao) fournit [dhack 内核模块](https://github.com/NickCao/dhack) et tous les correctifs d'outils (ci-dessous) à cet effet ; le premier implémente le correctif en détournant les symboles correspondants, et le second remplace directement les paramètres dans le code source lorsque nix construit le progiciel. Les utilisateurs peuvent créer leurs propres noyaux et outils par analogie.

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

De plus, la configuration est la suivante

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

### Méthode de connexion Tsinghua-Secure uniquement sur le campus

Nous avons remarqué que l'adresse IPv4 obtenue après la connexion à Tsinghua-Secure entrera automatiquement dans la table sortante autorisée, ce qui peut occuper les appareils sortants sortants existants dans des circonstances inattendues.

Après les tests, il a été constaté que si le nom d'utilisateur utilisé lors de la connexion est « nom d'utilisateur@tsinghua » (par exemple, lh14@tsinghua), alors le comportement de connexion est le même que « connexion sur le campus uniquement ». Dans ce cas, la v4 a uniquement accès et la v6 a accès et sortie.

Après avoir utilisé cette méthode d'authentification, le test de l'auteur peut être utilisé pour s'authentifier via "net.tsinghua.edu.cn", mais le comportement est différent sur le réseau filaire.

## Discussion sur les caractéristiques du réseau de campus

### Isolation de deuxième couche/isolation par découverte de voisin

Une caractéristique majeure du réseau du campus est l’isolation de couche 2/découverte des voisins. Pour la v4, c'est le premier ; pour la v6, c'est ce dernier. Ce mécanisme est conçu pour la sécurité, mais il est peu pratique pour de nombreux développeurs/utilisateurs.

Cette fonctionnalité divise essentiellement le domaine de diffusion par le commutateur principal afin qu'un seul client et une seule passerelle se trouvent dans le même domaine de diffusion.

#### IPv4

Lorsqu'on nous attribue une adresse IP telle que 59.66.130.xx/24, si nous voulons nous connecter à 59.66.130.yy/24, nous pouvons constater que nous ne parvenons pas à nous connecter. Notez que ces deux éléments sont dans un /24, c'est-à-dire une deuxième couche. Dans ce cas, les deux machines se découvriront via ARP, mais sous certains mécanismes de l'école, ARP ne peut pas fonctionner.

Dans ce cas, vous devez ajouter les routes suivantes sur les deux machines.

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

Les paramètres correspondants doivent être modifiés en fonction de la situation réelle.

#### IPv6

L'IPv6 de Bauhinia n'a pas ce problème car son adresse est /128.

Lorsque nous sommes sous Tsinghua-Secure, nous attribuerons des adresses via SLAAC, c'est-à-dire que les adresses de chacun sont sous le même /64. Lorsque nous voulons communiquer entre nous, nous devons les découvrir via le NPD. En raison de certains mécanismes du réseau du campus, le NDP pourrait ne pas réussir.

Dans ce cas, vous devez ajouter les routes suivantes sur les deux machines

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```
Les paramètres doivent être confirmés en fonction de la situation réelle. Le premier est le préfixe /64, qui peut être écrit en faisant référence à l'adresse obtenue ou en faisant référence au RA. La seconde est l'adresse LL de la passerelle, qui est la même que l'adresse affichée dans la route par défaut. La troisième est la carte réseau sans fil.

### faible blocage des ports

Selon le précédent document « Introduction à l'utilisation », IPv4 bloque les ports 0 à 1024, 8000 à 8100, 3389 et 9100. De plus, pour des raisons bien connues, les ports 1080, 4781 et 7890 sont également bloqués.

À partir de l’automne 2022, IPv6 bloquera la partie basse du port.

### IP dynamique

Pour l'IP dynamique, nous pouvons utiliser DDNS pour le résoudre. Les principaux fournisseurs tels que DNSPod, dns.he.net et cloudflare proposent ce service.

En prenant dns.he.net comme exemple, ajoutez d'abord un enregistrement A/AAAA et choisissez d'utiliser DDNS. Après l'avoir créé, créez un jeton de mise à jour, marqué comme T. Nous écrivons le script suivant

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```
Notez que Token est le T qu'il contient. Modifiez les paramètres restants selon vos besoins.

Et utilisez cron pour exécuter le script périodiquement, disons toutes les cinq minutes. Vous pouvez vous référer à la commande https://crontab.guru/ pour une explication détaillée.

#### Suffixe statique IPv6 ou adresse IPv6 courte

On sait que sous SLAAC (commun dans Tsinghua-Secure), les 64 derniers bits de l'adresse IPv6 peuvent être déterminés par le client. A ce moment, nous pouvons configurer un suffixe statique ou même un suffixe court. Si une machine se trouve à un seul endroit, le préfixe peut presque être considéré comme fixe (vérification requise).

(Tucao : Token est un ensemble d'outils qui ne sont presque jamais mentionnés dans les standards, et il y a peu de documents (il y a peu de documents pour IPv6), et c'est encore une chose très niche ; après tout, qui a besoin de suffixes statiques ? Au lieu d'utiliser des suffixes statiques pour communiquer entre les machines d'un même sous-réseau (oui, il n'y a pas d'éléments de routage avec seulement des suffixes, vous devez donc toujours ajouter un préfixe à une autre machine du réseau), il est préférable de configurer une adresse privée statique)

Habituellement, l'IPv6 qui nous est attribué est plus compliqué car EUI64 ou des extensions de confidentialité sont utilisées. Pour EUI64, le champ `ff:fe` se trouve dans l'adresse.

Nous pouvons configurer le suffixe statique via iproute2 ou le package traditionnel. Veuillez Google pour l'utilisation de ce dernier, et la méthode du premier est donnée ici.

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

**Avant d'exécuter cette commande**, nous devons noter que nous devons désactiver `forwarding` de la carte réseau (**pendant la configuration**, le transfert peut être activé après la configuration), ouvrir `accept_ra` et `autoconf` et désactiver la fonction v6 des autres clients DHCP.

(Tucao : bien que dhcpcd soit un client DHCP, il prend également en charge SLAAC, ce qui est très ennuyeux. Selon la tradition, il suffit d'ouvrir `accept_ra` et `autoconf`, et le noyau Linux configurera automatiquement l'adresse v6. Si `forwarding=1` est utilisé, nous devons utiliser `accept_ra=2`)

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

Veuillez remplacer certains paramètres de la commande ci-dessus si nécessaire. Nous pouvons mettre la commande ci-dessus dans le script de démarrage pour configurer automatiquement le jeton.

#### Essayez d'obtenir une adresse IPv4 ou IPv6 spécifique

Vous tolérez les demandes d'adresses spécifiques dans les requêtes DHCP (la terminologie v4 et v6 est différente et n'est pas strictement indiquée).

Configuration de DHCPD

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

Certaines informations de la configuration ont été modifiées, veuillez vous référer à la page de manuel et à l'environnement réseau réel pour la configuration.

Vous trouverez ci-dessous quelques journaux pour explorer le processus de prise d'effet de cette configuration. L'auteur estime que cette configuration ne peut être utilisée qu'après l'expiration de l'ancien bail ou après la préemption de l'ancienne adresse.

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

### IPv6 pour le réseau départemental (accès couche 3)

Certains réseaux départementaux sont des réseaux de campus avec accès à trois couches, et SLAAC est configuré dans le réseau.

Une fois que certaines machines (telles que les paramètres par défaut de Windows et certains paramètres par défaut de Linux) sont configurées avec des extensions de confidentialité, leurs adresses IPv6 continueront de changer dans l'environnement SLAAC. Étant donné que l'admission à l'école est basée sur les adresses IPv6, la manifestation spécifique est que l'accès est perdu après avoir utilisé auth6 pour accéder à IPv6 pendant un certain temps et que vous devez vous reconnecter à auth6.

Une façon consiste à désactiver l'adresse temporaire privée IPv6 (vous pouvez rechercher des informations pertinentes sur Google) et l'autre consiste à utiliser un client d'admission automatique, tel que le goauthing6.service d'auth-thu mentionné ci-dessus.

### DHCPv6 non conforme à la RFC

> Le serveur DHCPv6 de votre école ne reconnaîtra pas certains DUID et ne répondra pas à ces requêtes DHCP. Même après que l’école ait signalé le problème et essayé de convaincre le fabricant de le résoudre, le problème persistait.
>
> Selon des sources pertinentes, seul le DUID Type 1, c'est-à-dire DUID-LLT, est reconnu. La méthode de configuration correspondante de dhcpcd est donnée ci-dessous.
>
> Ouvrez d'abord `duid` dans `/etc/dhcpcd.conf` et assurez-vous que `clientid` n'est pas ouvert. Ensuite, nous vérifions les fichiers suivants
>
> ```
> $ cat /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
> ```
>
> S'il commence par `00:01`, cela indique DUID-LLT, sinon (ou le fichier n'existe pas) il faut le changer au format ci-dessus. Dans le même temps, vous devez vérifier si le dernier `ff:ff:ff:ff:ff:ff` est l'adresse MAC de la carte réseau concernée. Sinon, vous devez le remplacer par l'adresse correspondante.
>
> **MISE À JOUR** Les tests ont révélé que nous n'avons aucune idée du fonctionnement du DHCPv6 de votre école. Son fonctionnement est complètement métaphysique. Certaines peuvent être utilisées si Anonymize est activé, tandis que certaines tentatives échouent même si Anonymize est activé.
>
> Pour certaines expériences, veuillez vous référer à https://pwe.cat/zijing-dhcpv6/

Des tentatives récentes ont montré que l'utilisation d'une version plus récente de `systemd-networkd` peut obtenir l'adresse de manière stable.

### S'il n'y a pas de trafic pendant 30 minutes, vous perdrez l'accès.

Selon les « Instructions pour l'accès à Internet » mentionnées précédemment, lorsque l'ordinateur n'utilise pas le réseau pendant une longue période (actuellement 30 minutes), le système d'authentification fermera sa connexion réseau ; <del>Si nécessaire, le serveur peut envoyer une requête ping à ping.tsinghua.edu.cn une fois toutes les 10 minutes. </del>(Expiré)

### Impossible de sortir avec précision après avoir perdu une sortie précise

Certaines machines qui fonctionnent depuis longtemps peuvent ne pas parvenir à se connecter au réseau hors campus. Dans ce cas, de nombreux étudiants peuvent essayer une **exportation précise** dans usereg ou en ligne de commande, mais constater que l'exportation précise échoue. **Sur usereg, même si la machine apparaît dans la liste d'exportation précise, le réseau hors campus n'est pas accessible depuis la machine**. Nous pensons qu'il s'agit d'un problème lié à la synchronisation de l'état de certains appareils sur le réseau du campus.

Une solution possible à ce problème consiste à vous déconnecter d’abord, puis à entrer et à sortir. Cela peut actualiser le statut de certaines machines de l'école, afin que la sortie puisse réussir. Avis! Se déconnecter est une opération très dangereuse ! Vous risquez de subir des déconnexions SSH et de perdre définitivement le contact avec votre machine ! Veuillez l'utiliser après avoir pleinement compris le sens de cette opération et savoir comment restaurer l'accès après vous être déconnecté !

### Impossible de sortir après l'admission (uniquement après s'être connecté sur le campus)

Nous avons mentionné ci-dessus la méthode de connexion Tsinghua-Secure uniquement sur le campus. Il existe également des solutions de connexion sur le campus correspondantes sur la ligne de commande (veuillez vérifier les paramètres pertinents) et sur la page Web (case à cocher sur le campus uniquement sur l'interface d'accès). Cependant, certains étudiants ont observé qu'après s'être connectés uniquement sur le campus, la connexion via net.tsinghua.edu.cn a échoué et la connexion usereg a échoué. Comme le problème ci-dessus, il devrait également s’agir d’un problème lié à l’état de certains appareils, et il n’existe actuellement aucune solution.

### Lorsqu'elles ne sont pas autorisées, les autres machines peuvent envoyer une requête ping, mais ne peuvent pas utiliser SSH.

L'incapacité de ssh est déterminée par la pré-politique (reportez-vous aux « Instructions du système d'accès utilisateur au réseau local câblé du réseau du campus de l'université Tsinghua (Q&A) » dans la section Bases du réseau du campus de ce chapitre)

La possibilité d'effectuer un ping est également déterminée par la pré-politique, mais cela n'est pas documenté ; c'est-à-dire que les paquets de réponse ICMP sont autorisés lorsqu'ils ne sont pas admis.

## Disque cloud Tsinghua

Il est recommandé d'utiliser le client Linux dans [seafile.com/download](https://seafile.com/download) au lieu du client Terminal, car le client Terminal nécessite un mot de passe indépendant. Ce mot de passe est différent du mot de passe INFO et ne peut pas être obtenu, vous ne pouvez donc pas vous connecter via le client Terminal.

L'installation manuelle du logiciel n'étant pas recommandée, veuillez utiliser un gestionnaire de packages pour obtenir le logiciel correspondant. Pour les utilisateurs d'Arch Linux, le client Linux est

```bash
pacman -S seafile-client
```

Au lieu de `pacman -S seafile`, ce package est le client Terminal. Pour les autres distributions, veuillez trouver vous-même les packages correspondants.

### Utilisation du client Terminal

Le client Terminal prend en charge l'utilisation de Token pour la synchronisation après la version 8.0.4. Vous pouvez trouver la source de l'architecture AMD64 pour la plupart des versions dans [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/). Si le numéro de version de `seafile` ou `seafile-cli` dans le gestionnaire de packages que vous utilisez est inférieur à `8.0.4`, vous pouvez l'installer et vous référer à la méthode de remplacement de certains fichiers ultérieurement, ou vous pouvez directement compiler la dernière version manuellement.

#### Obtenir un jeton

Connectez-vous à Tsinghua Cloud Disk dans le navigateur. Le `seahub_auth` dans le cookie doit être selon le modèle `用户名（学号@tsinghua.edu.cn）@Token`, et le dernier paragraphe est le jeton. Le Token de chaque compte est unique et n'expirera pas.

Une fois que `seaf-cli` peut s'exécuter normalement, vous pouvez utiliser la ligne de commande pour effectuer des opérations de synchronisation.

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### Remplacez certains fichiers pour implémenter la connexion par jeton

`seaf-cli` communique essentiellement avec `seaf-daemon` via `pysearpc`, donc la version inférieure de `seafile` dans les sources par défaut de la plupart des distributions fonctionnera très bien en remplaçant simplement `seaf-cli`. Voici un moyen simple d'implémenter la connexion par jeton en remplaçant `seaf-cli` après l'installation du client Terminal.

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### Compiler le client Terminal

LE PROCESSUS DE TRADUCTION SPÉCIFIQUE PEUT ÊTRE CONSULTÉ __THU_WIKI_TOKEN_0_, MAIS NOTEZ QUE:

- Téléchargez et compilez le dernier code source ou la dernière version dans chaque entrepôt
- Vous pouvez ignorer la partie `ccnet` dans le document, l'entrepôt a disparu et il n'y a aucune dépendance pertinente.
- Il y a une probabilité que make échoue. Vous pouvez l'essayer plusieurs fois.
- Si `seaf-cli` signale une erreur une fois l'installation terminée, par exemple `No module named 'seafile'`, vous pouvez vous référer à la section précédente pour copier manuellement le package `seafile`.

### Chrome prévient que les fichiers téléchargés sont dangereux

Ce phénomène peut être causé par le fonctionnement étrange des étudiants de Qiaoqiu, qui a amené Chrome à marquer le nom de domaine Tsinghua Cloud Disk, puis il sera rappelé à tous les téléchargements de fichiers qu'ils peuvent être dangereux et bloqués.

Veuillez ignorer ce rappel. Bien sûr, si vous avez téléchargé un fichier vraiment fantastique, vérifiez-le vous-même.

## ISATAP (arrêté)

Actuellement, le service est arrêté.
  
Référence [ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn). Il existe également [AUR 包 thu-isatap](https://aur.archlinux.org/packages/thu-isatap) pour référence.

Actuellement, seuls les utilisateurs IPv4 publics sur le campus peuvent utiliser ce service, pas ceux en dehors du campus. Notez que `166.111.21.1` cette IP ne répondra pas aux paquets ping.

### Obtenez un PT lié à IPv6

Puisque vous pouvez obtenir l'adresse IP publique du campus en utilisant SSLVPN à la maison, vous pouvez utiliser ISATAP pour obtenir l'adresse IPv6 de Tsinghua afin d'obtenir la fonction PT, qui ne sera pas discutée en détail ici.

## Activation GAGNER 10

Utilisez cette commande sous Linux pour obtenir les instructions cmd pertinentes

```
$ dig -t TXT win10.harrychen.xyz +short
```

ou utiliser sous Windows

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

Exécutez ensuite le script lorsque vous êtes connecté à sslvpn pour activer

## Téléchargements de systèmes d'exploitation et de logiciels authentiques

### SON

Visitez https://its.tsinghua.edu.cn et connectez-vous pour obtenir la méthode de téléchargement de logiciels authentiques tels que Win10, un logiciel antivirus, WPS, MS Visio, MS Visual Studio, MATLAB, etc.

### THON

Visitez https://mirrors.tuna.tsinghua.edu.cn et cliquez pour obtenir le lien de téléchargement.

## Segment IP sur le campus

Il y en a 6/16 dans l'école, merci de vous référer à https://bgp.he.net/AS45576

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

La v6 utilise généralement `2402:f000::/32` et certaines zones utilisent `2001:250:200::/48` (Internet Research Institute). Il existe un paragraphe `2001:da8:200::/48` mais il n'est pas utilisé.
