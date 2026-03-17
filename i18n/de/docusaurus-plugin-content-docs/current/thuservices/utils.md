---

---
# einige Skripte und Tools

## Zusammenfassung der Authentifizierungstools für Campusnetzwerke

Im Geiste, Räder zu verwenden statt Räder herzustellen, haben Generationen von Tsinghua-Leuten mit Verstand und Mut im Campus-Netzwerk gekämpft und unzählige Authentifizierungstools entwickelt. Wir listen sie hier so weit wie möglich auf, damit jeder nach seinen Vorlieben auswählen kann.

| Projektlinks | Unterstützte Plattformen | Implementierungssprachen | Derzeit verfügbar (gepflegt) | Funktionen |
| --- | --- | --- | --- | --- |
| [Tunet-2018 (official)](https://its.tsinghua.edu.cn/xywl/xywsyzn/yxw_hkhd_/khdxz.htm) | Windows-GUI, Linux-CLI | Unbekannt | Verfügbar | Nicht untersucht |
| [GoAuthing](https://github.com/z4yx/GoAuthing/) | Linux-CLI (x86\_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI (Intel, Apple) | Geh | Verfügbar | Vollständige Plattform und vollständige Architektur, Zugriff und Zugriff, v4 und v6, Systemd-Dienst, TUNA Bietet [镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/) zum Herunterladen von Authentifizierungstools, wenn nicht authentifiziert, und stellt authentifizierungsbezogene Bibliotheken bereit |
| [tunet-python](https://github.com/yuantailing/tunet-python) | Plattform, die Python, CLI | unterstützt Python | Verfügbar | v4 und v6, Ein- und Ausfahrt, Verkehrs- und Einlassstatusüberwachung |
| [tunet-c](https://github.com/robertying/tunet-c) | OpenWRT, Linux, macOS; CLI | C | Verfügbar | Bietet authentifizierungsbezogene Bibliotheken, Binärdateien sind klein |
| [tunet-rust](https://github.com/Berrysoft/tunet-rust) | Windows, Mac OS, Linux, Android, iOS | Rost, Dart | Verfügbar | Verkehrs- und Gleichgewichtsüberwachung, Ein- und Ausfahrt, Version 4 und Version 6; stellt Bibliotheken zur Authentifizierung bereit; stellt CLI, CUI, GUI, Windows-Dienst, Systemd-Dienst und Launchd-Dienst auf dem Desktop bereit; stellt GUI auf dem mobilen Endgerät bereit |
| [TsinghuaTunet](https://github.com/WhymustIhaveaname/TsinghuaTunet) | Plattformen, die Python und CLI unterstützen | Python | Verfügbar in bestimmten Subnetzen | Nicht untersucht |
| [auth-tsinghua](https://github.com/jiegec/auth-tsinghua) | Unterstützt von node.js-Plattformen, CLI | Javascript | Nicht mehr gepflegt | Umgeleitet zu GoAuthing |
| [TsinghuaNet](https://github.com/Berrysoft/TsinghuaNet) | Windows, Mac OS, Linux, UWP, Android, iOS | C# | Nicht mehr gepflegt | Umgeleitet zu tunet-rust |
| [tunet-cli](https://github.com/syimyuzya/tunet-cli) | Plattform, die Python, CLI | unterstützt Python | Wird nicht mehr gepflegt, letztes Commit im Jahr 2017 | Nicht untersucht |
| [Tsinghua-Online](https://github.com/xxr3376/Tsinghua-Online) | Browser-Plugin, in [Chrome 商店](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo) | Javascript | Wird nicht mehr gepflegt, letztes Commit im Jahr 2013 | Browser-Plugin |
| [THUNetwork](https://github.com/zhaofeng-shu33/THUNetwork) | Unterstützt Python-Plattform, CLI | Python | Nicht mehr gepflegt | Das Passwort wird im Klartext an die Befehlszeile übergeben, was relativ unsicher ist |

## INFO/Online-Schul-APP/Plug-in

Im Sinne der Idee, Räder zu verwenden, anstatt Räder herzustellen, haben Generationen von Tsinghua-Leuten mit INFO und Online-Schulen gegen Verstand und Mut gekämpft und unzählige benutzerfreundliche Tools entwickelt. Wir geben unser Bestes, sie hier aufzulisten, damit jeder nach seinen Vorlieben auswählen kann.

| Projektlinks | Unterstützte Plattformen | Implementierungssprachen | Derzeit verfügbar (gepflegt) | Funktionen |
| --- | --- | --- | --- | --- |
| [INFO](http://info.tsinghua.edu.cn/) | Webseite | Nicht untersucht | Verfügbar | Offizielle Webseite |
| [LEARN](http://learn.tsinghua.edu.cn/) | Webseite | Nicht untersucht | Verfügbar | Offizielle Webseite |
| [Learn-Project](https://github.com/xxr3376/Learn-Project) | Browser-Plugins | Typoskript | Verfügbar | Online-Schulprojekte nach Zeitleiste und Kategorie geordnet, in Google-, Firefox- und Edge-Plugin-Stores, modernes Frontend |
| [LearnX](https://github.com/robertying/learnX) | iOS, iPad OS, macOS, Android | Reagieren | Verfügbar | Projekt-Open-Source-Lizenz, weitere Informationen finden Sie in der Projekteinführung |
| [THUInfo](https://github.com/UNIDY2002/THUInfo) | Mobile APP | Typoskript | Verfügbar | Mit Apple App Store-Verteilung, einschließlich Zuhause, Studentenabteilung (Klassenzimmer), Bibliotheksprojekte, unterstützt Baumlöcher |
| AtTsinghua | Mobile APP | Unbekannt | Unbekannt | Vertrieb über den Apple App Store, der Rest wurde nicht untersucht, es handelt sich um eine Arbeit für die Campus-Feier eines bestimmten Labors |
| [learn2018-autodown](https://github.com/Trinkle23897/learn2018-autodown) | Plattform, die Python | unterstützt Python | Verfügbar | Echte vollständige Informationen/Datei-Download (weitere Details finden Sie in der Projekteinführung) |
| [THUCourseHelper](https://github.com/Starrah/THUCourseHelper) | Android | Kotlin | Unbekannt | Kursplan |
| [thu-learn-downloader](https://github.com/liblaf/thu-learn-downloader) | Linux, Mac, Windows | Python | Verfügbar | Online-Kursdateien und Hausaufgaben-Downloads mit schöner Benutzeroberfläche (Einzelheiten finden Sie in den Projektdokumenten) |

## Konfliktflag bei der Kursauswahl

Reichen Sie Ihre Kursauswahl immer noch mit hohen Erwartungen ein, wenn Sie in Eile sind, um am Unterricht teilzunehmen, stellen Sie aber fest, dass es einen Zeitkonflikt gibt und Sie die Kursauswahl verpasst haben?
Fühlen Sie sich immer noch langsam, wenn Sie sich die gewählte Kurszeit merken und die Kursstartliste überprüfen?
Dieses Skript hilft Ihnen!

Dieses Skript erkennt die von Ihnen ausgewählten Kurse und markiert die Kurse mit widersprüchlichen Zeiten in den Kandidatenkursen automatisch rot, sodass Sie sie durchsuchen können
Die Geschwindigkeit von Millionen von Kursen gleicht einem Wunder. Wenn Sie mit der Maus über eine rot markierte Zeit fahren, werden alle damit in Konflikt stehenden Kurse angezeigt.

Es ist zu beachten, dass Halbjahreslehrveranstaltungen noch nicht vollständig unterstützt werden, wodurch es zu falschen Zeitkonflikten kommen kann;
Gleichzeitig kann es nicht auf der Abfrageschnittstelle für Kurseröffnungsinformationen und Kursauswahl funktionieren, sondern nur auf der Schnittstelle für Kursauswahloperationen.

Dieses Skript befindet sich in aux/TsinghuaCourseConflictMarker.user.js und muss mit Oil Monkey installiert werden.

Oder Sie können darauf zugreifen, indem Sie [这里](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker) besuchen.
Kommen Sie und holen Sie sich das Skript mit einem Klick.

WebVPN-Unterstützung wurde jetzt hinzugefügt.

Vielen Dank an [CircuitCoder](https://github.com/CircuitCoder) für die technische Anleitung
Vielen Dank an [SharzyL](https://github.com/SharzyL) für die Vorschläge und DEBUG

## Verbleibende Kursinhalte für die Kursauswahl markieren

Sie wissen nicht, welche Art von Freiwilligen Sie für den Unterricht einsetzen sollen?
Dieses Skript hilft Ihnen!

Dieses Skript färbt die Anzahl der Bewerber ein. Die letzte grüne Farbe ist der beste Kandidat für einen Kurs!

Das Skript befindet sich noch in der Entwicklung und die Warteschlangenunterstützung wird bald verfügbar sein!

Besuchen Sie [这里](https://greasyfork.org/en/scripts/456440-colorful-course), um das Skript zu erhalten

## INFO Online-Schultelegramm-Nachrichten-Push

Siehe [thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) und
[thu-info-forwarder](https://github.com/Konano/thu-info-forwarder).

DO INFO CHANNEL existiert bereits auf Telegram. Da es sich um einen privaten Kanal handelt, müssen Sie [邮件](mailto:i@zenithal.me) übergeben.
Holen Sie sich den Einladungslink.

## Schulweiter Waschmaschinenstatus

### Schulweiter Waschmaschinenstatus – Waschmaschinen-Abfragetool (mit Schnittstelle)

https://washer.sdevs.top/

Die Benutzeroberfläche ist einfach und benutzerfreundlich, die Daten sind organisiert, die abgefragten Mehrfamilienhäuser können gespeichert werden und es ist ein Feedbackkanal vorhanden.

### Anfrage zur Verfügbarkeit von Waschküchen an der Tsinghua-Universität

https://washer.voltair.top/

### Schulweiter Waschmaschinenstatus – offizielles Applet

Sie können den Status der Waschmaschine auch im Applet des Waschmaschinenherstellers überprüfen.

Der Eingang ist die Schaltfläche „Waschmaschine in der Nähe“ unten auf der Startseite.

![“自助智能校园”小程序码](pathname:///docs/thuservices/image/washer_official.jpg)

### Schulweiter Waschmaschinenstatus – API-Schnittstelle (Textversion, veraltet)

Arbeiten Sie immer noch hart daran, eine Waschmaschine zu ergattern? Leiden Sie immer noch unter dem ständigen Hin- und Herlaufen, nur um dann festzustellen, dass keine Waschmaschine da ist? Dieser Dienst
Helfen Sie dabei, den Status der Waschmaschine zu erkennen und die Trends der Waschmaschinen in der gesamten Schule mit einem Klick zu kennen, ohne das Haus zu verlassen!

Der Quellcode befindet sich im Aux-Verzeichnis des Repos. Derzeit auf CF-Workern bei [https://washer.thu.services](https://washer.thu.services) eingesetzt

Um die Suche zu implementieren, müssen wir Parameter hinzufügen. Derzeit akzeptiert es drei Parameter: „s“, „j“ und „p“. „s“ ist die Suche
Bei Mehrfamilienhäusern sind die allgemein akzeptierten Zeichenfolgen „Gebäude x, Bauhinia“ oder „Gebäude x, Südbezirk“. Zum Beispiel

```
https://washer.thu.services/?s=紫荆1号楼
```

Es wird der Betriebsstatus der Waschmaschine im „Zijing-Gebäude 1“ zurückgegeben. Standardmäßig wird dieser Parameter zurückgegeben
Der Betriebsstatus der Waschmaschine im „Zijing-Gebäude 2“.

Für den Parameter „j“ prüfen wir nur, ob „j“ existiert. Wenn vorhanden, werden die ursprünglichen JSON-Daten zurückgegeben.
Dieser Artikel ist für die Verwendung durch Entwickler bestimmt. Die Parameter „s“ und „j“ können gleichzeitig verwendet werden.

Für den Parameter „p“ prüfen wir lediglich, ob „p“ existiert. Wenn vorhanden, werden Text-/einfache Daten zurückgegeben.
Die Parameter „s“ und „p“ können gleichzeitig verwendet werden. Wenn „j“ und „p“ gleichzeitig erscheinen, hat „j“ eine höhere Priorität.

### Schulweiter Waschmaschinenstatus – iOS-Verknüpfung (nicht verfügbar)

Benutzer mit iOS 12 oder höher können die Verknüpfung über diesen [链接](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0) installieren, um schnell zu überprüfen, ob die Waschmaschine im Leerlauf ist. Derzeit werden nur geschossgenaue Abfragen unterstützt.

### Schulweiter Waschmaschinenstatus – Telegram Bot Erha (nicht verfügbar)

Basierend auf dieser Schnittstelle [Konano](https://github.com/Konano) wurde ein Telegram Bot namens Erha entwickelt.

Die Projektadresse lautet [hier](https://github.com/Konano/Tuna-Erha-Bot). Neben der Statusabfrage der Waschmaschine gibt es noch weitere Funktionen.

Auf den Bot kann über [t.me/erhabot](https://t.me/erhabot) zugegriffen werden.

### Wäscheüberwachung und Erinnerung – WeChat-Applet (nicht verfügbar)

![THU洗衣](pathname:///docs/thuservices/image/washer.jpg)

Mit derselben API wird nach der Aufmerksamkeit auf die Waschmaschine eine Erinnerung über das WeChat-Dienstkonto gesendet, wenn die Waschmaschine im Leerlauf ist.

[项目地址](https://github.com/zrt/thu-wash-notify)

## INFO GPA-Rechner

Ist es schwierig, den GPA mit einem Klick abzufragen, nachdem cksqs fehlgeschlagen ist, oder muss ich 10 Yuan ausgeben, um den GPA zu erhalten?
Diese Art von Notendurchschnitt, der nur 3 signifikante Ziffern beibehält, führt bei den Menschen aufgrund der Rundung von [-0,005,0,005] zu großer Unsicherheit;
Für Studierende, die ihren GPA manuell berechnen, wird die Schwierigkeit der manuellen Berechnung mit zunehmendem Studienjahr und zunehmender Anzahl der Kurse immer größer.
Sie müssen Ihren GPA nur einmal berechnen, was äußerst aufwändig ist.

Daher haben wir die automatische GPA-Berechnungsfunktion vorgeschlagen. Unter Berücksichtigung verschiedener Faktoren wie Bequemlichkeit und Benutzerfreundlichkeit, wie üblich, haben wir
Einführung eines Benutzerskripts zur Implementierung dieser kleinen Funktionalität.

Dieses Skript liest nur die Ergebnisse, die in der Schnittstelle „INFO-Alle Ergebnisse“ vorhanden sind (nur diejenigen, die in das System eingegeben, aber nicht veröffentlicht wurden).
Erhalten über cksqs oder kostenpflichtige Transkripte, nicht in die Berechnung einbezogen), verwenden Sie den neuen und den alten Algorithmus, um alle GPA und den erforderlichen GPA zu kombinieren
Berechnen Sie es (geben Sie das Doppelte direkt aus) und lassen Sie eine Benachrichtigungserinnerung anzeigen.

Dieses Skript befindet sich in `aux/Tsinghua GPA Calculator.user.js` und muss mit Oil Monkey installiert werden.

Oder über [这里](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator)
bekommen.

## GPA-Abfrage der Tsinghua-Universität

Eine Einführung finden Sie im vorherigen Abschnitt.

Berechnen Sie den GPA für jedes Semester und die erforderlichen Gesamtnoten auf der Seite „INFO-Alle Noten“. Die Skriptadresse lautet [hier](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询)

## Rain-Klassenzimmerhelfer

Dieses Benutzerskript soll Rain Classroom-Schülern eine bessere Benutzererfahrung auf Geräten mit großem Bildschirm (PC, Tablet) bieten.

Die Projektadresse lautet [hier](https://github.com/RainEggplant/rain-classroom-helper)

## Die integrierte automatische Videowiedergabe der Tsinghua-Universität

Das Skript befindet sich in [hier](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay) und kann das Kursvideo automatisch auf [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn) abspielen.

## Das Online-Video von Xuetang wird automatisch abgespielt

Überprüfen Sie oft, ob es aufgehört hat, wenn Sie im Hintergrund MOOCs studieren? Ein Skript spielt automatisch die nächste Lektion für Sie ab!

Das Skript befindet sich in [hier](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放)

Da dieses Skript eine lange Geschichte hat, lange Zeit nicht mehr gepflegt wurde und auch einige Fehler enthält, kann die langfristige Verfügbarkeit nicht garantiert werden. Wenn Sie Probleme finden oder den Code verbessern, können Sie sich an den ursprünglichen Autor @RikaSugisawa wenden

## Xuetang Online-Untertitel-Downloader

Blättern Sie immer noch die Videos einzeln durch und laden Sie Untertitel herunter, wenn Sie sich auf die Rezension vorbereiten? Dieses Skript hilft Ihnen!

Rabbit Hu-Version: Das Skript befindet sich unter [hier](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler) und die Projektadresse unter [hier](https://github.com/Rabbit-Hu/xuetangx-caption-crawler).

Roberts Holder-Version: Die Projektadresse lautet [hier](https://github.com/rcy17/MOOC_subtitle_spider)

Rynco Maekawa-Version: Die Projektadresse lautet [hier](https://github.com/lynzrand/xuetangx_sub)

c7w-Version: Die Projektadresse lautet [hier](https://github.com/c7w/TsinghuaMoocCaptionCrawler)

## Rain Classroom-Kursunterlagen-Downloader

Derzeit ist es nur auf das „Yangtze River Rain Classroom“ anwendbar, kann aber nach Modifikation auch im Lotus Pond Rain Classroom verwendet werden.

Die Projektadresse lautet [hier](https://github.com/ShevonKuan/yuektang_ppt2pdf).

## Tsinghua lehrt Nachschlagewerk-Crawling

Die Schulbibliothek hat viele [图书资源](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7) gekauft. Es wird empfohlen, zuerst [清华大学教参服务平台](http://reserves.lib.tsinghua.edu.cn/) und [文泉学堂-清华大学出版社电子图书数据库](https://lib-tsinghua.wqxuetang.com/) zu verwenden, um chinesische Lehrmaterialien zu finden.

### Plattform für Lehrreferenzdienste der Tsinghua-Universität

Die Lehrreferenzdienstplattform der Tsinghua-Universität bietet gescannte elektronische Versionen von Lehrbüchern und Lehrreferenzmaterialien im Rahmen des Urheberrechts (Online-Browsing). Wenn Sie Lehrmaterialien benötigen, die nicht auf der Plattform verfügbar sind, können Sie sich zum Scannen direkt per E-Mail oder Telefon an [相关部门](https://lib.tsinghua.edu.cn/info/1184/3617.htm) wenden.

Es wird empfohlen, zum Herunterladen [reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader) zu verwenden.

Die Download-Funktion ist auch in [thu-info-lib](https://github.com/thu-info-community/thu-info-lib) implementiert.

Die folgenden beiden Elemente sind aufgrund von API-Änderungen nicht verfügbar.

Aus dem Originaltext zitiert: Die jüngste Epidemie war schwerwiegend und es war schwierig, Lehrbücher zu kaufen. Um das Online-Lernen für alle zu erleichtern, habe ich ein Python-Skript zum Crawlen von Tsinghua-Lehrmaterialien geschrieben.

Die Projektadresse lautet [hier](https://github.com/lflame/TsinghuaBookCrawler)

Den Originaltext zitieren: Laden Sie automatisch die Originalbilder jeder Seite des Buches herunter.

Die Projektadresse lautet [hier](https://github.com/i207M/reserves-lib-tsinghua-downloader)

### Wenquan-Akademie

Wenquan Xuetang wird für die Suche nach Büchern von Tsinghua University Press verwendet. Anti-Crawling ist streng. Zum Herunterladen können Sie das Skript [这个](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88) verwenden.

## Teilen des Kursortes

Derzeit verfügbar: [courseX 课程信息共享计划](https://tsinghua.app/courses), verwaltet vom learnX-Entwicklungsteam

Die folgenden Projekte haben derzeit die Wartung und den Betrieb eingestellt:

In [https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/) lautet die Projektadresse [hier](https://github.com/RikaKagurasaka/where-my-course-gone-backend).

## Kennzeichen (für Bahntickets)

Unter [此网站](https://tuixue.online/zcimage/) können Sie auch außerhalb des Campus problemlos das entsprechende Registrierungszeichen erhalten.

## Anfrage zur Stromrechnung im Wohnheim

Es gibt [实现](https://github.com/WhymustIhaveaname/TsinghuaElectric) über Headless Chrome

Es gibt auch eine andere Implementierung, siehe `TsinghuaElectricityBillChecker.py` im Aux-Verzeichnis. Der Benutzer muss einige eingebettete Parameter ändern.

Es gibt auch eine andere Implementierung, siehe `TsinghuaBills.py` im aux-Verzeichnis.

Mithilfe dieser Skripte können Daten in Grafana eingegeben werden, um die Überwachung und Alarmierung von Stromrechnungen zu ermöglichen.

## Abfrage der Wasser- und Stromrechnung für das Schlafzimmer

Siehe `TsinghuaBills.py` im Aux-Verzeichnis.

Hinweis: Dieses Skript kann den Wasserrechnungssaldo des Wohnheims abfragen (nicht die Campus-Karten-Geldbörse!) und ist hauptsächlich auf das W-Gebäude und das Shuangqing-Apartment anwendbar. Spezifischer Anwendungsbereich: Shuangqing Apartment, Bauhinia Student Apartment Building Nr. 14, Bauhinia Student Apartment Building Nr. 15, Bauhinia Student Apartment Building Nr. 16, Bauhinia Student Apartment Building Nr. 17, Gebäude 17 und Gebäude 18.

Dieses Skript kann Daten in Grafana einspeisen, um die Überwachung und Alarmierung von Stromrechnungen zu implementieren.

## Klingelton für die Vorlesung der Tsinghua-Universität

Zu Hause herrscht keine Atmosphäre zum Lernen und Sie vermissen das Schulzimmer? Die Tsinghua-Klingelton-Software hilft Ihnen!

Derzeit gibt es eine macOS-Version, Projekt [在此](https://github.com/LyricZhao/THU-Bell)

## Wählen Sie zufällig Restaurants auf dem Campus aus – WeChat-Miniprogramm

Es gibt zu viele Kantinen und Sie wissen nicht, wo Sie essen sollen? Zufallszahlengenerator hilft!

Projekt in [hier](https://github.com/SuXY15/RandomCanteen)

Mini-Programm-QR-Code

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## Wählen Sie zufällig Restaurants auf dem Campus aus – Telegram Bot

Das Gleiche wie oben.

Darüber hinaus bietet Telegram Bot auch interaktive Funktionen wie das Online-Trinken von Milchtee, das Online-Trinken von Cappuccino und die Online-Produktion von Getränken.

Die Projektadresse lautet [hier](https://github.com/Lancern/thufood-tgbot)

Die BOT-Adresse lautet https://t.me/thufood_bot

Ähnliche sind https://t.me/thufoodbot

## Kursführer für Informatik der Tsinghua-Universität

[GitHub地址](https://github.com/PKUanonym/REKCARC-TSC-UHT) und [校内地址](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## Kursführer des Tsinghua Institute of Software Engineering

[GitHub地址](https://github.com/SerCharles/THSS-CRACKER)

## Kursführer-Sharing-Plan der Huaqing-Universität

Der Kursleitfaden-Sharing-Plan für alle Schüler der Schule zielt darauf ab, Informationsasymmetrien bei den Lernressourcen zu beseitigen und den offenen Austausch von Lernressourcen und -materialien zu fördern. Projekt [在此](https://closed.social/pastExam/). Im Vergleich zu GitHub sind Freigabe- und Downloadvorgänge für Studenten, die mit Technologie nicht vertraut sind, benutzerfreundlicher. Willkommen zum Teilen!

![华清大学课程攻略共享计划](pathname:///docs/thuservices/image/course_strategy.jpg)

## Plattform zur Bewertung der Campus-Lehre

Colleguide: Eine Plattform zur Bewertung von Schulen, Professoren und Kursen

https://www.colleguide.com/

## Fakten zum Fachbereich Informatik

https://github.com/jiegec/dcst-facts

## NFSiehe Campuskarte

https://github.com/nfcim/nfsee

## Plan zum Austausch von Kursinformationen

https://tsinghua.app/courses

## Materialien für die Postgraduierten-Aufnahmeprüfung der Tsinghua-Universität, Hauptfach Informatik 912

https://github.com/Wsky51/THU-CS912-kaoyan

## Tsinghua Punktekratzer

https://github.com/summivox/thu-scratch

* Installieren Sie das Chrome-Plugin oder Userscript
* Anmeldeinformationen
* Der Ort, an dem Sie Ihre Ergebnisse sehen können, wurde gesperrt~
* Ich fühle „ドキドキ“ in meinem Herzen

## Thuhole-Erinnerungen

Alle Inhalte stammen aus Boutique-Höhlen und persönlichen Sammlungen.

https://github.com/pb0316/thuhole_memories

## Thuhole-Datenbanksicherung

Nach dem Waschen der Daten werden die meisten bedeutungsvollen Baumlücken, die keinen Einfluss auf den Datenschutz haben, in diesem GitHub-Repository gesichert.

https://github.com/thuhole/database_backup

## Kompetenzleitfaden der Student Science Association der Informatikabteilung

Dieses Kompetenzleitfadendokument wird von der Informatikstudentenvereinigung der Tsinghua-Universität verwaltet. Ziel ist es, Informatik- und Informatikstudierenden die schnelle Aneignung bestimmter spezifischer Fähigkeiten zu ermöglichen. Indem Möglichkeiten aufgezeigt werden, wie diese Fähigkeiten in Kursen, wissenschaftlicher Forschung und Praktika eingesetzt werden können, sparen Studierende Zeit beim Sammeln relevanter Informationen und verbessern die Fähigkeit der Studierenden, neue Fähigkeiten zu erlernen.

https://docs.net9.org/

## System-Crawler für soziale Praktiken für Absolventen der Tsinghua-Universität

Crawlen Sie strukturierte Daten von https://thshijian.tsinghua.edu.cn (Tsinghua University Graduate Social Practice System). Die Nutzung erfolgt auf eigene Gefahr.

https://github.com/Harry-Chen/thshijian-crawler
