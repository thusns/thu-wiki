---

---
# 一些文稿和工具

## 校園網路認證工具總合

本著用輪子不如造輪子的精神，一代代清華人與校園網鬥智斗勇，開發了無數認證工具，我們在此盡可能列出它們，供大家根據喜好選用。

| 專案連結 | 支援平台 | 實作語言 | 目前是否可用（是否已維護）| 特性 |
| --- | --- | --- | --- | --- |
| [Tunet-2018 (official)](https://its.tsinghua.edu.cn/xywl/xywsyzn/yxw_hkhd_/khdxz.htm) | Windows-GUI, Linux-CLI | 未知 | 可用 | 未調查 |
| [GoAuthing](https://github.com/z4yx/GoAuthing/) | Linux-CLI (x86\_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI (Intel, Apple) | Go | 可用 | 全平台全架構，准入與準出，v4和v6，systemd 服務，NATUNA提供[镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/)可以在未認證時下載認證工具，提供認證相關函式庫 |
| [tunet-python](https://github.com/yuantailing/tunet-python) | 支援 python 的平台，CLI | Python | 可用 | v4與v6，准入與准出，流量與准入出狀態監控 |
| [tunet-c](https://github.com/robertying/tunet-c) | OpenWRT, Linux, macOS; CLI | C | 可用 | 提供認證相關函式庫，二進位檔案較小 |
| [tunet-rust](https://github.com/Berrysoft/tunet-rust) | Windows, Mac OS, Linux, Android, iOS | Rust, Dart | 可用 | 流量與餘額監控，准入與准出，v4與v6；提供認證相關庫；桌面端提供 CLI、CUI、GUI、Windows 服務、systemd 服務、launchd 服務；行動裝置提供 GUI |
| [TsinghuaTunet](https://github.com/WhymustIhaveaname/TsinghuaTunet) | 支援 python 的平台， CLI | Python | 可用於特定子網路 | 未調查 |
| [auth-tsinghua](https://github.com/jiegec/auth-tsinghua) | 支援 node.js 的平台, CLI | Javascript | 不再維護 | 已重定向至 GoAuthing |
| [TsinghuaNet](https://github.com/Berrysoft/TsinghuaNet) | Windows, Mac OS, Linux, UWP, Android, iOS | C# | 不再維護 | 已重新導向至 tunet-rust |
| [tunet-cli](https://github.com/syimyuzya/tunet-cli) | 支援 python 的平台，CLI | Python | 不再維護，上個 commit 在2017年 | 未調查 |
| [Tsinghua-Online](https://github.com/xxr3376/Tsinghua-Online) | 瀏覽器插件，在[Chrome 商店](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo)中 | Javascript | 不再維護，上個 commit 在2013年 | 瀏覽器插件 |
| [THUNetwork](https://github.com/zhaofeng-shu33/THUNetwork) | 支援 python 的平台， CLI | Python | 不再維護 | 密碼明文傳入命令列，較為不安全 |

## INFO/網路學堂 APP/插件

本著用輪子不如造輪子的精神，一代代清華人與INFO與網絡學堂鬥智斗勇，開發了無數易用工具，我們在此盡可能列出它們，供大家根據喜好選用。

| 專案連結 | 支援平台 | 實作語言 | 目前是否可用（是否已維護）| 特性 |
| --- | --- | --- | --- | --- |
| [INFO](http://info.tsinghua.edu.cn/) | 網頁 | 未調查 | 能用 | 官方網頁 |
| [LEARN](http://learn.tsinghua.edu.cn/) | 網頁 | 未調查 | 能用 | 官方網頁 |
| [Learn-Project](https://github.com/xxr3376/Learn-Project) | 瀏覽器插件 | Typescript | 可用 | 按照時間軸與種類排列網絡學堂項目，在谷歌，火狐以及 Edge 的插件商店中，現代前端 |
| [LearnX](https://github.com/robertying/learnX) | iOS,ipad OS, macOS, Android | React | 可用 | 專案開源許可證，其餘請參閱專案介紹 |
| [THUInfo](https://github.com/UNIDY2002/THUInfo) | 行動端APP | Typescript | 可用 | 擁有蘋果應用商店分發，包括家園，學生部（教室），圖書館的項目，支持樹洞 |
| AtTsinghua | 行動裝置APP | 未知 | 未知 | 擁有蘋果應用商店分發，其餘未調查，為某實驗室校慶作品 |
| [learn2018-autodown](https://github.com/Trinkle23897/learn2018-autodown) | 支援 Python 的平台 | Python | 可用 | 真全部資訊/檔案下載（其餘詳見專案介紹） |
| [THUCourseHelper](https://github.com/Starrah/THUCourseHelper) | Android | Kotlin | 未知 | 課程表 |
| [thu-learn-downloader](https://github.com/liblaf/thu-learn-downloader) | Linux, Mac, Windows | Python | 可用 | 介面美觀的網路學堂課程文件及作業下載 (詳見專案文件) |

## 選課衝突標記

你還在為搶課時滿懷期待提交選課，卻發現時間衝突而錯失選課嗎？
你還在一邊記憶已選課時間，一邊對照開課列表而感到緩慢嗎？
這個腳本幫你忙！

這個腳本偵測你已經選好的課，自動將候選課中有衝突時間的課標紅，使得你瀏覽
百萬課程時速度有如神助。當滑鼠在標紅的時間上懸停時，會顯示所有與其衝突的課程。

要注意的是，現在未對半學期課做完全支持，也就是說可能出現假的時間衝突；
同時在開課資訊以及選課查詢介面無法運作，只在選課操作介面工作。

本腳本在 aux/TsinghuaCourseConflictMarker.user.js 中，需要使用油猴安裝。

或可透過存取[这里](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker)
來一鍵獲得腳本。

現在已經增加 webvpn 支援。

感谢 [CircuitCoder](https://github.com/CircuitCoder) 提供的技术指导
感謝 [SharzyL](https://github.com/SharzyL) 的建議與 DEBUG

## 選課剩餘課容標記

不知道該用什麼志工搶課？
這個腳本幫你忙！

這個腳本為報名人數上色，最後一個綠色就是最佳搶課志工了！

腳本還在開發中，隊列支援等即將上線！

造訪[这里](https://greasyfork.org/en/scripts/456440-colorful-course)取得腳本

## INFO 網路學堂 Telegram 訊息推播

參見 [thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) 以及
[thu-info-forwarder](https://github.com/Konano/thu-info-forwarder)。

在 Telegram 上已經存在 THU INFO CHANNEL，由於是私人頻道，需要透過[邮件](mailto:i@zenithal.me)
取得邀請連結。

## 全校洗衣機狀態

### 全校洗衣機狀態 - 洗衣機查詢工具（有介面）

https://washer.sdevs.top/

介面簡潔易用，資料經過整理，可記憶查詢的公寓大樓，提供回饋管道。

### 清華大學洗衣房可用性查詢

https://washer.voltair.top/

### 全校洗衣機狀態 - 官方小程序

在洗衣機廠商的小程式中也可以查詢洗衣機狀態。

入口是主頁下方的“附近的洗衣機”按鈕。

![“自助智能校园”小程序码](pathname:///docs/thuservices/image/washer_official.jpg)

### 全校洗衣機狀態 - API介面（文字版，已廢棄）

還在為了搶洗衣機而努力嗎，還在跑上跑下卻發現一個洗衣機都沒有而痛苦嗎，這個服務
幫你偵測洗衣機狀態，足不出戶而一鍵掌握全校洗衣機的動向！

源碼在 repo 的 aux 目錄中。目前部署在 cf workers 上，位址為 [https://washer.thu.services](https://washer.thu.services)

要實現搜索，我們需要加上參數，目前接受三種參數，“s”，“j”與“p”。 「s」即為搜尋的
公寓大樓，一般接受的字串為「紫荊x號樓」或「南區x號大樓」。舉例來說

```
https://washer.thu.services/?s=紫荆1号楼
```

會返回「紫荊1號樓」的洗衣機運作。在該參數缺省的情況下，回傳的是
「紫荊2號樓」的洗衣機運作。

對於「j」參數，我們只檢查「j」是否存在，若存在，則傳回原始的 json 數據，
此項供開發者使用。 “s”與“j”參數可同時使用。

對於「p」參數，我們只檢查「p」是否存在，若存在，則傳回 text/plain 數據，
“s”與“p”參數可同時使用。當“j”與“p”同時出現時，“j”的優先權更高。

### 全校洗衣機狀態 - iOS 快捷方式（不可用）

iOS 12 以上的使用者可以透過此[链接](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0)安裝捷徑以實現快速查詢空閒洗衣機。目前僅支援精確度至樓層的查詢。

### 全校洗衣機狀態 - Telegram Bot 二哈（不可用）

基於此介面[Konano](https://github.com/Konano)開發了一個 Telegram Bot，名為二哈。

項目地址在[此處](https://github.com/Konano/Tuna-Erha-Bot)，在洗衣機狀態查詢功能外，還有更多功能。

可以透過[t.me/erhabot](https://t.me/erhabot) 存取該 Bot。

### 洗衣監控與提醒 - 微信小程式（不可用）

![THU洗衣](pathname:///docs/thuservices/image/washer.jpg)

使用同一組API，在關注洗衣機後，當洗衣機空閒時，會透過微信服務號碼發送提醒。

[项目地址](https://github.com/zrt/thu-wash-notify)

## INFO GPA 計算器

在 cksqs 失敗後難以一鍵查詢 GPA 嗎，抑或需要割肉花 10 元才能得到 GPA 嗎，
這種只保留了 3 位有效數字的 GPA，由於 [-0.005,0.005) 的捨入，讓人感到極大的不確定性；
而對於手算 GPA 的同學，由於學年的增加，課程的增多，手算的難度也越來越高，每出一門課
就需要算一次 GPA，負擔極重。

於是，我們提出自動的 GPA 計算功能，考慮到方便、好用等各種因素，我們與往常一樣，
推出 userscript 實現這項小功能。

本腳本只會讀取「INFO-全部成績」介面中存在的成績（已輸入系統但沒發布的，只能
透過 cksqs 或付費成績單取得的，不在計算範圍內），用新、舊演算法將全部 GPA 與必限 GPA
計算出來（直接輸出 double），並彈出通知提醒。

本腳本在 `aux/Tsinghua GPA Calculator.user.js` 中，需要使用油猴安裝。

或透過[这里](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator)
來獲得。

## 清華大學GPA查詢

介紹參考上一節。

在「INFO-全部成績」頁面計算各學期以及總的必限以及必限任的GPA。腳本地址在[此處](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询)

## Rain Classroom Helper

此使用者腳本旨在為大螢幕裝置（PC、平板）提供更好的雨課堂學生端使用體驗。

項目地址在[此處](https://github.com/RainEggplant/rain-classroom-helper)

## 清華大學一體化平台影片自動播放

腳本在[此處](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay)，可自動播放 [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn) 上的課程影片。

## 學堂線上影片自動播放

還在後台刷慕課時經常查看是否停止嗎，一個腳本幫你自動播放下一課！

腳本在[此處](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放)

由於此腳本歷史較久，較久未維護，也存在一些bug，不保證其長期的可用性。發現問題時或改進程式碼時可聯絡原作者 @RikaSugisawa

## 學堂線上字幕下載器

還在準備複習的時候一個個翻影片下載字幕嗎？這個腳本幫你忙！

Rabbit Hu 版本：腳本在[此處](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler)，項目地址在[此處](https://github.com/Rabbit-Hu/xuetangx-caption-crawler)。

Roberts Holder 版本：專案地址在[此處](https://github.com/rcy17/MOOC_subtitle_spider)

Rynco Maekawa 版本：專案地址在[此處](https://github.com/lynzrand/xuetangx_sub)

c7w 版本：項目位址在[此處](https://github.com/c7w/TsinghuaMoocCaptionCrawler)

## 雨課堂課件下載器

目前僅適用於「長江雨教室」，不過改改可用於荷塘雨教室。

項目地址在[此處](https://github.com/ShevonKuan/yuektang_ppt2pdf)。

## 清華教學參考書爬取

學校圖書館購買了許多的[图书资源](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7)，推薦優先使用[清华大学教参服务平台](http://reserves.lib.tsinghua.edu.cn/)和[文泉学堂-清华大学出版社电子图书数据库](https://lib-tsinghua.wqxuetang.com/)尋找中文教材。

### 清華大學教參服務平台

清華大學教參服務平台在版權允許範圍內（線上瀏覽）提供課程教材和教參的掃描電子版，如果需要平台上沒有的教材，可以直接郵件或電話聯繫[相关部门](https://lib.tsinghua.edu.cn/info/1184/3617.htm)進行掃描。

建議使用[reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader)進行下載。

在 [thu-info-lib](https://github.com/thu-info-community/thu-info-lib) 中也實作了下載功能。

下方兩個項目由於 API 變動不可用。

引自原文：最近疫情嚴重，購買教材較為困難，為了方便大家在線學習，寫了一個爬取清華教參的 python 腳本。

項目地址在[此處](https://github.com/lflame/TsinghuaBookCrawler)

引用原文：自動下載書籍每一頁的原圖。

項目地址在[此處](https://github.com/i207M/reserves-lib-tsinghua-downloader)

### 文泉學堂

文泉學堂用來搜尋清華大學出版社的圖書，反爬嚴格，可以使用[这个](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88)腳本下載。

## 課程地點分享

目前可用：由 learnX 開發團隊維護的 [courseX 课程信息共享计划](https://tsinghua.app/courses)

以下項目目前已經停止維護與營運：

在[https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/)中，其項目位址為[此處](https://github.com/RikaKagurasaka/where-my-course-gone-backend)。

## 註冊標誌（用於火車票）

參考[此网站](https://tuixue.online/zcimage/)，方便在校外時取得相關註冊標誌。

## 寢室電費查詢

有透過 headless Chrome 的[实现](https://github.com/WhymustIhaveaname/TsinghuaElectric)

還有另一種實現，參考 aux 目錄中的 `TsinghuaElectricityBillChecker.py`，使用者需要修改一些內嵌的參數。

還有另一種實現，參考 aux 目錄中的 `TsinghuaBills.py`。

透過這些腳本可以將資料灌入 grafana 中，以實現電費監控與警報。

## 寢室水電費查詢

參考 aux 目錄中的 `TsinghuaBills.py`。

註：此腳本可查詢的是寢室水費餘額（非校園卡小錢包！），主要適用於W樓和雙清公寓。具體適用範圍：雙清公寓、紫荊學生公寓十四號樓、紫荊學生公寓十五號樓、紫荊學生公寓十六號樓、紫荊學生公寓十七號樓、十七號樓、十八號樓。

此腳本可將資料灌入 grafana 中，以實現水電費監控與警報。

## 清華上下課鈴聲

在家學習沒氛圍，想念學校自習室？清華鈴聲軟體幫您忙！

目前有 macOS 版本，項目[在此](https://github.com/LyricZhao/THU-Bell)

## 隨機選擇校內餐廳 - 微信小程序

食堂太多不知道去哪裡吃？隨機數字產生器幫您忙！

項目在[此處](https://github.com/SuXY15/RandomCanteen)

小程式二維碼

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## 隨機選擇校內餐廳 - Telegram Bot

同上。

另外，Telegram Bot 也提供線上喝奶茶、線上喝卡布奇諾、線上生產飲品等互動功能。

項目地址在[此處](https://github.com/Lancern/thufood-tgbot)

BOT 位址為 https://t.me/thufood_bot

類似的有 https://t.me/thufoodbot

## 清華大學計算機系課程攻略

[GitHub地址](https://github.com/PKUanonym/REKCARC-TSC-UHT)與[校内地址](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## 清華軟院課程攻略

[GitHub地址](https://github.com/SerCharles/THSS-CRACKER)

## 華清大學課程攻略共享計劃

全校同學的課程攻略共享計劃，旨在消除學習資源的資訊不對稱，促進學習資源和資料的開放共享。項目[在此](https://closed.social/pastExam/)。相較之 GitHub，分享與下載操作對不熟悉技術的同學都更加友好，歡迎分享！

![华清大学课程攻略共享计划](pathname:///docs/thuservices/image/course_strategy.jpg)

## 校園評審平台

Colleguide: A platform to rate schools, professors, and courses

https://www.colleguide.com/

## 有關計算機系的事實

https://github.com/jiegec/dcst-facts

## NFSee 校園卡

https://github.com/nfcim/nfsee

## 課程資訊共享計劃

https://tsinghua.app/courses

## 清華大學電腦專業912考研資料

https://github.com/Wsky51/THU-CS912-kaoyan

## 清華成績刮刮樂

https://github.com/summivox/thu-scratch

* 安裝Chrome插件或Userscript
* 登入info
* 原來可以看成績的地方已經被擋住啦～
* 心裡「ドキドキ」地刮之

## thuhole memories

全部內容來源精品洞和個人收藏。

https://github.com/pb0316/thuhole_memories

## thuhole database backup

在洗完資料後，大部分不涉及個人隱私的有意義的樹洞備份在此GitHub倉庫。

https://github.com/thuhole/database_backup

## 計算機系學生科協技能引導文檔

本技能引導文件由清華大學電腦系學生科協維護，目標在於讓電腦類與電腦系的學生能夠快速地掌握某些特定的技能，並且透過給予這些技能在課程、科研與實習中可能運用的方式，節省同學們收集相關資料的時間，同時提升同學們學習新技能的能力。

https://docs.net9.org/

## 清華大學研究生社會實踐系統爬蟲

Crawl structured data from https://thshijian.tsinghua.edu.cn (清華大學研究生社會實踐系統). Use at your own risk.

https://github.com/Harry-Chen/thshijian-crawler
