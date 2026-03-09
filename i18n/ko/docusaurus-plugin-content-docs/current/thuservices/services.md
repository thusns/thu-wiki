---

---
# 칭화 서비스 이용안내(주로 Linux 사용자 대상)

이 기사에서는 원격 서버를 포함하여 Linux 시스템에서 일부 Tsinghua 서비스의 사용 지침에 중점을 둘 것입니다.

캠퍼스 내 Windows 10 활성화 가이드


## DNS/NTP

```
166.111.8.28
166.111.8.29
2402:f000:1:801::8:28
2402:f000:1:801::8:29
```

캠퍼스 네트워크 권장 사항에 따르면 DNS 및 NTP를 구성할 때 최소한 캠퍼스 네트워크에서 제공하는 서비스를 사용해야 합니다.

현재 캠퍼스 네트워크 내에서는 캠퍼스 네트워크에서 제공하는 DNS만 사용할 수 있으며, 기타 DNS는 작동이 보장되지 않습니다.

## SSLVPN

Linux 시스템에는 PULSE SECURE 클라이언트가 없습니다. WEB VPN을 사용하는 것 외에도 `openconnect`을 사용하여 Tsinghua VPN에 연결할 수도 있습니다.

Ubuntu를 포함한 Debian 시스템인 경우 다음을 사용할 수 있습니다.

```bash
$ apt-get install openconnect
```

Arch Linux라면 다음을 사용할 수 있습니다.

```bash
$ pacman -S openconnect
```

이 소프트웨어를 설치하십시오. 다른 배포판에 대해서는 해당 소스를 직접 확인하시기 바랍니다.

설치 후 사용하세요

>
> $ openconnect --juniper https://sslvpn.tsinghua.edu.cn
>

지정된 프로토콜이 Juniper인 경우 클라이언트에 IPv6 주소가 할당되지 않습니다. Pulse Connect Secure로 변경하면 IPv6 주소를 얻을 수 있습니다. IPv6 경로를 올바르게 얻으려면 UserAgent도 지정해야 합니다. 그렇지 않으면 모든 IPv6 트래픽이 VPN으로 라우팅됩니다.

IPv6 주소 및 경로(구체적으로 2402:f000::/32)를 올바르게 얻으려면 다음 방법을 사용하십시오.

```bash
openconnect --protocol=pulse https://sslvpn.tsinghua.edu.cn --useragent Pulse-Secure/9.1.11.6725
```

계정과 비밀번호를 입력하시면 교내 네트워크에 접속되어 교내 서비스(INFO/USEREG)를 이용하실 수 있습니다.

Tsinghua University와 관련되지 않은 트래픽은 여전히 ​​원래 경로에 따라 전송된다는 점은 주목할 가치가 있습니다. 이 동작은 Windows의 동작과 다릅니다. (이 품목에 대한 수요 증명서)

## 인터넷 인증

### 캠퍼스 네트워크에 대한 기본 지식

[清华大学校园网使用简介](https://its.tsinghua.edu.cn/helpsystem/train/CampusNetworkLectureNotes201909.pdf) (웹페이지 업그레이드 링크가 만료되었으므로 본 사이트의 [备份](pathname:///docs/thuservices/file/CampusNetworkLectureNotes201909.pdf)을 참고해주세요)

[准入上网使用说明](http://166.111.5.8/commsoft/helpsystem/wirednetwork/RealNameAuthentication20190121.pdf) (이 사이트[备份](pathname:///docs/thuservices/file/RealNameAuthentication20190121.pdf))

[清华大学校园网有线局域网用户准入系统使用说明（问与答）](https://its.tsinghua.edu.cn/helpsystem/wirednetwork/RealNameAuthenticationFAQ20190614.pdf) (웹페이지 업그레이드 링크가 만료되었으므로 본 사이트의 [备份](pathname:///docs/thuservices/file/RealNameAuthenticationFAQ20190614.pdf)을 참고해주세요)

위 문서는 너무 길어서 읽고 싶지 않습니다. 캠퍼스 네트워크에서 인터넷에 접속하려면 두 단계가 있는데, 하나는 접속이고 다른 하나는 접속입니다.

액세스 및 액세스가 없을 때 해당 v4 및 v6 주소가 있는 경우 머신은 `166.111.8.28` 및 `2402:f000:1:801::8:28`만 ping할 수 있습니다. 캠퍼스 내 다른 주소는 사용할 수 없습니다.

IPv4의 경우 액세스는 있지만 액세스가 없는 경우 컴퓨터는 캠퍼스 내 컴퓨터에 대해 ping을 수행할 수 있지만 캠퍼스 외부 컴퓨터에 대해서는 ping을 수행할 수 없습니다. 즉, 외부 네트워크에 액세스할 수 없습니다. 출입 권한이 있는 경우에만 기기를 외부 네트워크에 연결할 수 있습니다.

IPv6의 경우 v6에는 승인 단계만 있습니다. 입장을 하면 외부 네트워크에 연결할 수 있습니다.

레이어 2 액세스 권한이 있는 컴퓨터(Zijing 기숙사 네트워크, 교육 건물 무선 네트워크 및 일부 부서 네트워크)의 경우 v4 인증과 v6 인증이 연결됩니다. 즉, v4가 허용되면 v6도 동시에 허용됩니다. 레이어 3 액세스 권한이 있는 머신(일부 부서의 네트워크)의 경우 v4 및 v6을 별도로 허용해야 합니다.

`Tsinghua-Secure`은(는) 다른 인증 시스템을 사용합니다.

### 명령줄 인증 자동 인증

[utils.md](utils.md)에서 인증 도구 요약을 참조하세요.

아래 참조 [GoAuthing](https://github.com/z4yx/GoAuthing)

#### 명령줄 인증

소프트웨어는 7가지 주요 기능을 구현합니다.

```bash
auth-thu auth # v4准入
auth-thu deauth # 解除v4准入
auth-thu auth -6 # v6准入
auth-thu deauth -6 # 解除v6准入
auth-thu login # v4准出
auth-thu logout # 解除v4准出
auth-thu online # 保持机器在线
```

일반 사용자는 이를 자신의 홈 디렉터리에 넣고 명령줄 도구로 사용하여 대부분의 인증 요구 사항을 충족할 수 있습니다.

알려진 문제: 사용자가 `auth-thu auth -C`(입력만)을 전달하고 `auth-thu login`(종료만)을 호출하면 종료가 실패합니다.

#### 자동 인증

시스템 관리자의 경우 서버에서 자동 인증을 구현해야 할 수도 있습니다.

파일을 다운로드한 후 해당 디렉터리(예: /usr/local/bin)에 배치하세요. 동시에 구성 파일을 적절한 디렉터리에 배치하면 사용할 수 있습니다.

자동 **정확한 출력**을 얻으려면 첨부된 `goauthing.service` 또는 `goauthing@.service`을 `/etc/systemd/system/` 폴더 아래에 배치하고 해당 콘텐츠를 프로그램 파일 및 구성 파일의 경로와 일치하도록 조정해야 합니다.

``` bash
$ systemctl enable goauthing.service
```

자동 인증 목적을 달성하려면 해당 서비스를 시작하세요. `/etc`이 아닌 사용자의 홈 디렉터리에 계정 정보를 저장하려면 `goauthing@.service`을 참조하면 됩니다.

`v6`의 자동 승인을 구현하려면 `goauthing6.service` 및 `goauthing6@.service`을 참조하세요. v4 자동 승인만 원하는 경우 `goauthing.service`의 `auth`을 `auth -C`로 변경하고 `login` 줄을 삭제해야 합니다.

누구든지 이것을 포장하면 홍보해주세요. `auth-thu-bin` 패키지는 현재 AUR에 존재합니다(`auth-thu` 패키지는 더 이상 사용되지 않음).

### 원격 서버 인증

(작성자의 경험으로 볼 때 userreg는 진입 및 종료의 성공과 실패에 대한 피드백이 적습니다. 명령줄 및 웹 페이지 인증을 사용하고 userreg를 상태 패널로만 사용하는 것이 좋습니다.)

일부 서버에서는 인증을 위해 브라우저를 사용하여 [net.tsinghua.edu.cn](https://net.tsinghua.edu.cn)을 열 수 없습니다. 액세스하려면 [命令行工具](### 命令行认证 自动认证) 또는 "액세스 인증"만 사용할 수 있습니다.

프록시 인증을 위해서는 먼저 `166.111.x.x`, `59.66.x.x` 또는 `101.x.x.x` 형식으로 서버의 IPv4 주소를 알아야 합니다. 그런 다음 [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn) "프록시 인증에 대한 액세스" 섹션을 열고 IP를 입력하여 액세스하세요. 입장 시 접근 허용 여부를 선택할 수 있습니다.

3계층 액세스가 가능한 일부 시스템의 경우 v6 액세스를 달성하려는 경우 "액세스 대행사 인증"에서도 액세스를 달성할 수 있습니다.

액세스 권한은 있지만 액세스 권한이 없는 일부 서버의 경우 "다른 IP에 연결"을 사용하여 액세스할 수 있습니다.

입국 및 출국 문제와 관련하여 PR을 환영합니다.

입학 및 퇴장이 온라인 및 오프라인일 때 IPv4 및 IPv6의 성능과 캠퍼스 내 Layer 2 액세스/Layer 3 액세스 성능에 대한 PR을 환영합니다.

### 원격 서버 웹페이지 인증

때로는 `usereg`의 정보가 정확하지 않을 수 있습니다. 현재 `ssh`을 사용하여 머신에 로그인할 수 있는 경우 앞서 언급한 "명령줄 인증" 외에 로그인 시 옵션을 사용할 수도 있습니다.

```
ssh -D <port> host
```

이러한 방식으로 포트가 `<port>`인 양말5 프록시가 로컬로 구축됩니다. 브라우저에서 이 프록시를 사용하면 평소와 같이 웹 페이지 인증을 얻을 수 있습니다.

특히, 인증을 위해 auth4/auth6에 직접 접근할 수 없다는 점에 유의하시기 바랍니다(Q&A 참조). 올바른 ac\_id를 얻으려면 점프를 통해 auth4/auth6에 액세스해야 합니다. 일반적으로 info/learn/login에 액세스하여 점프하거나 3.3.3.3 및 [3:3:3::3]을 통해 점프할 수 있습니다. 후자는 auth6에 액세스하기 위한 3계층 액세스 권한이 있는 사용자에게 더 편리한 솔루션입니다.

### 칭화-보안

캠퍼스 내 환경인 경우 먼저 `Tsinghua-Secure无线网使用指南`에 연결하여 [usereg.tsinghua.edu.cn](https://usereg.tsinghua.edu.cn)을 입력하세요. 로그인 후 Tsinghua-Secure에서 사용하는 비밀번호를 `自注册及修改口令处`에 설정하세요. 이 비밀번호는 정보 비밀번호와 동일할 필요는 없습니다.

#### 네트워크매니저

설정 후 `NetworkManager`을(를) 사용하여 Wi-Fi에 연결할 수 있습니다. 문서 [清华大学无线校园网 802.1x 认证登录客户端配置说明](https://its.tsinghua.edu.cn/info/1333/2318.htm)(이 사이트 [备份](pathname:///docs/thuservices/file/tsinghua-secure-config.pdf))을 참조할 수 있습니다.

샘플 구성 `/etc/NetworkManager/system-connections/Tsinghua-Secure.nmconnection`은 다음과 같습니다.

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

이 샘플 구성은 IPv6만 활성화하고 특정 접미사를 얻습니다(주소 충돌을 방지하려면 접미사를 직접 선택하십시오). `identity` 중 `identity`을 사용하여 할당량이 차지 않도록 합니다.

다음 세 가지 조건을 동시에 충족하는 경우 특별한 주의를 기울여야 합니다.

1.  `NetworkManager`은 `wpa_supplicant` 백엔드를 사용합니다.
1.  `openssl` 버전 3.0.0 이상 사용
1.  사용된 배포판에는 [修复 tls 1.0/1.1 连接的 patch](https://launchpad.net/ubuntu/+source/wpa/2:2.10-6ubuntu2)로 표시된 `wpa_supplicant`이 없습니다(현재 Ubuntu에는 패치가 있는 것으로 확인되었으나 NixOS에는 패치가 없습니다).

그러면 TLS 1.0 연결이 비활성화되어 `NetworkManager`이(가) `Tsinghua-Secure`에 연결하지 못할 수도 있습니다. 이 경우 두 가지 해결 방법이 있으며 둘 중 하나를 해결할 수 있습니다.

1.  NetworkManager를 `1.41.5-dev` 이상으로 업그레이드하세요. 정확하게 말하면 [这个 commit](https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/98dd4180ec163af63fe1e0fda00158ac7f0047df)이 포함되어 있는지 확인하세요. 위 구성 파일의 `[802-1x]` 섹션에 `phase1-auth-flags=32`(`NetworkManager`의 `tls-1-0-enable`) 줄을 추가합니다. 이 옵션은 10진수 `32`로 변환된 `0x20`에 해당합니다. 이 변환 관계는 현재 문서에 기록되지 않으므로 숫자 32가 항상 유효하다는 보장은 없습니다. 보다 보장된 방법은 `nmcli`을 사용하여 `802-1x.phase1-auth-flags`을 `tls-1-0-enable`로 수동으로 설정하는 것입니다.
1.  위에서 언급한 패치를 `wpa_supplicant`에 적용하세요.

#### wpa_신청자

`wpa_supplicant`을(를) 사용하여 해당 Wi-Fi 연결을 완료할 수도 있습니다. `wpa_supplicant`을 설치하고 `/etc/wpa_supplicant/wpa_supplicant-nl80211-XXXX.conf`를 편집합니다. 여기서 `XXXX`은 로컬 네트워크 카드의 이름입니다. 다음 구성을 입력합니다.

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

그 중 `username`과 `password`은 본인 계정의 해당 정보입니다. 그런 다음 입력

```
$ systemctl enable --now wpa_supplicant-nl80211@XXXX.service
```

연결할 준비가 되었습니다.

참고: 이 구성은 [orv](http://hep.tsinghua.edu.cn/~orv)에 의해 제공되었습니다.

#### iwd

Tsinghua-Secure의 인증서 문제(dhparams의 p 길이는 1024에 불과하며 이는 [Linux 内核的 1536 长度需求](https://elixir.bootlin.com/linux/v6.0/source/crypto/dh.c#L52)을 준수하지 않음)와 iwd가 커널의 암호화 도구에 의존하므로 iwd의 기본 사용으로 연결할 수 없습니다.

[NickCao](https://github.com/NickCao)은 이 목적을 위해 [dhack 内核模块](https://github.com/NickCao/dhack) 및 ell 도구 패치(아래)를 제공합니다. 전자는 해당 기호를 하이재킹하여 패치를 구현하고, 후자는 nix가 소프트웨어 패키지를 빌드할 때 소스 코드의 매개변수를 직접 대체합니다. 사용자는 비유를 통해 자신만의 커널과 도구를 구축할 수 있습니다.

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

그 외에 구성은 다음과 같습니다

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

### Tsinghua-Secure 교내 로그인 방식

Tsinghua-Secure에 연결한 후 획득한 IPv4 주소는 허용된 발신 테이블에 자동으로 들어가며, 예상치 못한 상황에서 기존 발신 장치를 점유할 수 있음을 확인했습니다.

테스트 결과, 로그인 시 사용한 사용자 이름이 "username@tsinghua"(예: lh14@tsinghua)인 경우 로그인 동작은 "교내 로그인 전용"과 동일한 것으로 확인되었습니다. 이 경우 v4에는 액세스 권한만 있고 v6에는 액세스 및 종료 권한이 있습니다.

이 방법을 사용한 인증 후 작성자의 테스트를 통해 "net.tsinghua.edu.cn"을 통해 인증할 수 있지만 유선 네트워크에서는 동작이 다릅니다.

## 캠퍼스 네트워크 특성에 대한 논의

### 2계층 격리/이웃 검색 격리

캠퍼스 네트워크의 주요 기능은 레이어 2 격리/이웃 검색 격리입니다. v4의 경우 전자입니다. v6의 경우 후자입니다. 이 메커니즘은 보안을 위해 설계되었지만 많은 개발자/사용자에게는 불편합니다.

이 기능은 기본적으로 브로드캐스트 도메인을 코어 스위치로 나누어 하나의 클라이언트와 게이트웨이만 동일한 브로드캐스트 도메인에 있도록 합니다.

#### IPv4

59.66.130.xx/24와 같은 IP가 할당된 경우 59.66.130.yy/24에 연결하려고 하면 연결이 되지 않는 경우가 있습니다. 이 두 개는 /24, 즉 두 번째 레이어에 있습니다. 이 경우 두 시스템은 ARP를 통해 서로를 발견하지만 학교의 일부 메커니즘에서는 ARP가 작동하지 않습니다.

이 경우 두 시스템 모두에 다음 경로를 추가해야 합니다.

```bash
ip r a 59.66.130.0/24 via 59.66.130.1
ip r a 59.66.130.1 dev eth0
```

실제 상황에 따라 해당 매개변수를 수정해야 합니다.

#### IPv6

Bauhinia의 IPv6는 주소가 /128이기 때문에 이러한 문제가 없습니다.

Tsinghua-Secure에 속하면 SLAAC를 통해 주소를 할당합니다. 즉, 모든 사람의 주소는 동일한 /64에 있습니다. 우리가 서로 소통하고 싶다면 NDP를 통해 그들을 발견해야 합니다. 캠퍼스 네트워크의 일부 메커니즘으로 인해 NDP가 성공하지 못할 수 있습니다.

이 경우 두 시스템 모두에 다음 경로를 추가해야 합니다.

```bash
ip r a 2402:f000:2:b801::/64 via fe80::xxxx dev wlan0
```
실제 상황에 따라 매개변수를 확인해야 합니다. 첫 번째는 /64 접두사인데, 획득한 주소를 참조하거나 RA를 참조하여 작성할 수 있습니다. 두 번째는 게이트웨이의 LL 주소로 기본 경로에 표시되는 주소와 동일합니다. 세 번째는 무선 네트워크 카드입니다.

### 낮은 포트 차단

이전 "사용 소개" 문서에 따르면 IPv4는 포트 0~1024, 8000~8100, 3389, 9100을 차단합니다. 또한 잘 알려진 이유로 인해 포트 1080, 4781, 7890도 차단됩니다.

2022년 가을부터 IPv6는 낮은 포트 부분을 차단합니다.

### 동적 IP

유동 IP의 경우 DDNS를 사용하여 해결할 수 있습니다. DNSPod, dns.he.net 및 cloudflare와 같은 주요 공급자가 이 서비스를 제공합니다.

dns.he.net을 예로 들어 먼저 A/AAAA 레코드를 추가하고 DDNS를 사용하도록 선택하세요. 생성 후 T로 표시된 업데이트 토큰을 생성합니다. 다음 스크립트를 작성합니다.

```
#!/bin/sh
curl -4 "https://domain.example.com:T@dyn.dns.he.net/nic/update?hostname=domain.example.com"
```
토큰은 T입니다. 필요에 따라 나머지 매개변수를 수정합니다.

그리고 cron을 사용하여 주기적으로(예: 5분마다) 스크립트를 실행하세요. 자세한 설명은 https://crontab.guru/ 명령을 참조하세요.

#### IPv6 고정 접미사 또는 짧은 IPv6 주소

우리는 SLAAC(Tsinghua-Secure에서 일반적) 하에서 IPv6 주소의 마지막 64비트가 클라이언트에 의해 결정될 수 있다는 것을 알고 있습니다. 이때 정적 접미사 또는 짧은 접미사를 구성할 수 있습니다. 기계가 한 위치에만 있는 경우 접두사는 거의 고정된 것으로 간주될 수 있습니다(확인 필요).

(Tucao: 토큰은 표준에서 거의 언급되지 않는 도구 세트이고 문서도 거의 없으며(IPv6에 대한 문서가 거의 없음) 여전히 매우 틈새 시장에 있는 것입니다. 결국 정적 접미사가 필요한 사람은 누구입니까? 동일한 서브넷에 있는 머신 간에 통신하기 위해 정적 접미사를 사용하는 대신(예, 접미사만 있는 라우팅 항목이 없으므로 네트워크의 다른 머신에 항상 접두사를 추가해야 합니다) 정적 개인을 구성하는 것이 좋습니다 주소)

일반적으로 우리에게 할당된 IPv6는 EUI64 또는 개인 정보 보호 확장이 사용되기 때문에 더 복잡합니다. EUI64의 경우 주소에서 `ff:fe` 필드를 찾을 수 있습니다.

iproute2 또는 기존 패키지를 통해 정적 접미사를 구성할 수 있습니다. 후자의 사용법은 Google에 문의하세요. 전자의 방법은 여기에 나와 있습니다.

```bash
ip token set ::114:514:1919:810/64 dev wlan0
```

**이 명령을 실행하기 전에** 네트워크 카드의 `forwarding`을 끄고(**구성 중**, 전달은 구성 후에 켜질 수 있음) `accept_ra` 및 `autoconf`을 열고 다른 dhcp 클라이언트의 v6 기능을 꺼야 한다는 점에 유의해야 합니다.

(Tucao: dhcpcd는 dhcp 클라이언트이지만 SLAAC도 차지하므로 매우 짜증납니다. 전통에 따르면 `accept_ra` 및 `autoconf`만 열면 Linux 커널이 자동으로 v6 주소를 구성합니다. `forwarding=1`을 사용하는 경우 다음을 사용해야 합니다. `accept_ra=2`)

```bash
sysctl net/ipv6/conf/wlan0/accept_ra=1
sysctl net/ipv6/conf/wlan0/autoconf=1
sysctl net/ipv6/conf/wlan0/forwarding=0
```

필요에 따라 위 명령의 일부 매개변수를 바꾸십시오. 위 명령을 시작 스크립트에 넣어 자동으로 토큰을 구성할 수 있습니다.

#### 특정 IPv4 또는 IPv6 주소를 얻으십시오.

DHCP 요청의 특정 주소에 대한 요청을 허용합니다(v4와 v6 용어는 다르며 엄격하게 명시되지 않음).

dhcpcd 구성

```dhcpcd.conf
interface enp3s0
request 59.66.190.254
ia_na 64:1a:ff:ff/2402:f000:4:3:888:1926:8:17
```

구성 중 일부 정보가 편집되었습니다. 구성은 매뉴얼 페이지 및 실제 네트워크 환경을 참조하십시오.

아래에는 이 구성이 적용되는 프로세스를 탐색하기 위한 몇 가지 로그가 첨부되어 있습니다. 저자는 이 구성이 이전 임대가 만료되거나 이전 주소가 선점된 후에만 사용할 수 있다고 믿습니다.

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

### 부서 네트워크용 IPv6(레이어 3 액세스)

일부 학과 네트워크는 3계층 접속이 가능한 캠퍼스 네트워크이며, 네트워크에 SLAAC가 구성되어 있습니다.

일부 시스템(예: Windows의 기본 설정 및 일부 Linux 기본 설정)이 개인정보 보호 확장으로 구성된 후에 해당 IPv6 주소는 SLAAC 환경에서 계속 변경됩니다. 학교의 입학은 IPv6 주소를 기반으로 하기 때문에 auth6을 사용하여 일정 기간 동안 IPv6에 액세스한 후 액세스가 손실되고 auth6에 다시 로그인해야 하는 구체적인 징후가 있습니다.

한 가지 방법은 IPv6 개인 임시 주소를 끄는 것이고(관련 정보는 Google에서 확인할 수 있음), 다른 방법은 위에서 언급한 auth-thu의 goauthing6.service와 같은 자동 승인 클라이언트를 사용하는 것입니다.

### 비RFC 호환 DHCPv6

> 학교의 DHCPv6 서버는 특정 DUID를 인식하지 못하며 그러한 DHCP 요청에 응답하지 않습니다. 학교에서 문제를 보고하고 제조업체에 문제를 해결하도록 요청한 후에도 문제는 여전히 존재했습니다.
>
> 관련 소스에 따르면 DUID Type 1, 즉 DUID-LLT만 인식됩니다. dhcpcd의 해당 구성 방법은 다음과 같습니다.
>
> 먼저 `duid`을 `/etc/dhcpcd.conf`에서 열고 `clientid`이 열려 있지 않은지 확인하세요. 그런 다음 다음 파일을 확인합니다.
>
>````
> $ 고양이 /var/lib/dhcpcd/duid
> 00:01:00:01:26:53:6d:9d:ff:ff:ff:ff:ff:ff
>````
>
> `00:01`으로 시작하면 DUID-LLT를 나타내며, 그렇지 않으면(또는 파일이 존재하지 않는 경우) 위 형식으로 변경해야 합니다. 동시에 마지막 `ff:ff:ff:ff:ff:ff`이 해당 네트워크 카드의 MAC 주소인지 확인해야 합니다. 그렇지 않은 경우 해당 주소로 변경해야 합니다.
>
> **업데이트** 테스트 결과 학교의 DHCPv6이 어떻게 작동하는지 알 수 없는 것으로 나타났습니다. 그것이 작동하는 방식은 완전히 형이상학적입니다. 일부 시도는 익명화가 켜져 있으면 사용할 수 있지만 일부 시도는 익명화가 켜져 있어도 실패합니다.
>
> 일부 경험은 https://pwe.cat/zijing-dhcpv6/을 참조하세요.

최근 시도에 따르면 최신 버전의 `systemd-networkd`을 사용하면 주소를 안정적으로 얻을 수 있는 것으로 나타났습니다.

### 30분 동안 트래픽이 없으면 액세스할 수 없게 됩니다.

앞서 언급한 "인터넷 액세스 액세스 지침"에 따르면 컴퓨터가 오랫동안(현재 30분) 네트워크를 사용하지 않으면 인증 시스템이 네트워크 연결을 종료합니다. <del>필요한 경우 서버는 10분마다 한 번씩 ping.tsinghua.edu.cn을 ping할 수 있습니다. </del>(만료됨)

### 정확한 출구를 잃은 후 정확하게 출구를 나갈 수 없습니다.

장기간 운영 중인 일부 기기에서는 캠퍼스 외부 네트워크에 연결되지 않을 수 있습니다. 이런 경우 많은 학생들이 userreg나 명령줄에서 **정확한 내보내기**를 시도하지만 정확한 내보내기에 실패한다는 사실을 알게 됩니다. **사용자 등록에서는 해당 머신이 정확한 내보내기 목록에 표시되더라도 해당 머신에서는 캠퍼스 외부 네트워크에 접속할 수 없습니다**. 우리는 이것이 캠퍼스 네트워크에 있는 일부 장치의 상태 동기화에 문제가 있다고 생각합니다.

이 문제에 대한 한 가지 가능한 해결책은 먼저 로그아웃한 다음 들어가고 종료하는 것입니다. 이렇게 하면 학교의 일부 컴퓨터 상태가 새로 고쳐져 성공적으로 종료될 수 있습니다. 알아채다! 로그아웃은 매우 위험한 작업입니다! SSH 연결이 끊어지고 컴퓨터와의 연결이 영구적으로 끊어질 수 있습니다! 해당 동작의 의미를 충분히 이해하시고, 로그아웃 후 접근권한 복구 방법을 숙지하신 후 동작해주세요!

### 입학 후 퇴장 불가 (교내 로그인 후만 가능)

위에서 Tsinghua-Secure 캠퍼스 내 로그인 방법을 언급했습니다. 명령줄(관련 매개변수를 확인하세요)과 웹페이지(액세스 인터페이스의 캠퍼스 내 전용 확인란)에도 해당 캠퍼스 내 로그인 솔루션이 있습니다. 그러나 일부 학생들은 캠퍼스에서만 로그인한 후 net.tsinghua.edu.cn을 통한 로그인이 실패하고 userreg 로그인이 실패하는 것을 관찰했습니다. 위의 문제와 마찬가지로 이 역시 특정 기기의 상태에 따른 문제일 것이며, 현재로서는 해결 방법이 없습니다.

### 허용되지 않으면 다른 컴퓨터에서 ping을 수행할 수 있지만 ssh를 수행할 수는 없습니다.

SSH를 사용할 수 없는지 여부는 사전 정책에 따라 결정됩니다(이 장의 캠퍼스 네트워크 기본 섹션의 "칭화대학교 캠퍼스 네트워크 유선 LAN 사용자 액세스 시스템 지침(Q&A)" 참조).

핑 가능 여부도 사전 정책에 따라 결정되지만 이는 문서화되어 있지 않습니다. 즉, ICMP 응답 패킷은 허용되지 않을 때 허용됩니다.

## 칭화 클라우드 디스크

터미널 클라이언트에는 독립적인 비밀번호가 필요하므로 터미널 클라이언트 대신 [seafile.com/download](https://seafile.com/download)에서 Linux 클라이언트를 사용하는 것이 좋습니다. 해당 비밀번호는 INFO 비밀번호와 다르며, 알 수 없으므로 터미널 클라이언트를 통해 로그인할 수 없습니다.

수동 소프트웨어 설치는 권장되지 않으므로 패키지 관리자를 이용하여 해당 소프트웨어를 다운로드하시기 바랍니다. Arch Linux 사용자의 경우 Linux 클라이언트는 다음과 같습니다.

```bash
pacman -S seafile-client
```

`pacman -S seafile` 대신 이 패키지는 터미널 클라이언트입니다. 다른 배포판의 경우 해당 패키지를 직접 찾아보세요.

### 터미널 클라이언트 사용

터미널 클라이언트는 버전 8.0.4 이후 동기화를 위한 토큰 사용을 지원합니다. [install_linux_client](https://help.seafile.com/syncing_client/install_linux_client/)에서 대부분의 릴리스에 대한 AMD64 아키텍처 소스를 찾을 수 있습니다. 사용 중인 패키지 관리자의 `seafile` 또는 `seafile-cli` 버전이 `8.0.4`보다 낮은 경우에는 설치 후 나중에 일부 파일을 교체하는 방법을 참고하거나 최신 버전을 수동으로 직접 컴파일할 수 있습니다.

#### 토큰 받기

브라우저에서 Tsinghua Cloud Disk에 로그인하세요. 쿠키의 `seahub_auth`은 `用户名（学号@tsinghua.edu.cn）@Token` 패턴이어야 하며 마지막 문단이 토큰입니다. 각 계정의 토큰은 고유하며 만료되지 않습니다.

`seaf-cli`이 정상적으로 실행되면 명령줄을 사용하여 동기화 작업을 수행할 수 있습니다.

```
seaf-cli init -d ~
seaf-cli start
seaf-cli sync -l <library-id> -s https://cloud.tsinghua.edu.cn -d <place-directory> -T <token>
seaf-cli desync -d <existing-folder>
```

#### 토큰 로그인을 구현하기 위해 일부 파일을 교체하십시오.

`seaf-cli`은 기본적으로 `pysearpc`을 통해 `seaf-daemon`과 통신하므로 대부분 배포판의 기본 소스에 있는 `seafile`의 하위 버전은 `seaf-cli`만 교체하면 제대로 작동합니다. 다음은 터미널 클라이언트를 설치한 후 `seaf-cli`을 대체하여 토큰 로그인을 구현하는 간단한 방법입니다.

```
git clone https://github.com/haiwen/seafile
cd seafile
cp app/seaf-cli /usr/bin/seaf-cli
chmod +x /usr/bin/seaf-cli
cp -r python/seafile $(python3 -m site --user-site)
```

#### 터미널 클라이언트 컴파일

구체적인 컴파일 과정은 [build_seafile](https://manual.seafile.com/build_seafile/linux/)을 참조하세요. 단, 몇 가지 참고할 사항이 있습니다.

- 각 웨어하우스에서 최신 소스 코드 또는 최신 릴리스를 다운로드하고 컴파일합니다.
- 문서에서 `ccnet` 부분을 무시하면 웨어하우스가 사라지고 관련 종속성이 없습니다.
- make가 실패할 확률이 있습니다. 몇 번 더 시도해 볼 수 있습니다.
- 설치가 완료된 후 `seaf-cli`에서 오류(예: `No module named 'seafile'`)를 보고하는 경우 이전 섹션을 참조하여 `seafile` 패키지를 수동으로 복사할 수 있습니다.

### Chrome에서 다운로드한 파일이 위험하다고 경고합니다.

이 현상은 Qiaoqiu 학생들의 이상한 작업으로 인해 발생할 수 있으며, 이로 인해 Chrome에서 Tsinghua Cloud Disk 도메인 이름을 표시한 다음 모든 파일 다운로드가 위험할 수 있음을 알리고 차단됩니다.

이 알림을 무시하세요. 물론, 정말 환상적인 파일을 다운로드하셨다면 직접 확인해 보시기 바랍니다.

## ISATAP(중지됨)

현재 서비스가 중지되었습니다.
  
[ipv6.tsinghua.edu.cn](https://ipv6.tsinghua.edu.cn)을 참조하세요. 참고용으로 [AUR 包 thu-isatap](https://aur.archlinux.org/packages/thu-isatap)도 있습니다.

현재는 캠퍼스 내 공용 IPv4 사용자만 이 서비스를 사용할 수 있으며 캠퍼스 외부 사용자는 사용할 수 없습니다. `166.111.21.1` 이 IP는 핑 패킷에 응답하지 않습니다.

### IPv6 연결 PT 받기

집에서 SSLVPN을 사용하여 캠퍼스 공용 IP를 얻을 수 있으므로 ISATAP를 사용하여 Tsinghua IPv6 주소를 획득하여 여기서 자세히 설명하지 않는 PT 기능을 구현할 수 있습니다.

## 승리 10 활성화

관련 cmd 지침을 얻으려면 Linux에서 이 명령을 사용하십시오.

```
$ dig -t TXT win10.harrychen.xyz +short
```

또는 Windows에서 사용

```
cmd> nslookup -q=TXT win10.harrychen.xyz
```

그런 다음 sslvpn에 연결된 동안 스크립트를 실행하여 활성화합니다.

## 정품 운영 체제 및 소프트웨어 다운로드

### ITS

https://its.tsinghua.edu.cn을 방문하여 로그인하면 Win10, 바이러스 백신 소프트웨어, WPS, MS Visio, MS Visual Studio, MATLAB 등 정품 소프트웨어의 다운로드 방법을 얻을 수 있습니다.

### 참치

https://mirrors.tuna.tsinghua.edu.cn을 방문하여 클릭하여 다운로드 링크를 받으세요.

## 캠퍼스 내 IP 세그먼트

학교에는 6/16이 있습니다. https://bgp.he.net/AS45576을 참조하세요.

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

v6에서는 일반적으로 `2402:f000::/32`을 사용하며, 일부 지역에서는 `2001:250:200::/48`(인터넷연구소)을 사용합니다. `2001:da8:200::/48` 단락이 있지만 사용되지 않습니다.
