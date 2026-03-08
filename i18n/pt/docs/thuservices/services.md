# Guia de uso do serviço Tsinghua (principalmente para usuários Linux)

Este artigo se concentrará nas instruções de uso de alguns serviços Tsinghua em máquinas Linux, incluindo servidores remotos.

e guia de ativação para Windows 10 no campus


## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

De acordo com as recomendações da rede do campus, ao configurar DNS e NTP, você deve utilizar pelo menos os serviços fornecidos pela rede do campus.

Atualmente, apenas o DNS fornecido pela rede do campus pode ser usado na rede do campus, e não há garantia de que outros DNS funcionem.

## SSLVPN

Não há cliente PULSE SECURE em uma máquina Linux. Além de usar WEB VPN, você também pode usar `openconnect` para se conectar ao Tsinghua VPN.

Se for um sistema Debian, incluindo Ubuntu, você pode usar

```bash
$ apt-get install openconnect
```

Se for Arch Linux, você pode usar

```bash
$ pacman -S openconnect
```

Instale este software. Para outras distribuições, verifique você mesmo as fontes correspondentes.

Após a instalação, use

>
> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn
>

Quando o protocolo especificado for Juniper, o cliente não receberá um endereço IPv6. Se for alterado para Pulse Connect Secure, ele poderá obter um endereço IPv6. Um UserAgent também precisa ser especificado para obter rotas IPv6 corretamente, caso contrário, todo o tráfego IPv6 será tentado para ser roteado para a VPN.

Use o método a seguir para obter corretamente o endereço e a rota IPv6 (especificamente 2402:f000::/32):

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

Após inserir sua conta e senha, você estará conectado à rede do campus e poderá acessar os serviços do campus (INFO/USEREG).

É importante notar que o tráfego não relacionado à Universidade de Tsinghua ainda é enviado de acordo com a rota original. Esse comportamento é diferente daquele no Windows. (Certificado de demanda deste item)

## Autenticação na Internet

### Conhecimento básico da rede do campus

[清华大学校园网使用简介](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf) (Como o link de atualização da página da web expirou, consulte [备份](file/CampusNetworkLectureNotes201909.pdf) neste site)

[准入上网使用说明](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf) (este site[备份](file/RealNameAuthentication20190121.pdf))

[清华大学校园网有线局域网用户准入系统使用说明（问与答）](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf) (Como o link de atualização da página da web expirou, consulte [备份](file/RealNameAuthenticationFAQ20190614.pdf) neste site)

O documento acima é muito longo e não quero lê-lo: Existem duas etapas para acessar a Internet na rede do campus, uma é o acesso e a outra é o acesso.

Quando não há acesso e acesso, a máquina só pode executar ping em `166.111.8.28` e `2402:f000:1:801::8:28`, se você tiver os endereços v4 e v6 correspondentes. Outros endereços no campus não estão disponíveis.

Para IPv4, quando há acesso, mas não há acesso, a máquina pode executar ping na máquina do campus, mas não pode executar ping na máquina fora do campus, ou seja, não pode acessar a rede externa. Somente quando houver permissão para entrar e sair, a máquina poderá se conectar à rede externa.

Para IPv6, a v6 possui apenas a etapa de admissão. Com a admissão, você pode se conectar à rede externa.

Para máquinas com acesso à camada 2 (rede de dormitório Zijing, rede sem fio de prédio de ensino e algumas redes de departamento), a autenticação v4 e a autenticação v6 estão vinculadas, ou seja, quando v4 é admitido, v6 também é admitido ao mesmo tempo. Para máquinas com acesso à camada 3 (redes de alguns departamentos), v4 e v6 precisam ser admitidos separadamente.

`Tsinghua-Secure` usa um sistema de autenticação diferente.

### Autenticação de linha de comando autenticação automática

Veja o resumo das ferramentas de autenticação em [utils.md](utils.md).

Referência abaixo [GoAuthing](https://github.com/z4yx/GoAuthing)

#### Autenticação de linha de comando

O software implementa sete funções principais, nomeadamente

```bash
auth-thu auth # v4准入
auth-thu deauth # 解除v4准入
auth-thu auth -6 # v6准入
auth-thu deauth -6 # 解除v6准入
auth-thu login # v4准出
auth-thu logout # 解除v4准出
auth-thu online # 保持机器在线
```

Os usuários comuns podem colocá-lo em seu diretório inicial e usá-lo como uma ferramenta de linha de comando para atender à maioria das necessidades de autenticação.

Problema conhecido: depois que o usuário passa `auth-thu auth -C` (somente entrada) e chama `auth-thu login` (somente saída), a saída falhará.

#### autenticação automática

Para administradores de sistema, pode ser necessário que os servidores implementem autenticação automática.

Após baixar o arquivo, coloque-o no diretório correspondente (como /usr/local/bin). Ao mesmo tempo, coloque o arquivo de configuração em um diretório razoável e você poderá usá-lo.

Para obter uma **saída precisa** automática, você precisa colocar o `goauthing.service` ou `goauthing@.service` anexado na pasta `/etc/systemd/system/` e ajustar o conteúdo correspondente para corresponder ao caminho do arquivo de programa e do arquivo de configuração, use

``` bash
$ systemctl enable goauthing.service
```

Inicie o serviço correspondente para atingir o objetivo de autenticação automática. Se quiser armazenar informações da conta no diretório inicial do usuário em vez de `/etc`, você pode consultar `goauthing@.service`.

Se você deseja implementar a admissão automática de `v6`, consulte `goauthing6.service` e `goauthing6@.service`. Se você deseja apenas a admissão automática da v4, você precisa alterar `auth` em `goauthing.service` para `auth -C` e excluir a linha `login`.

Se alguém empacotar isso, por favor PR. O pacote `auth-thu-bin` existe atualmente no AUR (o pacote `auth-thu` está obsoleto).

### Autenticação de servidor remoto

(Pela experiência do autor, usereg tem menos feedback sobre o sucesso e o fracasso de entrada e saída. Recomenda-se usar autenticação de linha de comando e página da web e usar usereg apenas como painel de status)

Em alguns servidores, você não pode usar um navegador para abrir [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn) para autenticação. Você só pode usar [命令行工具](### 命令行认证 自动认证) ou "Autenticação de Acesso" para obter acesso.

Para autenticação de proxy, você precisa primeiro saber o endereço IPv4 do servidor, no formato `166.111.x.x` ou `59.66.x.x` ou `101.x.x.x`. Em seguida, abra a seção [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) "Acesso à autenticação proxy" e preencha o IP para obter acesso. Durante a admissão, você pode escolher se deseja ativar o acesso.

Para algumas máquinas com acesso de três camadas, se você deseja obter acesso v6, também pode obter acesso em "Autenticação de agência de acesso".

Para alguns servidores que têm acesso, mas não têm acesso, você pode usar "Conectar a outros IPs" para obter acesso.

Em relação às questões de entrada e saída, os PRs são bem-vindos.

Em relação ao desempenho do IPv4 e IPv6 quando a entrada e saída são online e offline, bem como o desempenho do acesso Camada 2/acesso Camada 3 no campus, os PRs são bem-vindos.

### Autenticação de página web de servidor remoto

Às vezes, as informações em `usereg` não são precisas. Se você ainda puder fazer login na máquina com `ssh` neste momento, além da "autenticação de linha de comando" mencionada anteriormente, você também poderá usar opções ao fazer login.

```
ssh -D <port> host
```

Desta forma, um proxy Socks5 com `<port>` como porta será construído localmente. Se você usar esse proxy no navegador, poderá obter a autenticação da página da web normalmente.

Em particular, é importante observar que você não pode acessar diretamente auth4/auth6 para autenticação (consulte Perguntas e Respostas). Você precisa acessar auth4/auth6 através do salto para obter o ac\_id correto. Geralmente, você pode acessar info/learn/login para pular ou pode pular para 3.3.3.3 e [3:3:3::3]. Esta última é uma solução mais conveniente para usuários com acesso de três camadas para acessar o auth6.

### Tsinghua-Seguro

Se for um ambiente no campus, primeiro conecte-se a `Tsinghua-Secure无线网使用指南` para entrar em [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn). Após fazer login, defina a senha usada pela Tsinghua-Secure em `自注册及修改口令处`. Essa senha não precisa ser igual à senha de informações.

#### Gerenciador de rede

Após a configuração, você pode usar `NetworkManager` para se conectar ao Wifi. Você pode consultar sua documentação [清华大学无线校园网 802.1x 认证登录客户端配置说明](https://its.tsinghua.edu.cn/info/1333/2318.htm) (este site [备份](file/tsinghua-secure-config.pdf))

A configuração de exemplo `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection` é a seguinte

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

Este exemplo de configuração habilita apenas IPv6 e obtém um sufixo específico (escolha você mesmo o sufixo para evitar colisão de endereços) e usa `identity` de `identity` para garantir que a cota não esteja ocupada.

Atenção especial deve ser dada se você atender às três condições a seguir ao mesmo tempo:

1.  `NetworkManager` usa o back-end `wpa_supplicant`
1.  Usando a versão 3.0.0 e superior de `openssl`
1.  A distribuição utilizada não possui `wpa_supplicant` marcado com [修复 tls 1.0/1.1 连接的 patch](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2) (atualmente está confirmado que o Ubuntu possui um patch, mas o NixOS não possui um patch)

Então seu `NetworkManager` pode não conseguir se conectar a `Tsinghua-Secure` porque a conexão tls 1.0 está desativada. Neste caso, existem duas soluções, qualquer uma das quais pode ser resolvida:

1.  Atualize o NetworkManager para `1.41.5-dev` e superior, para ser mais preciso, certifique-se de que [这个 commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df) esteja incluído. Adicione uma linha `phase1-auth-flags=32` (`tls-1-0-enable` em `NetworkManager`) à seção `[802-1x]` do arquivo de configuração acima. Esta opção corresponde a `0x20`, convertido para decimal `32`, esta relação de conversão não está atualmente registrada no documento, portanto não há garantia de que o número 32 será sempre válido. Um método mais garantido é definir manualmente `802-1x.phase1-auth-flags` para `tls-1-0-enable` usando `nmcli`.
1.  Aplique o patch mencionado acima ao seu `wpa_supplicant`.

#### wpa_supplicante

Você também pode usar `wpa_supplicant` para completar a conexão wifi correspondente. Instale `wpa_supplicant`, edite `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`, onde `XXXX` é o nome da placa de rede local, insira a seguinte configuração

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

Entre eles, `username` e `password` são as informações correspondentes da sua própria conta. Então entre

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

Você está pronto para se conectar.

Nota: Esta configuração foi contribuída por [orv](http://hep.tsinghua.edu.cn/~orv).

#### iwd

Devido ao problema de certificado do Tsinghua-Secure (o comprimento de p em dhparams é apenas 1024, o que não está em conformidade com [Linux 内核的 1536 长度需求](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52)), e o iwd depende da ferramenta de criptografia do kernel, o uso padrão do iwd não pode ser conectado.

[NickCao](https://github.com/NickCao) fornece [dhack 内核模块](https://github.com/NickCao/dhack) e patches de ferramentas ell (abaixo) para esta finalidade; o primeiro implementa o patch sequestrando os símbolos correspondentes, e o último substitui diretamente os parâmetros no código-fonte quando nix constrói o pacote de software. Os usuários podem construir seus próprios kernels e ferramentas por analogia.

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

Além disso, a configuração é a seguinte

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

### Método de login Tsinghua-Secure apenas no campus

Percebemos que o endereço IPv4 obtido após a conexão com o Tsinghua-Secure entrará automaticamente na tabela de saída permitida, que pode ocupar os dispositivos de saída existentes em circunstâncias inesperadas.

Após o teste, descobriu-se que se o nome de usuário usado ao fazer login for "username@tsinghua" (por exemplo, lh14@tsinghua), o comportamento de login será o mesmo de "somente login no campus". Neste caso, v4 só tem acesso e v6 tem acesso e saída.

Depois de usar este método de autenticação, o teste do autor pode ser usado para autenticar através de "net.tsinghua.edu.cn", mas o comportamento é diferente na rede com fio.

## Discussão sobre as características da rede do campus

### Isolamento de segunda camada/isolamento de descoberta de vizinho

Um recurso importante da rede do campus é o isolamento da Camada 2/isolamento de descoberta de vizinhos. Para v4, é o primeiro; para v6, é o último. Este mecanismo foi projetado para segurança, mas é inconveniente para muitos desenvolvedores/usuários.

Esse recurso divide essencialmente o domínio de broadcast pelo switch principal, de modo que apenas um cliente e um gateway estejam no mesmo domínio de broadcast.

#### IPv4

Quando recebemos um IP como 59.66.130.xx/24, se quisermos nos conectar a 59.66.130.yy/24, podemos descobrir que não conseguimos nos conectar. Observe que esses dois estão em um /24, ou seja, uma segunda camada. Neste caso, as duas máquinas se descobrirão através do ARP, mas sob alguns mecanismos da escola, o ARP não pode funcionar.

Neste caso, você precisa adicionar as seguintes rotas em ambas as máquinas.

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

Os parâmetros correspondentes precisam ser modificados de acordo com a situação real.

#### IPv6

O IPv6 da Bauhinia não apresenta esse problema porque seu endereço é /128.

Quando estivermos no Tsinghua-Secure, alocaremos endereços através do SLAAC, ou seja, os endereços de todos estão no mesmo /64. Quando queremos nos comunicar uns com os outros, precisamos descobri-los através do NDP. Devido a alguns mecanismos da rede do campus, o NDP pode não ter sucesso.

Neste caso, você precisa adicionar as seguintes rotas em ambas as máquinas

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```
Os parâmetros precisam ser confirmados de acordo com a situação real. O primeiro é o prefixo /64, que pode ser escrito referindo-se ao endereço obtido ou referindo-se ao RA. O segundo é o endereço LL do gateway, que é igual ao endereço exibido na rota padrão. A terceira é a placa de rede sem fio.

### bloqueio de porta baixo

De acordo com o documento anterior "Introdução ao uso", o IPv4 bloqueia as portas 0 a 1024, 8000 a 8100, 3389 e 9100. Além disso, por motivos bem conhecidos, as portas 1080, 4781 e 7890 também são bloqueadas.

A partir do outono de 2022, o IPv6 bloqueará a parte baixa da porta.

### IP Dinâmico

Para IP dinâmico, podemos usar DDNS para resolvê-lo. Os principais provedores, como DNSPod, dns.he.net e cloudflare, fornecem esse serviço.

Tomando dns.he.net como exemplo, primeiro adicione um registro A/AAAA e escolha usar DDNS. Após criá-lo, crie um token de atualização, marcado como T. Escrevemos o seguinte script

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```
Observe que Token é o T nele. Modifique os parâmetros restantes conforme necessário.

E use o cron para executar o script periodicamente, digamos a cada cinco minutos. Você pode consultar o comando https://crontab.guru/ para obter explicações detalhadas.

#### Sufixo estático IPv6 ou endereço IPv6 curto

Sabemos que no SLAAC (comum no Tsinghua-Secure), os últimos 64 bits do endereço IPv6 podem ser determinados pelo cliente. Neste momento, podemos configurar um sufixo estático ou até mesmo um sufixo curto. Se uma máquina estiver em apenas um local, o prefixo pode ser quase considerado fixo (é necessária verificação).

(Tucao: Token é um conjunto de ferramentas que quase nunca é mencionado em padrões, e há poucos documentos (há poucos documentos para IPv6), e ainda é uma coisa muito específica; afinal, quem precisa de sufixos estáticos? Em vez de usar sufixos estáticos para comunicação entre máquinas na mesma sub-rede (sim, não há itens de roteamento apenas com sufixos, então você precisa sempre adicionar um prefixo para outra máquina na rede), é melhor configurar um endereço privado estático)

Normalmente, o IPv6 que nos é atribuído é mais complicado porque são usadas extensões EUI64 ou de privacidade. Para EUI64, o campo `ff:fe` pode ser encontrado no endereço.

Podemos configurar o sufixo estático através do iproute2 ou do pacote tradicional. Por favor, pesquise no Google para usar o último, e o método do primeiro é fornecido aqui.

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

**Antes de executar este comando**, precisamos observar que precisamos desligar `forwarding` da placa de rede (**durante a configuração**, o encaminhamento pode ser ativado após a configuração), abrir `accept_ra` e `autoconf` e desligar a função v6 de outros clientes dhcp.

(Tucao: Embora dhcpcd seja um cliente dhcp, ele também assume o SLAAC, o que é muito chato. De acordo com a tradição, você só precisa abrir `accept_ra` e `autoconf`, e o kernel do Linux configurará automaticamente o endereço v6. Se `forwarding=1` for usado, precisamos usar `accept_ra=2`)

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

Substitua alguns parâmetros do comando acima conforme necessário. Podemos colocar o comando acima no script de inicialização para configurar automaticamente o token.

#### Tente obter um endereço IPv4 ou IPv6 específico

Você é tolerante com solicitações de endereços específicos em solicitações DHCP (a terminologia v4 e v6 é diferente e não é estritamente declarada).

configuração do dhcpcd

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

Algumas informações na configuração foram editadas; consulte a página de manual e o ambiente de rede real para configuração.

Anexados abaixo estão alguns registros para explorar o processo de entrada em vigor desta configuração. O autor acredita que esta configuração só pode ser usada depois que o contrato antigo expirar ou o endereço antigo for desativado.

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

### IPv6 para rede de departamento (acesso camada 3)

Algumas redes de departamentos são redes de campus com acesso de três camadas e o SLAAC é configurado na rede.

Depois que algumas máquinas (como as configurações padrão do Windows e algumas configurações padrão do Linux) forem configuradas com extensões de privacidade, seus endereços IPv6 continuarão a mudar no ambiente SLAAC. Como a admissão da escola é baseada em endereços IPv6, a manifestação específica é que o acesso é perdido após usar o auth6 para acessar o IPv6 por um período de tempo, sendo necessário fazer login no auth6 novamente.

Uma maneira é desativar o endereço temporário privado IPv6 (você pode pesquisar no Google para obter informações relevantes) e a outra maneira é usar um cliente de admissão automática, como o goauthing6.service de auth-thu mencionado acima.

### DHCPv6 não compatível com RFC

> O servidor DHCPv6 da sua escola não reconhecerá determinados DUIDs e não responderá a tais solicitações de DHCP. Mesmo depois de a escola ter relatado o problema e ter tentado convencer o fabricante a corrigi-lo, o problema ainda existia.
>
> Segundo fontes relevantes, apenas o DUID Tipo 1, ou seja, DUID-LLT, é reconhecido. O método de configuração correspondente do dhcpcd é fornecido abaixo.
>
> Primeiro abra `duid` em `/etc/dhcpcd.conf` e certifique-se de que `clientid` não esteja aberto. Em seguida, verificamos os seguintes arquivos
>
> ```
> $ cat /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
> ```
>
> Se começar com `00:01`, indica DUID-LLT, caso contrário (ou o arquivo não existe) precisa ser alterado para o formato acima. Ao mesmo tempo, você precisa verificar se o último `ff:ff:ff:ff:ff:ff` é o endereço MAC da placa de rede relevante. Caso contrário, você precisará alterá-lo para o endereço correspondente.
>
> **ATUALIZAÇÃO** Os testes revelaram que não temos ideia de como funciona o DHCPv6 da sua escola. Como funciona é completamente metafísico. Algumas podem ser usadas se o Anonimato estiver ativado, enquanto algumas tentativas falham mesmo se o Anonimato estiver ativado.
>
> Para algumas experiências, consulte https://pwe.cat/zijing-dhcpv6/

Tentativas recentes descobriram que usar uma versão mais recente de `systemd-networkd` pode obter o endereço de forma estável.

### Se não houver trânsito por 30 minutos, você perderá o acesso.

De acordo com as já mencionadas “Instruções para Acesso à Internet”, quando o computador não utilizar a rede por um longo período (atualmente 30 minutos), o sistema de autenticação encerrará sua conexão de rede; <del>Se necessário, o servidor pode executar ping em ping.tsinghua.edu.cn uma vez a cada 10 minutos. </del>(Expirado)

### Incapaz de sair com precisão depois de perder a saída precisa

Algumas máquinas que estão em funcionamento há muito tempo podem não conseguir se conectar à rede fora do campus. Nesse caso, muitos alunos podem tentar a **exportação precisa** no usereg ou na linha de comando, mas descobrem que a exportação precisa não teve êxito. **No usereg, mesmo que a máquina seja mostrada na lista de exportação precisa, a rede fora do campus não pode ser acessada a partir da máquina**. Acreditamos que este seja um problema de sincronização de status de alguns dispositivos na rede do campus.

Uma solução possível para esse problema é sair primeiro, depois entrar e sair. Isto pode atualizar o status de algumas máquinas na escola, para que a saída seja bem-sucedida. Perceber! Sair é uma operação muito perigosa! Você pode enfrentar desconexões de ssh e perder permanentemente o contato com sua máquina! Por favor, opere-o depois de compreender totalmente o significado desta operação e saber como restaurar o acesso após sair!

### Não é possível sair após a admissão (somente após fazer login no campus)

Mencionamos acima o método de login Tsinghua-Secure somente no campus. Existem também soluções de login no campus correspondentes na linha de comando (verifique os parâmetros relevantes) e na página da web (caixa de seleção somente no campus na interface de acesso). No entanto, alguns alunos observaram que depois de fazer login no campus, o login através de net.tsinghua.edu.cn falhou e o login do usuário falhou. Assim como o problema acima, este também deve ser um problema de status de determinados dispositivos e atualmente não há solução.

### Quando não é permitido, outras máquinas podem fazer ping, mas não podem fazer ssh.

A incapacidade de ssh é determinada pela pré-política (consulte as "Instruções (perguntas e respostas) do sistema de acesso do usuário LAN com fio da rede do campus da Universidade Tsinghua" na seção Noções básicas de rede do campus deste capítulo)

A capacidade de executar ping também é determinada pela pré-política, mas isso não está documentado; isto é, os pacotes de resposta ICMP são permitidos quando não admitidos.

## Disco de nuvem Tsinghua

Recomenda-se usar o cliente Linux em [seafile.com/download](https://seafile.com/download) em vez do cliente Terminal, pois o cliente Terminal requer uma senha independente. Esta senha é diferente da senha INFO e não pode ser obtida, portanto você não pode efetuar login através do cliente Terminal.

Como a instalação manual do software não é recomendada, use um gerenciador de pacotes para obter o software correspondente. Para usuários do Arch Linux, o cliente Linux é

```bash
pacman -S seafile-client
```

Em vez de `pacman -S seafile`, este pacote é o cliente Terminal. Para outras distribuições, encontre você mesmo os pacotes correspondentes.

### Usando o cliente Terminal

O cliente Terminal suporta o uso de Token para sincronização após a versão 8.0.4. Você pode encontrar a fonte da arquitetura AMD64 para a maioria das versões em [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/). Se o número da versão de `seafile` ou `seafile-cli` no gerenciador de pacotes que você está usando for inferior a `8.0.4`, você pode instalá-lo e consultar o método de substituição de alguns arquivos posteriormente, ou pode compilar diretamente a versão mais recente manualmente.

#### Obter token

Faça login no Tsinghua Cloud Disk no navegador. O `seahub_auth` no cookie deve estar no padrão `用户名（学号@tsinghua.edu.cn）@Token`, e o último parágrafo é o Token. O Token de cada conta é único e não expira.

Depois que `seaf-cli` puder ser executado normalmente, você poderá usar a linha de comando para realizar operações de sincronização.

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### Substitua alguns arquivos para implementar o login do token

`seaf-cli` essencialmente se comunica com `seaf-daemon` através de `pysearpc`, então a versão inferior de `seafile` nas fontes padrão da maioria das distribuições funcionará perfeitamente simplesmente substituindo `seaf-cli`. Aqui está uma maneira simples de implementar o login do Token, substituindo `seaf-cli` após instalar o cliente Terminal.

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### Compilar o cliente Terminal

Para o processo de compilação específico, consulte [build_seafile](https://manual.seafile.com/build_seafile/linux/), mas há alguns pontos a serem observados:

- Baixe e compile o código-fonte mais recente ou a versão mais recente em cada warehouse
- Você pode ignorar a parte `ccnet` do documento, o warehouse desapareceu e não há dependências relevantes.
- Existe uma probabilidade de que make falhe. Você pode tentar mais algumas vezes.
- Se `seaf-cli` relatar um erro após a conclusão da instalação, por exemplo, `No module named 'seafile'`, você pode consultar a seção anterior para copiar manualmente o pacote `seafile`

### Chrome alerta que arquivos baixados são perigosos

Esse fenômeno pode ser causado pela estranha operação dos alunos Qiaoqiu, que fez com que o Chrome marcasse o nome de domínio do Tsinghua Cloud Disk e, em seguida, todos os downloads de arquivos serão lembrados de que podem ser perigosos e bloqueados.

Por favor, ignore este lembrete. Claro, se você baixou um arquivo realmente fantástico, verifique você mesmo.

## ISATAP (parado)

Atualmente, o serviço está parado.
  
Referência [ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn). Há também [AUR 包 thu-isatap](https://aur.archlinux.org/packages/thu-isatap) para referência.

Atualmente, apenas usuários IPv4 públicos no campus podem usar este serviço, e não aqueles fora do campus. Observe que `166.111.21.1` este IP não responderá aos pacotes de ping.

### Obtenha PT vinculado a IPv6

Como você pode obter o IP público do campus usando SSLVPN em casa, você pode usar o ISATAP para obter o endereço IPv6 Tsinghua para obter a função PT, que não será discutida em detalhes aqui.

## Ativação WIN 10

Use este comando no Linux para obter instruções relevantes do cmd

```
$ dig -t TXT win10.harrychen.xyz +short
```

ou use no Windows

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

Em seguida, execute o script enquanto estiver conectado ao sslvpn para ativar

## Downloads originais de sistema operacional e software

### É

Visite https://its.tsinghua.edu.cn e faça login para obter o método de download de software genuíno, como Win10, software antivírus, WPS, MS Visio, MS Visual Studio, MATLAB, etc.

### ATUM

Visite https://mirrors.tuna.tsinghua.edu.cn e clique para obter o link de download.

## Segmento IP no campus

Há 16/06 na escola, consulte https://bgp.he.net/AS45576

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

v6 geralmente usa `2402:f000::/32` e algumas áreas usam `2001:250:200::/48` (Internet Research Institute). Existe um parágrafo `2001:da8:200::/48` mas não é usado.
