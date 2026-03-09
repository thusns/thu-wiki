---

---
# Guía de uso del servicio Tsinghua (principalmente para usuarios de Linux)

Este artículo se centrará en las instrucciones de uso de algunos servicios de Tsinghua en máquinas Linux, incluidos los servidores remotos.

y guía de activación para Windows 10 en el campus


## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

De acuerdo con las recomendaciones de la red del campus, al configurar DNS y NTP, se deben utilizar al menos los servicios proporcionados por la red del campus.

Actualmente, solo el DNS proporcionado por la red del campus se puede utilizar dentro de la red del campus y no se garantiza que otros DNS funcionen.

## SSLVPN

No hay ningún cliente PULSE SECURE en una máquina Linux. Además de utilizar WEB VPN, también puede utilizar `openconnect` para conectarse a Tsinghua VPN.

Si es el sistema Debian, incluido Ubuntu, puede usar

```bash
$ apt-get install openconnect
```

Si es Arch Linux, puedes usar

```bash
$ pacman -S openconnect
```

Instale este software. Para otras distribuciones, consulte usted mismo las fuentes correspondientes.

Después de la instalación, utilice

>
> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn
>

Cuando el protocolo especificado es Juniper, al cliente no se le asignará una dirección IPv6. Si se cambia a Pulse Connect Secure, puede obtener una dirección IPv6. También es necesario especificar un UserAgent para obtener correctamente las rutas IPv6; de lo contrario, se intentará enrutar todo el tráfico IPv6 a la VPN.

Utilice el siguiente método para obtener correctamente la dirección IPv6 y la ruta (específicamente 2402:f000::/32):

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

Después de ingresar su cuenta y contraseña, estará conectado a la red del campus y podrá acceder a los servicios del campus (INFO/USEREG).

Vale la pena señalar que el tráfico no relacionado con la Universidad de Tsinghua todavía se envía según la ruta original. Este comportamiento es diferente al de Windows. (Certificado de demanda de este artículo)

## autenticación de internet

### Conocimientos básicos de la red del campus.

[清华大学校园网使用简介](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf) (Dado que el enlace de actualización de la página web ha caducado, consulte [备份](/docs/thuservices/file/CampusNetworkLectureNotes201909.pdf) en este sitio)

[准入上网使用说明](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf) (este sitio[备份](/docs/thuservices/file/RealNameAuthentication20190121.pdf))

[清华大学校园网有线局域网用户准入系统使用说明（问与答）](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf) (Dado que el enlace de actualización de la página web ha caducado, consulte [备份](/docs/thuservices/file/RealNameAuthenticationFAQ20190614.pdf) en este sitio)

El documento anterior es demasiado largo y no quiero leerlo: hay dos pasos para acceder a Internet en la red del campus, uno es acceso y el otro es acceso.

Cuando no hay acceso y acceso, la máquina solo puede hacer ping a `166.111.8.28` y `2402:f000:1:801::8:28`, si tiene las direcciones v4 y v6 correspondientes. Otras direcciones en el campus no están disponibles.

Para IPv4, cuando hay acceso pero no acceso, la máquina puede hacer ping a la máquina en el campus, pero no puede hacer ping a la máquina fuera del campus, es decir, no puede acceder a la red externa. Sólo cuando hay permiso para entrar y salir, la máquina puede conectarse a la red externa.

Para IPv6, la v6 solo tiene el paso de admisión. Con la admisión, puede conectarse a la red externa.

Para las máquinas con acceso de capa 2 (red de dormitorios de Zijing, red inalámbrica del edificio de enseñanza y algunas redes de departamentos), la autenticación v4 y la autenticación v6 están vinculadas, es decir, cuando se admite v4, también se admite v6 al mismo tiempo. Para máquinas con acceso a capa 3 (redes de algunos departamentos), es necesario admitir v4 y v6 por separado.

`Tsinghua-Secure` utiliza un sistema de autenticación diferente.

### Autenticación automática de autenticación de línea de comando

Consulte el resumen de las herramientas de autenticación en [utils.md](utils.md).

Referencia a continuación [GoAuthing](https://github.com/z4yx/GoAuthing)

#### Autenticación de línea de comando

El software implementa siete funciones principales, a saber

```bash
auth-thu auth # v4准入
auth-thu deauth # 解除v4准入
auth-thu auth -6 # v6准入
auth-thu deauth -6 # 解除v6准入
auth-thu login # v4准出
auth-thu logout # 解除v4准出
auth-thu online # 保持机器在线
```

Los usuarios normales pueden colocarlo en su directorio de inicio y utilizarlo como herramienta de línea de comandos para satisfacer la mayoría de las necesidades de autenticación.

Problema conocido: después de que el usuario pasa `auth-thu auth -C` (solo entrada) y llama a `auth-thu login` (solo salida), la salida fallará.

#### autenticación automática

Para los administradores de sistemas, puede ser necesario que los servidores implementen la autenticación automática.

Después de descargar el archivo, colóquelo en el directorio correspondiente (como /usr/local/bin). Al mismo tiempo, coloque el archivo de configuración en un directorio razonable y podrá usarlo.

Para lograr una **salida precisa** automática, debe colocar el `goauthing.service` o `goauthing@.service` adjunto en la carpeta `/etc/systemd/system/` y ajustar el contenido correspondiente para que coincida con la ruta del archivo de programa y el archivo de configuración. Utilice

``` bash
$ systemctl enable goauthing.service
```

Inicie el servicio correspondiente para lograr el propósito de autenticación automática. Si desea almacenar información de la cuenta en el directorio de inicio del usuario en lugar de `/etc`, puede consultar `goauthing@.service`.

Si desea implementar la admisión automática de `v6`, consulte `goauthing6.service` y `goauthing6@.service`. Si solo desea la admisión automática v4, debe cambiar `auth` en `goauthing.service` a `auth -C` y eliminar la línea `login`.

Si alguien empaqueta esto, por favor PR. El paquete `auth-thu-bin` existe actualmente en AUR (el paquete `auth-thu` está obsoleto).

### Autenticación de servidor remoto

(Según la experiencia del autor, Usereg tiene menos comentarios sobre el éxito y el fracaso de la entrada y salida. Se recomienda utilizar la línea de comando y la autenticación de página web, y solo usar Usereg como panel de estado)

En algunos servidores, no puede utilizar un navegador para abrir [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn) para la autenticación. Solo puede utilizar [命令行工具](### 命令行认证 自动认证) o "Autenticación de acceso" para lograr el acceso.

Para la autenticación de proxy, primero debe conocer la dirección IPv4 del servidor, en el formato `166.111.x.x` o `59.66.x.x` o `101.x.x.x`. Luego abra la sección [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) "Acceso a autenticación de proxy" y complete la IP para obtener acceso. Durante la admisión, puedes elegir si deseas activar el acceso.

Para algunas máquinas con acceso de tres capas, si desea obtener acceso v6, también puede obtener acceso en "Autenticación de agencia de acceso".

Para algunos servidores que tienen acceso pero no acceso, puede usar "Conectarse a otras IP" para lograr el acceso.

En cuanto a cuestiones de entrada y salida, los RP son bienvenidos.

Con respecto al desempeño de IPv4 e IPv6 cuando la entrada y salida son en línea y fuera de línea, así como el desempeño del acceso de Capa 2/acceso de Capa 3 en el campus, los RP son bienvenidos.

### Autenticación de página web del servidor remoto

A veces la información contenida en `usereg` no es precisa. Si aún puede iniciar sesión en la máquina con `ssh` en este momento, además de la "autenticación de línea de comando" mencionada anteriormente, también puede usar opciones al iniciar sesión.

```
ssh -D <port> host
```

De esta manera, se construirá localmente un proxy calcetines5 con `<port>` como puerto. Si utiliza este proxy en el navegador, puede lograr la autenticación de la página web como de costumbre.

En particular, es importante tener en cuenta que no puede acceder directamente a auth4/auth6 para la autenticación (consulte Preguntas y respuestas). Debe acceder a auth4/auth6 mediante jump para obtener el ac\_id correcto. Generalmente, puede acceder a información/aprender/iniciar sesión para saltar, o puede saltar a través de 3.3.3.3 y [3:3:3::3]. Esta última es una solución más conveniente para que los usuarios con acceso de tres capas accedan a auth6.

### Tsinghua-Secure

Si se trata de un entorno en el campus, primero conéctese a `Tsinghua-Secure无线网使用指南` para ingresar a [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn). Después de iniciar sesión, configure la contraseña utilizada por Tsinghua-Secure en `自注册及修改口令处`. No es necesario que esta contraseña sea la misma que la contraseña de información.

#### Administrador de red

Después de la configuración, puede usar `NetworkManager` para conectarse al Wifi. Puede consultar su documentación [清华大学无线校园网 802.1x 认证登录客户端配置说明](https://its.tsinghua.edu.cn/info/1333/2318.htm) (este sitio [备份](/docs/thuservices/file/tsinghua-secure-config.pdf))

La configuración de ejemplo `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection` es la siguiente

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

Esta configuración de muestra solo habilita IPv6 y obtiene un sufijo específico (elija el sufijo usted mismo para evitar colisiones de direcciones) y utiliza `identity` de `identity` para garantizar que la cuota no esté ocupada.

Se debe prestar especial atención si cumples las siguientes tres condiciones al mismo tiempo:

1.  `NetworkManager` usa el backend `wpa_supplicant`
1.  Usando la versión 3.0.0 y superior de `openssl`
1.  La distribución utilizada no tiene `wpa_supplicant` marcado con [修复 tls 1.0/1.1 连接的 patch](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2) (actualmente se confirma que Ubuntu tiene parche, pero NixOS no tiene parche)

Entonces es posible que su `NetworkManager` no pueda conectarse a `Tsinghua-Secure` porque la conexión tls 1.0 está deshabilitada. En este caso, existen dos soluciones, cualquiera de las cuales se puede resolver:

1.  Actualice NetworkManager a `1.41.5-dev` y superior; para ser precisos, asegúrese de que [这个 commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df) esté incluido. Agregue una línea `phase1-auth-flags=32` (`tls-1-0-enable` en `NetworkManager`) a la sección `[802-1x]` del archivo de configuración anterior. Esta opción corresponde a `0x20`, convertida a decimal `32`, esta relación de conversión no está registrada actualmente en el documento, por lo que no hay garantía de que el número 32 siempre sea válido. Un método más garantizado es configurar manualmente `802-1x.phase1-auth-flags` en `tls-1-0-enable` usando `nmcli`.
1.  Aplique el parche mencionado anteriormente a su `wpa_supplicant`.

#### wpa_supplicant

También puedes usar `wpa_supplicant` para completar la conexión wifi correspondiente. Instale `wpa_supplicant`, edite `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`, donde `XXXX` es el nombre de la tarjeta de red local, ingrese la siguiente configuración

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

Entre ellos, `username` y `password` son la información correspondiente a su propia cuenta. Entonces entra

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

Estás listo para conectarte.

Nota: Esta configuración fue aportada por [orv](http://hep.tsinghua.edu.cn/~orv).

#### iwd

Debido al problema del certificado de Tsinghua-Secure (la longitud de p en dhparams es solo 1024, lo que no cumple con [Linux 内核的 1536 长度需求](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52)) y iwd depende de la herramienta de criptografía del kernel, el uso predeterminado de iwd no puede conectarse.

[NickCao](https://github.com/NickCao) proporciona [dhack 内核模块](https://github.com/NickCao/dhack) y parches de herramientas ell (a continuación) para este propósito; el primero implementa el parche secuestrando los símbolos correspondientes, y el segundo reemplaza directamente los parámetros en el código fuente cuando nix construye el paquete de software. Los usuarios pueden crear sus propios núcleos y herramientas por analogía.

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

Además la configuración es la siguiente

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

### Tsinghua-Secure solo método de inicio de sesión en el campus

Hemos notado que la dirección IPv4 obtenida después de conectarse a Tsinghua-Secure ingresará automáticamente a la tabla de salida permitida, que puede ocupar los dispositivos salientes existentes en circunstancias inesperadas.

Después de las pruebas, se descubrió que si el nombre de usuario utilizado al iniciar sesión es "nombre de usuario@tsinghua" (por ejemplo, lh14@tsinghua), entonces el comportamiento de inicio de sesión es el mismo que "solo inicio de sesión en el campus". En este caso, la v4 solo tiene acceso y la v6 tiene acceso y salida.

Después de usar este método para la autenticación, la prueba del autor se puede usar para autenticar a través de "net.tsinghua.edu.cn", pero el comportamiento es diferente en la red cableada.

## Discusión sobre las características de la red de campus

### Aislamiento de segunda capa/aislamiento de descubrimiento de vecinos

Una característica importante de la red del campus es el aislamiento de Capa 2/aislamiento de descubrimiento de vecinos. Para v4, es lo primero; para v6, es lo último. Este mecanismo está diseñado por motivos de seguridad, pero resulta inconveniente para muchos desarrolladores/usuarios.

Básicamente, esta característica divide el dominio de transmisión por el conmutador central de modo que solo un cliente y una puerta de enlace estén en el mismo dominio de transmisión.

#### IPv4

Cuando se nos asigna una IP como 59.66.130.xx/24, si queremos conectarnos a 59.66.130.yy/24, es posible que nos encontremos con que no podemos conectarnos. Fíjate que estos dos están en un /24, es decir, una segunda capa. En este caso, las dos máquinas se descubrirán entre sí a través de ARP, pero según algunos mecanismos de la escuela, ARP no puede funcionar.

En este caso, deberá agregar las siguientes rutas en ambas máquinas.

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

Los parámetros correspondientes deben modificarse según la situación real.

#### IPv6

El IPv6 de Bauhinia no tiene este problema porque su dirección es /128.

Cuando estemos bajo Tsinghua-Secure, asignaremos direcciones a través de SLAAC, es decir, las direcciones de todos están bajo el mismo /64. Cuando queremos comunicarnos entre nosotros, debemos descubrirlos a través de NDP. Debido a algunos mecanismos de la red del campus, es posible que el NDP no tenga éxito.

En este caso, debe agregar las siguientes rutas en ambas máquinas

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```
Los parámetros deben confirmarse según la situación real. El primero es el prefijo /64, que se puede escribir haciendo referencia a la dirección obtenida o haciendo referencia al RA. La segunda es la dirección LL de la puerta de enlace, que es la misma que la dirección que se muestra en la ruta predeterminada. La tercera es la tarjeta de red inalámbrica.

### bloqueo de puerto bajo

Según el documento anterior "Introducción al uso", IPv4 bloquea los puertos 0 a 1024, 8000 a 8100, 3389 y 9100. Además, por razones bien conocidas, los puertos 1080, 4781 y 7890 también están bloqueados.

A partir del otoño de 2022, IPv6 bloqueará la parte baja del puerto.

### IP dinámica

Para IP dinámica, podemos usar DDNS para resolverlo. Los principales proveedores como DNSPod, dns.he.net y cloudflare brindan este servicio.

Tomando dns.he.net como ejemplo, primero agregue un registro A/AAAA y elija usar DDNS. Después de crearlo, crea un token de actualización, marcado como T. Escribimos el siguiente script

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```
Tenga en cuenta que Token es la T que contiene. Modifique los parámetros restantes según sea necesario.

Y use cron para ejecutar el script periódicamente, digamos cada cinco minutos. Puede consultar el comando https://crontab.guru/ para obtener una explicación detallada.

#### Sufijo estático IPv6 o dirección IPv6 corta

Sabemos que bajo SLAAC (común en Tsinghua-Secure), el cliente puede determinar los últimos 64 bits de la dirección IPv6. En este momento podemos configurar un sufijo estático o incluso un sufijo corto. Si una máquina está solo en una ubicación, el prefijo casi puede considerarse fijo (se requiere verificación).

(Tucao: Token es un conjunto de herramientas que casi nunca se mencionan en los estándares, y hay pocos documentos (hay pocos documentos para IPv6), y sigue siendo una cosa muy específica; después de todo, ¿quién necesita sufijos estáticos? En lugar de usar sufijos estáticos para comunicarse entre máquinas en la misma subred (sí, no hay elementos de enrutamiento con solo sufijos, por lo que siempre debe agregar un prefijo a otra máquina en la red), es mejor configurar una dirección privada estática)

Normalmente el IPv6 que nos asignan es más complicado porque se utilizan EUI64 o extensiones de privacidad. Para EUI64, el campo `ff:fe` se puede encontrar en la dirección.

Podemos configurar el sufijo estático a través de iproute2 o el paquete tradicional. Busque en Google el uso de este último, y aquí se proporciona el método del primero.

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

**Antes de ejecutar este comando**, debemos tener en cuenta que debemos desactivar `forwarding` de la tarjeta de red (**durante la configuración**, el reenvío se puede activar después de la configuración), abrir `accept_ra` y `autoconf`, y desactivar la función v6 de otros clientes dhcp.

(Tucao: aunque dhcpcd es un cliente dhcp, también se hace cargo de SLAAC, lo cual es muy molesto. Según la tradición, solo necesita abrir `accept_ra` y `autoconf`, y el kernel de Linux configurará automáticamente la dirección v6. Si se usa `forwarding=1`, debemos usar __JUE_WIKI_TOKEN_3__)

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

Reemplace algunos parámetros del comando anterior según sea necesario. Podemos poner el comando anterior en el script de inicio para configurar automáticamente el token.

#### Intente obtener una dirección IPv4 o IPv6 específica

Usted es tolerante con las solicitudes de direcciones específicas en las solicitudes DHCP (la terminología v4 y v6 es diferente y no está estrictamente establecida).

configuración dhcpcd

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

Se ha editado parte de la información en la configuración; consulte la página de manual y el entorno de red real para la configuración.

A continuación se adjuntan algunos registros para explorar el proceso de entrada en vigor de esta configuración. El autor cree que esta configuración solo se puede utilizar después de que expire el contrato de arrendamiento anterior o se anule la dirección anterior.

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

### IPv6 para red departamental (acceso capa 3)

Algunas redes de departamentos son redes de campus con acceso de tres capas y SLAAC está configurado en la red.

Después de que algunas máquinas (como las configuraciones predeterminadas de Windows y algunas configuraciones predeterminadas de Linux) estén configuradas con extensiones de privacidad, sus direcciones IPv6 continuarán cambiando en el entorno SLAAC. Dado que la admisión de la escuela se basa en direcciones IPv6, la manifestación específica es que después de usar auth6 para acceder a IPv6 durante un período de tiempo, el acceso se pierde y debe iniciar sesión en auth6 nuevamente.

Una forma es desactivar la dirección temporal privada IPv6 (puede buscar en Google para obtener información relevante) y la otra es utilizar un cliente de admisión automática, como el servicio goauthing6.de auth-thu mencionado anteriormente.

### DHCPv6 no compatible con RFC

> El servidor DHCPv6 de su escuela no reconocerá ciertos DUID y no responderá a dichas solicitudes de DHCP. Incluso después de que la escuela informó el problema y trató de que el fabricante lo solucionara, el problema seguía existiendo.
>
> Según fuentes relevantes, solo se reconoce DUID Tipo 1, es decir, DUID-LLT. El método de configuración correspondiente de dhcpcd se proporciona a continuación.
>
> Primero abra `duid` en `/etc/dhcpcd.conf` y asegúrese de que `clientid` no esté abierto. Luego verificamos los siguientes archivos
>
> ```
> $ gato /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
> ```
>
> Si comienza con `00:01`, indica DUID-LLT, de lo contrario (o el archivo no existe) es necesario cambiarlo al formato anterior. Al mismo tiempo, debe verificar si el último `ff:ff:ff:ff:ff:ff` es la dirección MAC de la tarjeta de red correspondiente. De lo contrario, deberá cambiarlo a la dirección correspondiente.
>
> **ACTUALIZACIÓN** Las pruebas han revelado que no tenemos idea de cómo funciona el DHCPv6 de su escuela. Cómo funciona es completamente metafísico. Algunos se pueden usar si Anonymize está activado, mientras que algunos intentos fallan incluso si Anonymize está activado.
>
> Para algunas experiencias, consulte https://pwe.cat/zijing-dhcpv6/

Intentos recientes han descubierto que usar una versión más reciente de `systemd-networkd` puede obtener la dirección de manera estable.

### Si no hay tráfico durante 30 minutos, perderás el acceso.

De acuerdo con las "Instrucciones para el acceso a Internet" mencionadas anteriormente, cuando la computadora no usa la red durante un período prolongado (actualmente 30 minutos), el sistema de autenticación cerrará su conexión de red; <del>Si es necesario, el servidor puede hacer ping a ping.tsinghua.edu.cn una vez cada 10 minutos. </del>(Caducado)

### No se puede salir con precisión después de perder la salida precisa

Es posible que algunas máquinas que han estado funcionando durante mucho tiempo no puedan conectarse a la red fuera del campus. En este caso, muchos estudiantes pueden intentar **exportar con precisión** en el registro de usuario o en la línea de comando, pero descubren que la exportación precisa no tiene éxito. **En el registro de usuario, incluso si la máquina aparece en la lista de exportación precisa, no se puede acceder a la red fuera del campus desde la máquina**. Creemos que se trata de un problema con la sincronización del estado de algunos dispositivos en la red del campus.

Una posible solución a este problema es cerrar sesión primero, luego entrar y salir. Esto puede actualizar el estado de algunas máquinas en la escuela, para que la salida pueda ser exitosa. ¡Aviso! ¡Cerrar sesión es una operación muy peligrosa! ¡Puede experimentar desconexiones ssh y perder permanentemente el contacto con su máquina! ¡Opérelo después de comprender completamente el significado de esta operación y saber cómo restaurar el acceso después de cerrar sesión!

### No se puede salir después de la admisión (solo después de iniciar sesión en el campus)

Mencionamos anteriormente el método de inicio de sesión Tsinghua-Secure solo en el campus. También existen soluciones de inicio de sesión en el campus correspondientes en la línea de comando (verifique los parámetros relevantes) y la página web (casilla de verificación solo en el campus en la interfaz de acceso). Sin embargo, algunos estudiantes observaron que después de iniciar sesión en el campus, el inicio de sesión a través de net.tsinghua.edu.cn falló y el inicio de sesión de usuario falló. Al igual que el problema anterior, este también debería ser un problema con el estado de ciertos dispositivos y actualmente no existe una solución.

### Cuando no está permitido, otras máquinas pueden hacer ping, pero no pueden usar ssh.

La imposibilidad de realizar ssh está determinada por la política previa (consulte las "Instrucciones (Preguntas y respuestas) del sistema de acceso de usuario de LAN cableada de la red del campus de la Universidad de Tsinghua" en la sección Conceptos básicos de la red del campus de este capítulo)

La capacidad de hacer ping también está determinada por la política previa, pero esto no está documentado; es decir, se permiten paquetes de respuesta ICMP cuando no se admiten.

## Disco de nube de Tsinghua

Se recomienda utilizar el cliente Linux en [seafile.com/download](https://seafile.com/download) en lugar del cliente Terminal, porque el cliente Terminal requiere una contraseña independiente. Esta contraseña es diferente de la contraseña INFO y no se puede obtener, por lo que no puede iniciar sesión a través del cliente Terminal.

Dado que no se recomienda la instalación manual del software, utilice un administrador de paquetes para obtener el software correspondiente. Para los usuarios de Arch Linux, el cliente Linux es

```bash
pacman -S seafile-client
```

En lugar de `pacman -S seafile`, este paquete es el cliente Terminal. Para otras distribuciones, busque usted mismo los paquetes correspondientes.

### Usando el cliente Terminal

El cliente Terminal admite el uso de Token para sincronización después de la versión 8.0.4. Puede encontrar la fuente de la arquitectura AMD64 para la mayoría de las versiones en [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/). Si el número de versión de `seafile` o `seafile-cli` en el administrador de paquetes que está utilizando es inferior a `8.0.4`, puede instalarlo y consultar el método para reemplazar algunos archivos más adelante, o puede compilar directamente la última versión manualmente.

#### Obtener ficha

Inicie sesión en Tsinghua Cloud Disk en el navegador. El `seahub_auth` en la cookie debe seguir el patrón de `用户名（学号@tsinghua.edu.cn）@Token` y el último párrafo es el token. El Token de cada cuenta es único y no caducará.

Después de que `seaf-cli` pueda ejecutarse normalmente, puede usar la línea de comando para realizar operaciones de sincronización.

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### Reemplace algunos archivos para implementar el inicio de sesión con token

`seaf-cli` esencialmente se comunica con `seaf-daemon` a través de `pysearpc`, por lo que la versión inferior de `seafile` en las fuentes predeterminadas de la mayoría de las distribuciones funcionará bien simplemente reemplazando `seaf-cli`. A continuación se muestra una forma sencilla de implementar el inicio de sesión con token reemplazando `seaf-cli` después de instalar el cliente Terminal.

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### Compile el cliente Terminal

Para conocer el proceso de compilación específico, consulte [build_seafile](https://manual.seafile.com/build_seafile/linux/), pero hay algunos puntos a tener en cuenta:

- Descargue y compile el código fuente más reciente o la última versión en cada almacén
- Puedes ignorar la parte `ccnet` del documento, el almacén ha desaparecido y no hay dependencias relevantes.
- Existe la probabilidad de que la marca falle. Puedes intentarlo unas cuantas veces más.
- Si `seaf-cli` informa un error después de completar la instalación, por ejemplo, `No module named 'seafile'`, puede consultar la sección anterior para copiar manualmente el paquete `seafile`

### Chrome advierte que los archivos descargados son peligrosos

Este fenómeno puede deberse a la extraña operación de los estudiantes de Qiaoqiu, que hicieron que Chrome marcara el nombre de dominio de Tsinghua Cloud Disk, y luego se recordará a todas las descargas de archivos que pueden ser peligrosas y estar bloqueadas.

Por favor ignore este recordatorio. Por supuesto, si descargaste un archivo realmente fantástico, compruébalo tú mismo.

## ISATAP (detenido)

Actualmente el servicio está parado.
  
Referencia [ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn). También hay [AUR 包 thu-isatap](https://aur.archlinux.org/packages/thu-isatap) como referencia.

Actualmente, sólo los usuarios públicos de IPv4 del campus pueden utilizar este servicio, no los que están fuera del campus. Tenga en cuenta que `166.111.21.1` esta IP no responderá a los paquetes de ping.

### Obtenga PT vinculado a IPv6

Dado que puede obtener la IP pública del campus usando SSLVPN en casa, puede usar ISATAP para obtener la dirección IPv6 de Tsinghua para lograr la función PT, que no se discutirá en detalle aquí.

## Activación de GANAR 10

Utilice este comando en Linux para obtener instrucciones cmd relevantes

```
$ dig -t TXT win10.harrychen.xyz +short
```

o usar bajo Windows

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

Luego ejecute el script mientras está conectado a sslvpn para activar

## Descargas de software y sistemas operativos originales

### ES

Visite https://its.tsinghua.edu.cn e inicie sesión para obtener el método de descarga de software original como Win10, software antivirus, WPS, MS Visio, MS Visual Studio, MATLAB, etc.

### ATÚN

Visite https://mirrors.tuna.tsinghua.edu.cn y haga clic para obtener el enlace de descarga.

## Segmento IP en el campus

Hay 6/16 en la escuela, consulte https://bgp.he.net/AS45576

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

v6 generalmente usa `2402:f000::/32`, y algunas áreas usan `2001:250:200::/48` (Instituto de Investigación de Internet). Hay un párrafo `2001:da8:200::/48` pero no se utiliza.
