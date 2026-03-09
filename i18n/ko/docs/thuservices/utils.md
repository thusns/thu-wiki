---
id: thuservices/utils
slug: /thuservices/utils

---
# 일부 스크립트 및 도구

## 캠퍼스 네트워크 인증 도구 요약

바퀴를 만드는 것이 아니라 바퀴를 사용한다는 정신으로 칭화족 세대는 캠퍼스 네트워크와 지혜와 용기를 가지고 싸워 수많은 인증 도구를 개발해 왔습니다. 모든 사람이 자신의 선호도에 따라 선택할 수 있도록 가능한 한 많이 여기에 나열합니다.

| 프로젝트 링크 | 지원되는 플랫폼 | 구현 언어 | 현재 사용 가능(유지) | 특징 |
| --- | --- | --- | --- | --- |
| [Tunet-2018 (official)](https://its.tsinghua.edu.cn/xywl/xywsyzn/yxw_hkhd_/khdxz.htm) | Windows-GUI, Linux-CLI | 알 수 없음 | 가능 | 조사되지 않음 |
| [GoAuthing](https://github.com/z4yx/GoAuthing/) | Linux-CLI(x86\_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI(Intel, Apple) | 이동 | 가능 | 전체 플랫폼 및 전체 아키텍처, 액세스 및 액세스, v4 및 v6, systemd 서비스, TUNA 인증되지 않은 경우 인증 도구를 다운로드할 수 있는 [镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/) 제공 및 인증 관련 라이브러리 제공 |
| [tunet-python](https://github.com/yuantailing/tunet-python) | Python, CLI를 지원하는 플랫폼 | 파이썬 | 가능 | v4 및 v6, 입장 및 퇴장, 트래픽 및 입장 상태 모니터링 |
| [tunet-c](https://github.com/robertying/tunet-c) | 오픈WRT, 리눅스, macOS; CLI | 다 | 가능 | 인증 관련 라이브러리 제공, 바이너리 파일 크기가 작음 |
| [tunet-rust](https://github.com/Berrysoft/tunet-rust) | 윈도우, 맥 OS, 리눅스, 안드로이드, iOS | 러스트, 다트 | 가능 | 트래픽 및 균형 모니터링, 입장 및 퇴장, v4 및 v6; 인증 관련 라이브러리를 제공합니다. 데스크탑에서 CLI, CUI, GUI, Windows 서비스, 시스템 서비스, 실행 서비스를 제공합니다. 모바일 단말기에 GUI 제공 |
| [TsinghuaTunet](https://github.com/WhymustIhaveaname/TsinghuaTunet) | Python, CLI를 지원하는 플랫폼 | 파이썬 | 특정 서브넷에서 사용 가능 | 조사되지 않음 |
| [auth-tsinghua](https://github.com/jiegec/auth-tsinghua) | node.js 플랫폼, CLI에서 지원 | 자바스크립트 | 더 이상 유지되지 않습니다 | GoAuthing으로 리디렉션됨 |
| [TsinghuaNet](https://github.com/Berrysoft/TsinghuaNet) | 윈도우, 맥 OS, 리눅스, UWP, 안드로이드, iOS | C# | 더 이상 유지되지 않습니다 | tunet-rust로 리디렉션됨 |
| [tunet-cli](https://github.com/syimyuzya/tunet-cli) | Python, CLI를 지원하는 플랫폼 | 파이썬 | 더 이상 유지되지 않으며 마지막 커밋은 2017년 | 조사되지 않음 |
| [Tsinghua-Online](https://github.com/xxr3376/Tsinghua-Online) | [Chrome 商店](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo)의 브라우저 플러그인 | 자바스크립트 | 더 이상 유지되지 않으며 마지막 커밋은 2013년 | 브라우저 플러그인 |
| [THUNetwork](https://github.com/zhaofeng-shu33/THUNetwork) | Python 플랫폼, CLI 지원 | 파이썬 | 더 이상 유지되지 않습니다 | 암호는 비교적 안전하지 않은 일반 텍스트로 명령줄에 전달됩니다. |

## INFO/온라인학교 앱/플러그인

바퀴를 만드는 것이 아니라 바퀴를 사용한다는 정신으로 칭화족 세대는 INFO와 온라인 학교를 통해 재치와 용기로 싸워 왔으며 수많은 사용하기 쉬운 도구를 개발해 왔습니다. 우리는 모든 사람이 자신의 선호도에 따라 선택할 수 있도록 여기에 나열하기 위해 최선을 다합니다.

| 프로젝트 링크 | 지원되는 플랫폼 | 구현 언어 | 현재 사용 가능(유지) | 특징 |
| --- | --- | --- | --- | --- |
| [INFO](http://info.tsinghua.edu.cn/) | 웹페이지 | 조사되지 않음 | 가능 | 공식 웹페이지 |
| [LEARN](http://learn.tsinghua.edu.cn/) | 웹페이지 | 조사되지 않음 | 가능 | 공식 웹페이지 |
| [Learn-Project](https://github.com/xxr3376/Learn-Project) | 브라우저 플러그인 | 타이프스크립트 | 가능 | Google, Firefox 및 Edge 플러그인 스토어, 최신 프런트 엔드에서 타임라인 및 카테고리별로 정렬된 온라인 학교 프로젝트 |
| [LearnX](https://github.com/robertying/learnX) | iOS, 아이패드 OS, macOS, 안드로이드 | 반응 | 가능 | 프로젝트 오픈소스 라이선스, 나머지 내용은 프로젝트 소개 참조 |
| [THUInfo](https://github.com/UNIDY2002/THUInfo) | 모바일 앱 | 타이프스크립트 | 가능 | Apple App Store 배포로 가정, 학생부(교실), 도서관 프로젝트 등 나무구멍 지원 |
| 칭화대 | 모바일 앱 | 알 수 없음 | 알 수 없음 | Apple App Store에서 배포되며 나머지는 조사되지 않았습니다. 모 연구실의 캠퍼스 축하를 위한 작품입니다 |
| [learn2018-autodown](https://github.com/Trinkle23897/learn2018-autodown) | Python을 지원하는 플랫폼 | 파이썬 | 가능 | 진정한 전체 정보/파일 다운로드(자세한 내용은 프로젝트 소개 참조) |
| [THUCourseHelper](https://github.com/Starrah/THUCourseHelper) | 안드로이드 | 코틀린 | 알 수 없음 | 강좌일정 |
| [thu-learn-downloader](https://github.com/liblaf/thu-learn-downloader) | 리눅스, 맥, 윈도우 | 파이썬 | 가능 | 아름다운 인터페이스를 갖춘 온라인 강의실 강좌 파일 및 숙제 다운로드(자세한 내용은 프로젝트 문서 참조) |

## 강좌 선택 충돌 플래그

수업을 서둘러 수강하려고 할 때 여전히 높은 기대감을 가지고 과목 선택을 제출하고 있지만 시간 충돌이 있어 과목 선택을 놓쳤습니까?
선택한 강좌 시간을 기억하고 강좌 시작 목록을 확인하는 과정에서 아직도 느린 느낌이 드시나요?
이 스크립트가 도움이 됩니다!

이 스크립트는 귀하가 선택한 강좌를 감지하고 후보 강좌에서 시간이 충돌하는 강좌를 빨간색으로 자동 표시하여 찾아볼 수 있도록 합니다.
수백만 코스의 속도는 기적과 같습니다. 빨간색으로 표시된 시간에 마우스를 올리면 해당 시간과 충돌하는 모든 코스가 표시됩니다.

반학기 수업은 아직 완전히 지원되지 않으며, 이는 잘못된 시간 충돌이 발생할 수 있음을 의미합니다.
동시에, 개설정보 및 강좌선택 조회 인터페이스에서는 동작하지 않으며, 강좌선택 운영 인터페이스에서만 동작합니다.

이 스크립트는 aux/TsinghuaCourseConflectMarker.user.js에 있으며 Oil Monkey를 사용하여 설치해야 합니다.

또는 [这里](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker)을 방문하여 액세스할 수 있습니다.
한 번의 클릭으로 스크립트를 받아보세요.

이제 WebVPN 지원이 추가되었습니다.

기술적인 안내를 해주신 [CircuitCoder](https://github.com/CircuitCoder)에게 감사드립니다.
제안과 DEBUG에 대해 [SharzyL](https://github.com/SharzyL)에게 감사드립니다.

## 과목 선택을 위한 남은 과목 내용 표시

수업을 듣기 위해 어떤 종류의 자원봉사자를 사용해야 할지 모르시나요?
이 스크립트가 도움이 됩니다!

이 스크립트는 지원자 수를 색칠합니다. 마지막 녹색 색상은 수업을 듣기에 가장 적합한 후보입니다!

스크립트는 아직 개발 중이며 대기열 지원은 곧 제공될 예정입니다!

스크립트를 받으려면 [这里](https://greasyfork.org/en/scripts/456440-colorful-course)을 방문하세요.

## INFO 온라인 학교 텔레그램 메시지 푸시

[thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) 및
[thu-info-forwarder](https://github.com/Konano/thu-info-forwarder).

THU INFO CHANNEL은 이미 텔레그램에 존재합니다. 비공개 채널이므로 [邮件](mailto:i@zenithal.me)을(를) 전달해야 합니다.
초대링크를 받으세요.

## 학교 전체 세탁기 현황

### 학교 전체 세탁기 현황 - 세탁기 조회 도구(인터페이스 포함)

https://washer.sdevs.top/

인터페이스가 간단하고 사용하기 쉽고, 데이터가 정리되어 있고, 문의한 아파트 건물을 기억할 수 있으며, 피드백 채널이 제공됩니다.

### 청화대학교 세탁실 이용 가능 여부 문의

https://washer.voltair.top/

### 학교 전체 세탁기 현황 - 공식 애플릿

세탁기 제조사의 애플릿에서도 세탁기의 상태를 확인할 수 있습니다.

입구는 홈페이지 하단의 '주변 세탁기' 버튼입니다.

![“自助智能校园”小程序码](image/washer_official.jpg)

### 학교 전체 세탁기 상태 - API 인터페이스(텍스트 버전, 더 이상 사용되지 않음)

아직도 세탁기 사느라 열심히 일하고 계시나요? 아직도 세탁기가 없다는 걸 발견하고 이리저리 뛰어다니느라 고생하고 계시나요? 이 서비스
집을 떠나지 않고도 한 번의 클릭으로 세탁기의 상태를 감지하고 학교 전체의 세탁기 동향을 알 수 있도록 도와주세요!

소스 코드는 저장소의 aux 디렉토리에 있습니다. 현재 [https://washer.thu.services](https://washer.thu.services)의 cf 작업자에 배포되어 있습니다.

검색을 구현하려면 매개변수를 추가해야 합니다. 현재는 "s", "j", "p"라는 세 가지 매개변수를 허용합니다. "s"는 검색어입니다
아파트 건물의 경우 일반적으로 허용되는 문자열은 "Building x, Bauhinia" 또는 "Building x, South District"입니다. 예를 들어

```
https://washer.thu.services/?s=紫荆1号楼
```

"Zijing Building 1"에 있는 세탁기의 작동 상태를 반환합니다. 기본적으로 이 매개변수는 다음을 반환합니다.
'쯔징2호관' 세탁기 가동상황입니다.

"j" 매개변수의 경우 "j"가 존재하는지 여부만 확인합니다. 존재하는 경우 원본 json 데이터가 반환됩니다.
이 항목은 개발자용입니다. "s" 및 "j" 매개변수는 동시에 사용할 수 있습니다.

"p" 매개변수의 경우 "p"가 존재하는지 여부만 확인합니다. 존재하는 경우 텍스트/일반 데이터가 반환됩니다.
"s" 및 "p" 매개변수는 동시에 사용할 수 있습니다. "j"와 "p"가 동시에 나타나면 "j"가 더 높은 우선순위를 갖습니다.

### 학교 전체 세탁기 상태 - iOS 바로가기(사용할 수 없음)

iOS 12 이상 사용자는 이 [链接](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0)을 통해 바로가기를 설치하여 유휴 세탁기를 빠르게 확인할 수 있습니다. 현재는 층수에 맞는 쿼리만 지원됩니다.

### 학교 전체 세탁기 현황 - 텔레그램 봇 에르하(사용 불가)

이 인터페이스 [Konano](https://github.com/Konano)을 기반으로 Erha라는 텔레그램 봇이 개발되었습니다.

프로젝트 주소는 [此](https://github.com/Konano/Tuna-Erha-Bot)입니다. 세탁기 상태 조회 기능 외에도 더 많은 기능이 있습니다.

봇은 [t.me/erhabot](https://t.me/erhabot)을 통해 액세스할 수 있습니다.

### 세탁 모니터링 및 알림 - WeChat 애플릿(사용할 수 없음)

![THU洗衣](image/washer.jpg)

동일한 API를 사용하여 세탁기에 주의를 기울인 후 세탁기가 유휴 상태일 때 WeChat 서비스 계정을 통해 알림이 전송됩니다.

[项目地址](https://github.com/zrt/thu-wash-notify)

## 정보 GPA 계산기

cksqs가 실패한 후 한 번의 클릭으로 GPA를 쿼리하는 것이 어렵습니까? 아니면 GPA를 얻으려면 10위안을 지출해야 합니까?
유효숫자 3개만 유지하는 이런 GPA는 [-0.005,0.005)의 반올림으로 인해 사람들에게 큰 불확실성을 느끼게 합니다.
GPA를 손으로 계산하는 학생들의 경우, 학년이 늘어나고 과목 수가 늘어날수록 수기 계산의 난이도가 높아집니다.
GPA는 한 번만 계산하면 되는데, 이는 매우 부담스럽습니다.

그래서 우리는 자동 GPA 계산 기능을 제안했습니다. 편의성, 사용 편의성 등 다양한 요소를 고려하여 평소와 같이
이 작은 기능을 구현하기 위해 사용자 스크립트를 도입했습니다.

이 스크립트는 "INFO-All Results" 인터페이스에 존재하는 결과만 읽습니다(시스템에 입력되었지만 게시되지 않은 결과는
계산에 포함되지 않은 cksqs 또는 유료 성적표를 통해 획득), 신규 및 기존 알고리즘을 사용하여 모든 GPA와 필수 GPA를 결합
그것을 계산하고 (직접 두 배로 출력) 알림 알림을 팝업하십시오.

이 스크립트는 `aux/Tsinghua GPA Calculator.user.js`에 있으며 Oil Monkey를 사용하여 설치해야 합니다.

또는 [这里](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator)을 통해
얻기 위해.

## 청화대학교 GPA 쿼리

소개는 이전 섹션을 참조하세요.

"INFO-전체성적" 페이지에서 각 학기별 평점과 필수 및 필수 성적 합계를 계산해 보세요. 스크립트 주소는 [此](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询)입니다.

## 비 교실 도우미

이 사용자 스크립트는 대형 화면 장치(PC, 태블릿)에서 Rain Classroom 학생들에게 더 나은 사용자 경험을 제공하도록 설계되었습니다.

프로젝트 주소는 [此](https://github.com/RainEggplant/rain-classroom-helper)입니다.

## 청화대학교 통합 플랫폼 비디오 자동 재생

스크립트는 [此](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay)에 있으며 [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn)에서 강좌 비디오를 자동으로 재생할 수 있습니다.

## Xuetang 온라인 비디오가 자동으로 재생됩니다.

백그라운드에서 MOOC를 공부할 때 멈췄는지 자주 확인하시나요? 스크립트가 자동으로 다음 레슨을 재생해 드립니다!

스크립트는 [此](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放)에 있습니다.

이 스크립트는 역사가 길고, 오랫동안 유지되지 않았으며, 일부 버그도 포함하고 있기 때문에 장기적인 가용성을 보장할 수 없습니다. 문제를 발견하거나 코드를 개선하는 경우 원저자 @RikaSugisawa에게 문의하세요.

## Xuetang 온라인 자막 다운로더

아직도 리뷰를 준비하면서 영상을 하나씩 넘기고 자막을 다운로드하고 계시나요? 이 스크립트가 도움이 됩니다!

Rabbit Hu 버전: 스크립트는 [此](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler)에 있고, 프로젝트 주소는 [此](https://github.com/Rabbit-Hu/xuetangx-caption-crawler)에 있습니다.

Roberts 홀더 버전: 프로젝트 주소는 [此](https://github.com/rcy17/MOOC_subtitle_spider)입니다.

Rynco Maekawa 버전: 프로젝트 주소는 [此](https://github.com/lynzrand/xuetangx_sub)입니다.

c7w 버전: 프로젝트 주소는 [此](https://github.com/c7w/TsinghuaMoocCaptionCrawler)입니다.

## Rain Classroom 코스웨어 다운로더

현재는 '장강비교실'에만 적용 가능하나, 수정 후 연지비교실에서도 사용이 가능합니다.

프로젝트 주소는 [此](https://github.com/ShevonKuan/yuektang_ppt2pdf)입니다.

## 청화 교육 참고서 크롤링

학교 도서관에서 [图书资源](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7)을(를) 많이 구입했습니다. 중국어 교재를 찾으려면 [清华大学教参服务平台](http://reserves.lib.tsinghua.edu.cn/) 및 [文泉学堂-清华大学出版社电子图书数据库](https://lib-tsinghua.wqxuetang.com/)을 먼저 사용하는 것이 좋습니다.

### 칭화대학교 교육 참고 서비스 플랫폼

칭화대학교 교육 참고 서비스 플랫폼은 저작권 범위 내에서 강의 교과서 및 교육 참고 자료의 스캔된 전자 버전을 제공합니다(온라인 검색). 플랫폼에서 사용할 수 없는 교육 자료가 필요한 경우 이메일이나 전화로 [相关部门](https://lib.tsinghua.edu.cn/info/1184/3617.htm)에 직접 문의하여 스캔할 수 있습니다.

다운로드에는 [reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader)을(를) 사용하는 것이 좋습니다.

다운로드 기능은 [thu-info-lib](https://github.com/thu-info-community/thu-info-lib)에서도 구현됩니다.

API 변경으로 인해 다음 두 항목을 사용할 수 없습니다.

원문 인용: 최근 전염병이 심해 교과서 구입이 어려워졌습니다. 모든 사람의 온라인 학습을 촉진하기 위해 저는 Tsinghua 교재를 크롤링하는 Python 스크립트를 작성했습니다.

프로젝트 주소는 [此](https://github.com/lflame/TsinghuaBookCrawler)입니다.

원문 인용 : 책 각 페이지의 원문 이미지를 자동으로 다운로드합니다.

프로젝트 주소는 [此](https://github.com/i207M/reserves-lib-tsinghua-downloader)입니다.

### 원취안 아카데미

Wenquan Xuetang은 Tsinghua University Press에서 도서를 검색하는 데 사용됩니다. 크롤링 방지는 엄격합니다. [这个](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88) 스크립트를 사용하여 다운로드할 수 있습니다.

## 강좌 위치 공유

현재 사용 가능: learnX 개발팀에서 관리하는 [courseX 课程信息共享计划](https://tsinghua.app/courses)

현재 다음 프로젝트의 유지 관리 및 운영이 중단되었습니다.

[https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/)에서 해당 프로젝트 주소는 [此](https://github.com/RikaKagurasaka/where-my-course-gone-backend)입니다.

## 등록 표시(열차 티켓용)

캠퍼스 밖에서도 관련 등록 표시를 쉽게 얻으려면 [此网站](https://tuixue.online/zcimage/)을(를) 참조하세요.

## 기숙사 전기요금 조회

헤드리스 Chrome을 통해 [实现](https://github.com/WhymustIhaveaname/TsinghuaElectric)이 있습니다.

또 다른 구현도 있습니다. aux 디렉토리의 `TsinghuaElectricityBillChecker.py`을 참조하세요. 사용자는 일부 내장된 매개변수를 수정해야 합니다.

또 다른 구현도 있습니다. aux 디렉토리의 `TsinghuaBills.py`을 참조하세요.

이러한 스크립트를 통해 데이터를 grafana에 입력하여 전기 요금 모니터링 및 경보를 실현할 수 있습니다.

## 침실 수도, 전기요금 조회

aux 디렉터리에서 `TsinghuaBills.py`을 참조하세요.

참고: 이 스크립트는 기숙사 수도요금 잔액(캠퍼스 카드 지갑 아님!)을 쿼리할 수 있으며 주로 W 빌딩 및 Shuangqing 아파트에 적용됩니다. 구체적인 적용 범위: Shuangqing 아파트, Bauhinia 학생 아파트 14호관, Bauhinia 학생 아파트 15호관, Bauhinia 학생 아파트 16호관, Bauhinia 학생 아파트 17호관, 17호관, 18호관.

이 스크립트는 데이터를 grafana에 입력하여 공공요금 청구서 모니터링 및 경보를 구현할 수 있습니다.

## 청화대학교 수업 벨소리

집에서 공부할 분위기도 없고 학교 공부방도 ​​그리워지시나요? 청화 벨소리 소프트웨어가 당신을 도와드립니다!

현재 macOS 버전인 [在此](https://github.com/LyricZhao/THU-Bell) 프로젝트가 있습니다.

## 교내 레스토랑 무작위 선정 - 위챗 미니 프로그램

식당이 너무 많아서 어디서 식사해야 할지 모르시나요? 도움이 될 난수 생성기!

[此](https://github.com/SuXY15/RandomCanteen)의 프로젝트

미니 프로그램 QR 코드

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## 교내 레스토랑을 무작위로 선택 - 텔레그램 봇

위와 동일합니다.

또한 텔레그램 봇은 온라인 밀크티 마시기, 온라인 카푸치노 마시기, 온라인 음료 생산 등의 인터랙티브 기능도 제공합니다.

프로젝트 주소는 [此](https://github.com/Lancern/thufood-tgbot)입니다.

BOT 주소는 https://t.me/thufood_bot입니다.

유사한 항목은 https://t.me/thufoodbot입니다.

## 칭화대학교 컴퓨터 과학 코스 가이드

[GitHub地址](https://github.com/PKUanonym/REKCARC-TSC-UHT) 및 [校内地址](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## 청화소프트웨어공학학원 코스 안내

[GitHub地址](https://github.com/SerCharles/THSS-CRACKER)

## 화청대학교 강좌안내 공유계획

학교 내 모든 학생을 대상으로 한 강좌 안내 공유 계획은 학습 자원의 정보 비대칭성을 제거하고 학습 자원 및 자료의 공개 공유를 촉진하는 것을 목표로 합니다. 프로젝트 [在此](https://closed.social/pastExam/). GitHub에 비해 공유 및 다운로드 작업은 기술에 익숙하지 않은 학생들에게 더 친숙합니다. 공유를 환영합니다!

![华清大学课程攻略共享计划](image/course_strategy.jpg)

## 캠퍼스 교육 평가 플랫폼

Colleguide: 학교, 교수, 강좌를 평가하는 플랫폼

https://www.colleguide.com/

## 컴퓨터공학과에 대한 사실

https://github.com/jiegec/dcst-facts

## NFSee 캠퍼스 카드

https://github.com/nfcim/nfsee

## 강좌정보 공유 계획

https://tsinghua.app/courses

## 칭화대학교 컴퓨터 전공 912 대학원 입학 시험 자료

https://github.com/Wsky51/THU-CS912-kaoyan

## 칭화대 점수 스크래처

https://github.com/summivox/thu-scratch

* Chrome 플러그인 또는 사용자 스크립트 설치
* 로그인 정보
* 결과를 볼 수 있는 곳이 차단되었습니다~
* 내 마음 속에는 "드키드키"가 느껴져

## 투홀의 추억

모든 콘텐츠는 부티크 동굴과 개인 컬렉션에서 나옵니다.

https://github.com/pb0316/thuhole_memories

## Thuhole 데이터베이스 백업

데이터를 세척한 후 개인 정보 보호와 관련되지 않은 의미 있는 트리 홀의 대부분은 이 GitHub 저장소에 백업됩니다.

https://github.com/thuhole/database_backup

## 전산학과 학생과학협회 기술 지도서

이 기술 지침 문서는 Tsinghua University의 컴퓨터 과학 학생회에서 관리합니다. 목표는 컴퓨터 과학 및 컴퓨터 과학 학생들이 특정 특정 기술을 빠르게 습득할 수 있도록 하는 것입니다. 강좌, 과학 연구, 인턴십에서 이러한 기술을 사용할 수 있는 방법을 제공함으로써 학생들이 관련 정보를 수집하는 데 드는 시간을 절약하고 새로운 기술을 배우는 능력을 향상시킵니다.

https://docs.net9.org/

## 청화대학교 대학원생 사회 실천 시스템 크롤러

https://thshijian.tsinghua.edu.cn(칭화대학교 대학원 사회 실천 시스템)에서 구조화된 데이터를 크롤링합니다. 자신의 책임하에 사용하십시오.

https://github.com/Harry-Chen/thshijian-crawler
