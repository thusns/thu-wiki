---

---
# Scripts and Tools

## Campus Network Authentication Tools Summary

In the spirit of "why use a wheel when you can build one," generations of Tsinghua students have battled wits with the campus network and developed countless authentication tools. We list as many as possible here for users to choose based on preference.

| Project Link                                                                          | Supported Platforms                                                                                                                  | Implementation Language | Currently Usable (Maintained?)            | Features                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tunet-2018 (official)](https://its.tsinghua.edu.cn/xywl/xywsyzn/yxw_hkhd_/khdxz.htm) | Windows-GUI, Linux-CLI                                                                                                               | Unknown                 | Usable                                    | Not investigated                                                                                                                                                                                                                                                                    |
| [GoAuthing](https://github.com/z4yx/GoAuthing/)                                       | Linux-CLI (x86_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI (Intel, Apple)                                                    | Go                      | Usable                                    | All platforms and architectures, admission and egress, v4 and v6, systemd service, TUNA provides [mirror](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/) allowing download of auth tools before authentication, provides authentication library |
| [tunet-python](https://github.com/yuantailing/tunet-python)                           | Platforms supporting Python, CLI                                                                                                     | Python                  | Usable                                    | v4 and v6, admission and egress, traffic and admission/egress status monitoring                                                                                                                                                                                                     |
| [tunet-c](https://github.com/robertying/tunet-c)                                      | OpenWRT, Linux, macOS; CLI                                                                                                           | C                       | Usable                                    | Provides authentication library, small binary size                                                                                                                                                                                                                                  |
| [tunet-rust](https://github.com/Berrysoft/tunet-rust)                                 | Windows, Mac OS, Linux, Android, iOS                                                                                                 | Rust, Dart              | Usable                                    | Traffic and balance monitoring, admission and egress, v4 and v6; provides authentication library; desktop: CLI, CUI, GUI, Windows service, systemd service, launchd service; mobile: GUI                                                                                            |
| [TsinghuaTunet](https://github.com/WhymustIhaveaname/TsinghuaTunet)                   | Platforms supporting Python, CLI                                                                                                     | Python                  | Usable for specific subnets               | Not investigated                                                                                                                                                                                                                                                                    |
| [auth-tsinghua](https://github.com/jiegec/auth-tsinghua)                              | Platforms supporting Node.js, CLI                                                                                                    | Javascript              | No longer maintained                      | Redirected to GoAuthing                                                                                                                                                                                                                                                             |
| [TsinghuaNet](https://github.com/Berrysoft/TsinghuaNet)                               | Windows, Mac OS, Linux, UWP, Android, iOS                                                                                            | C#                      | No longer maintained                      | Redirected to tunet-rust                                                                                                                                                                                                                                                            |
| [tunet-cli](https://github.com/syimyuzya/tunet-cli)                                   | Platforms supporting Python, CLI                                                                                                     | Python                  | No longer maintained, last commit in 2017 | Not investigated                                                                                                                                                                                                                                                                    |
| [Tsinghua-Online](https://github.com/xxr3376/Tsinghua-Online)                         | Browser extension, on [Chrome Web Store](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo) | Javascript              | No longer maintained, last commit in 2013 | Browser extension                                                                                                                                                                                                                                                                   |
| [THUNetwork](https://github.com/zhaofeng-shu33/THUNetwork)                            | Platforms supporting Python, CLI                                                                                                     | Python                  | No longer maintained                      | Password passed as plaintext in command line, less secure                                                                                                                                                                                                                           |

## INFO/Web Learning APP/Plugins

In the spirit of "why use a wheel when you can build one," generations of Tsinghua students have battled wits with INFO and Web Learning (网络学堂) and developed countless useful tools. We list as many as possible here for users to choose based on preference.

| Project Link                                                             | Supported Platforms         | Implementation Language | Currently Usable (Maintained?) | Features                                                                                                                       |
| ------------------------------------------------------------------------ | --------------------------- | ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| [INFO](http://info.tsinghua.edu.cn/)                                     | Web                         | Not investigated        | Usable                         | Official website                                                                                                               |
| [LEARN](http://learn.tsinghua.edu.cn/)                                   | Web                         | Not investigated        | Usable                         | Official website                                                                                                               |
| [Learn-Project](https://github.com/xxr3376/Learn-Project)                | Browser extension           | Typescript              | Usable                         | Arranges Web Learning items by timeline and category, available on Chrome, Firefox, and Edge extension stores, modern frontend |
| [LearnX](https://github.com/robertying/learnX)                           | iOS, iPadOS, macOS, Android | React                   | Usable                         | Open source license, see project description for details                                                                       |
| [THUInfo](https://github.com/UNIDY2002/THUInfo)                          | Mobile APP                  | Typescript              | Usable                         | Available on Apple App Store, includes Home, Student Affairs (classrooms), library projects, supports Tree Hole                |
| AtTsinghua                                                               | Mobile APP                  | Unknown                 | Unknown                        | Available on Apple App Store, not investigated further, a lab project for university anniversary                               |
| [learn2018-autodown](https://github.com/Trinkle23897/learn2018-autodown) | Platforms supporting Python | Python                  | Usable                         | Downloads truly all information/files (see project description for details)                                                    |
| [THUCourseHelper](https://github.com/Starrah/THUCourseHelper)            | Android                     | Kotlin                  | Unknown                        | Course schedule                                                                                                                |
| [thu-learn-downloader](https://github.com/liblaf/thu-learn-downloader)   | Linux, Mac, Windows         | Python                  | Usable                         | Beautiful UI for downloading Web Learning course files and assignments (see project documentation)                             |

## Course Conflict Marker

Are you tired of eagerly submitting course selections during registration, only to discover time conflicts and miss your chance?
Are you tired of memorizing your selected course times while cross-referencing the course list?
This script is here to help!

This script detects your already-selected courses and automatically highlights conflicting courses in the candidate list in red, allowing you to browse through millions of courses at lightning speed. When hovering over a highlighted time slot, all conflicting courses are displayed.

Note that half-semester courses are not fully supported yet, which may cause false time conflicts. Also, the script does not work on the course information and course query pages — it only works on the course registration operation page.

This script is in aux/TsinghuaCourseConflictMarker.user.js and requires Tampermonkey for installation.

Alternatively, you can get the script by visiting [here](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker).

WebVPN support has been added.

Thanks to [CircuitCoder](https://github.com/CircuitCoder) for technical guidance.
Thanks to [SharzyL](https://github.com/SharzyL) for suggestions and debugging.

## Remaining Course Capacity Marker

Not sure which priority to use for course registration?
This script is here to help!

This script color-codes the enrollment numbers — the last green one is the optimal registration priority!

The script is still under development; queue support is coming soon!

Get the script [here](https://greasyfork.org/en/scripts/456440-colorful-course).

## INFO Web Learning Telegram Push Notifications

See [thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) and
[thu-info-forwarder](https://github.com/Konano/thu-info-forwarder).

A THU INFO CHANNEL already exists on Telegram. Since it's a private channel, you need to obtain an invitation link via [email](mailto:i@zenithal.me).

## Campus-Wide Washing Machine Status

### Washing Machine Status - Query Tool (with UI)

https://washer.sdevs.top/

Clean and easy-to-use interface, organized data, remembers your queried apartment building, provides a feedback channel.

### Tsinghua University Laundry Room Availability Query

https://washer.voltair.top/

### Washing Machine Status - Official Mini Program

You can also check washing machine status in the washing machine manufacturer's mini program.

The entry point is the "Nearby Washing Machines" button at the bottom of the homepage.

!["Self-Service Smart Campus" Mini Program Code](pathname:///docs/thuservices/image/washer_official.jpg)

### Washing Machine Status - API (Text Version, Deprecated)

Tired of rushing up and down stairs to grab a washing machine, only to find none available? This service monitors washing machine status so you can check campus-wide washing machine availability without leaving your room!

Source code is in the aux directory of the repo. Currently deployed on Cloudflare Workers at [https://washer.thu.services](https://washer.thu.services).

To search, we need to add parameters. Currently three parameters are accepted: "s", "j", and "p". "s" is the apartment building to search; accepted strings are typically "紫荆x号楼" (Zijing Building x) or "南区x号楼" (South Area Building x). For example:

```
https://washer.thu.services/?s=紫荆1号楼
```

will return the washing machine status for "Zijing Building 1." When this parameter is omitted, the default is "Zijing Building 2."

For the "j" parameter, we only check whether "j" is present. If it is, raw JSON data is returned — this is for developers. "s" and "j" parameters can be used together.

For the "p" parameter, we only check whether "p" is present. If it is, text/plain data is returned. "s" and "p" parameters can be used together. When both "j" and "p" are present, "j" takes priority.

### Washing Machine Status - iOS Shortcut (Unavailable)

Users with iOS 12 or above can install a shortcut via this [link](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0) to quickly query available washing machines. Currently only supports floor-level precision queries.

### Washing Machine Status - Telegram Bot Erha (Unavailable)

Based on this API, [Konano](https://github.com/Konano) developed a Telegram Bot named Erha (二哈, meaning "silly husky").

The project is available [here](https://github.com/Konano/Tuna-Erha-Bot). It offers additional features beyond washing machine status queries.

Access the Bot at [t.me/erhabot](https://t.me/erhabot).

### Laundry Monitoring & Alerts - WeChat Mini Program (Unavailable)

![THU Laundry](pathname:///docs/thuservices/image/washer.jpg)

Using the same API, after following a washing machine, when it becomes available, a reminder is sent via the WeChat service account.

[Project link](https://github.com/zrt/thu-wash-notify)

## INFO GPA Calculator

Having trouble querying your GPA after cksqs failed? Or do you need to pay ¥10 to get your GPA?
This GPA, which only retains 3 significant digits, creates great uncertainty due to the [-0.005, 0.005) rounding;
and for students who calculate GPA manually, the increasing number of courses over the years makes manual calculation increasingly difficult, requiring recalculation every time a new grade is released.

Therefore, we propose an automatic GPA calculation feature. Considering convenience and usability, we as usual release a userscript to implement this small feature.

This script only reads grades present on the "INFO - All Grades" page (grades that have been entered into the system but not yet published, which can only be accessed through cksqs or paid transcripts, are not included), calculates the overall GPA and required/restricted-elective GPA using both old and new algorithms (outputs double directly), and pops up a notification.

This script is in `aux/Tsinghua GPA Calculator.user.js` and requires Tampermonkey for installation.

Or get it [here](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator).

## Tsinghua University GPA Query

See the previous section for introduction.

Calculates semester and total required/restricted-elective and required/restricted-elective/optional GPA on the "INFO - All Grades" page. Script is available [here](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询).

## Rain Classroom Helper

This userscript aims to provide a better Rain Classroom (雨课堂) student experience on large-screen devices (PC, tablet).

The project is available [here](https://github.com/RainEggplant/rain-classroom-helper).

## Tsinghua University Integrated Platform Auto Video Playback

Script is [here](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay). It can automatically play course videos on [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn).

## XuetangX Auto Video Playback

Tired of constantly checking whether your MOOC has stopped playing in the background? This script automatically plays the next lesson!

Script is [here](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放).

Due to this script's long history and lack of recent maintenance, as well as some bugs, its long-term availability is not guaranteed. Contact the original author @RikaSugisawa if you find issues or have improvements.

## XuetangX Subtitle Downloader

Tired of going through videos one by one to download subtitles when preparing for exams? This script is here to help!

Rabbit Hu version: Script [here](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler), project [here](https://github.com/Rabbit-Hu/xuetangx-caption-crawler).

Roberts Holder version: Project [here](https://github.com/rcy17/MOOC_subtitle_spider).

Rynco Maekawa version: Project [here](https://github.com/lynzrand/xuetangx_sub).

c7w version: Project [here](https://github.com/c7w/TsinghuaMoocCaptionCrawler).

## Rain Classroom Slides Downloader

Currently only works with "Changjiang Rain Classroom" (长江雨课堂), but can be adapted for Hetang Rain Classroom (荷塘雨课堂) with minor modifications.

The project is available [here](https://github.com/ShevonKuan/yuektang_ppt2pdf).

## Tsinghua Teaching Reference Book Crawler

The university library has purchased many [book resources](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7). It is recommended to first use the [Tsinghua University Teaching Reference Service Platform](http://reserves.lib.tsinghua.edu.cn/) and [Wenquan Xuetang - Tsinghua University Press E-Book Database](https://lib-tsinghua.wqxuetang.com/) to find Chinese textbooks.

### Tsinghua University Teaching Reference Service Platform

The Tsinghua Teaching Reference Service Platform provides scanned electronic versions of course textbooks and reference materials within copyright-permitted scope (online browsing). If the textbook you need is not available on the platform, you can directly email or call the [relevant department](https://lib.tsinghua.edu.cn/info/1184/3617.htm) to request scanning.

It is recommended to use [reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader) for downloads.

Download functionality is also implemented in [thu-info-lib](https://github.com/thu-info-community/thu-info-lib).

The following two projects are no longer functional due to API changes.

Quoting the original: "Due to the recent severe pandemic, purchasing textbooks has become difficult. To facilitate online learning, a Python script for crawling Tsinghua teaching references was written."

Project [here](https://github.com/lflame/TsinghuaBookCrawler).

Quoting the original: "Automatically downloads the original image of each page of a book."

Project [here](https://github.com/i207M/reserves-lib-tsinghua-downloader).

### Wenquan Xuetang

Wenquan Xuetang is used to search for Tsinghua University Press books. It has strict anti-crawling, and you can use [this](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88) script to download.

## Course Location Sharing

Currently available: [courseX Course Information Sharing Project](https://tsinghua.app/courses) maintained by the learnX development team.

The following project has been discontinued:

At [https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/), with the project available [here](https://github.com/RikaKagurasaka/where-my-course-gone-backend).

## Registration Mark (For Train Tickets)

Refer to [this website](https://tuixue.online/zcimage/) for conveniently obtaining registration marks when off-campus.

## Dormitory Electricity Bill Query

There is an [implementation](https://github.com/WhymustIhaveaname/TsinghuaElectric) using headless Chrome.

There is also another implementation in `TsinghuaElectricityBillChecker.py` in the aux directory — users need to modify some embedded parameters.

And another implementation in `TsinghuaBills.py` in the aux directory.

These scripts can feed data into Grafana for electricity bill monitoring and alerts.

## Dormitory Water & Electricity Bill Query

Refer to `TsinghuaBills.py` in the aux directory.

Note: This script queries dormitory water balance (not the campus card e-wallet!), primarily applicable to W Building and Shuangqing Apartments. Specific coverage: Shuangqing Apartments, Zijing Student Apartments No. 14-17, Building 17, Building 18.

This script can feed data into Grafana for water and electricity bill monitoring and alerts.

## Tsinghua Class Bell Sounds

Studying at home without atmosphere? Miss the school study room? The Tsinghua Bell app is here to help!

Currently available for macOS. Project [here](https://github.com/LyricZhao/THU-Bell).

## Random Campus Restaurant Selector - WeChat Mini Program

Too many dining halls and can't decide where to eat? A random number generator to the rescue!

Project [here](https://github.com/SuXY15/RandomCanteen).

Mini program QR code:

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## Random Campus Restaurant Selector - Telegram Bot

Same as above.

Additionally, the Telegram Bot also provides interactive features like virtual milk tea, virtual cappuccino, and virtual beverage production.

Project [here](https://github.com/Lancern/thufood-tgbot).

Bot address: https://t.me/thufood_bot

A similar one: https://t.me/thufoodbot

## THU Computer Science Course Guide

[GitHub link](https://github.com/PKUanonym/REKCARC-TSC-UHT) and [on-campus link](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## THU Software School Course Guide

[GitHub link](https://github.com/SerCharles/THSS-CRACKER)

## Huaqing University Course Guide Sharing Project

A course guide sharing project for all students, aimed at eliminating information asymmetry in learning resources and promoting open sharing. Project [here](https://closed.social/pastExam/). Compared to GitHub, sharing and downloading are more friendly for students unfamiliar with technology. Contributions are welcome!

![Huaqing University Course Guide Sharing Project](pathname:///docs/thuservices/image/course_strategy.jpg)

## Campus Course Evaluation Platform

Colleguide: A platform to rate schools, professors, and courses

https://www.colleguide.com/

## Facts About the CS Department

https://github.com/jiegec/dcst-facts

## NFSee Campus Card

https://github.com/nfcim/nfsee

## Course Information Sharing Project

https://tsinghua.app/courses

## THU CS 912 Graduate Entrance Exam Materials

https://github.com/Wsky51/THU-CS912-kaoyan

## Tsinghua Score Scratch Card

https://github.com/summivox/thu-scratch

- Install Chrome extension or Userscript
- Log in to INFO
- The places where grades used to be visible are now covered up~
- Excitedly scratch to reveal them (ドキドキ)

## thuhole memories

All content sourced from featured posts and personal favorites.

https://github.com/pb0316/thuhole_memories

## thuhole database backup

After data cleaning, most meaningful tree hole posts that don't involve personal privacy are backed up in this GitHub repository.

https://github.com/thuhole/database_backup

## CS Department Student Technology Association Skill Guide

This skill guide is maintained by the Tsinghua University CS Department Student Technology Association. It aims to enable CS students to quickly master specific skills, and by demonstrating how these skills apply in coursework, research, and internships, save students time collecting relevant materials while improving their ability to learn new skills.

https://docs.net9.org/

## THU Graduate Social Practice System Crawler

Crawl structured data from https://thshijian.tsinghua.edu.cn (Tsinghua University Graduate Social Practice System). Use at your own risk.

https://github.com/Harry-Chen/thshijian-crawler
