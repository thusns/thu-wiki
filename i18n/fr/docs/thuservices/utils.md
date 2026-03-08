# quelques scripts et outils

## Résumé des outils d'authentification du réseau du campus

Dans l'esprit d'utiliser des roues plutôt que de fabriquer des roues, des générations de Tsinghua ont lutté avec intelligence et courage contre le réseau du campus et développé d'innombrables outils d'authentification. Nous les listons ici autant que possible pour que chacun puisse choisir en fonction de ses préférences.

| Liens du projet | Plateformes prises en charge | Langages d'implémentation | Actuellement disponible (maintenu) | Caractéristiques |
| --- | --- | --- | --- | --- |
| [Tunet-2018 (official)](https://its.tsinghua.edu.cn/xywl/xywsyzn/yxw_hkhd_/khdxz.htm) | Interface graphique Windows, CLI Linux | Inconnu | Disponible | Pas d'enquête |
| [GoAuthing](https://github.com/z4yx/GoAuthing/) | Linux-CLI (x86\_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI (Intel, Apple) | Aller | Disponible | Plateforme complète et architecture complète, accès et accès, v4 et v6, service systemd, TUNA Fournit [镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/) pour télécharger des outils d'authentification lorsqu'il n'est pas authentifié et fournit des bibliothèques liées à l'authentification |
| [tunet-python](https://github.com/yuantailing/tunet-python) | Plateforme prenant en charge Python, CLI | Python | Disponible | v4 et v6, surveillance des admissions et des sorties, du trafic et de l'état des admissions |
| [tunet-c](https://github.com/robertying/tunet-c) | OpenWRT, Linux, macOS ; CLI | C | Disponible | Fournit des bibliothèques liées à l'authentification, les fichiers binaires sont petits |
| [tunet-rust](https://github.com/Berrysoft/tunet-rust) | Windows, Mac OS, Linux, Android, iOS | Rouille, Fléchette | Disponible | Surveillance du trafic et de l'équilibre, entrée et sortie, v4 et v6 ; fournit des bibliothèques liées à l'authentification ; fournit CLI, CUI, GUI, service Windows, service systemd, service launchd sur le bureau ; fournit une interface graphique sur le terminal mobile |
| [TsinghuaTunet](https://github.com/WhymustIhaveaname/TsinghuaTunet) | Plateformes prenant en charge Python, CLI | Python | Disponible sur des sous-réseaux spécifiques | Pas d'enquête |
| [auth-tsinghua](https://github.com/jiegec/auth-tsinghua) | Pris en charge par les plateformes node.js, CLI | Javascript | N'est plus entretenu | Redirigé vers GoAuthing |
| [TsinghuaNet](https://github.com/Berrysoft/TsinghuaNet) | Windows, Mac OS, Linux, UWP, Android, iOS | C# | N'est plus entretenu | Redirigé vers tunet-rust |
| [tunet-cli](https://github.com/syimyuzya/tunet-cli) | Plateforme prenant en charge Python, CLI | Python | N'est plus maintenu, dernier commit en 2017 | Pas d'enquête |
| [Tsinghua-Online](https://github.com/xxr3376/Tsinghua-Online) | Plug-in de navigateur, dans [Chrome 商店](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo) | Javascript | N'est plus maintenu, dernier commit en 2013 | Plug-in du navigateur |
| [THUNetwork](https://github.com/zhaofeng-shu33/THUNetwork) | Prend en charge la plate-forme Python, CLI | Python | N'est plus entretenu | Le mot de passe est transmis dans la ligne de commande en texte clair, ce qui est relativement dangereux |

## INFO/Application d'école en ligne/Plug-in

Dans l'esprit d'utiliser des roues plutôt que de fabriquer des roues, des générations de Tsinghua ont lutté avec intelligence et courage avec l'INFO et les écoles en ligne, et ont développé d'innombrables outils faciles à utiliser. Nous faisons de notre mieux pour les lister ici afin que chacun puisse choisir en fonction de ses préférences.

| Liens du projet | Plateformes prises en charge | Langages d'implémentation | Actuellement disponible (maintenu) | Caractéristiques |
| --- | --- | --- | --- | --- |
| [INFO](http://info.tsinghua.edu.cn/) | Site Internet | Pas d'enquête | Disponible | Page Web officielle |
| [LEARN](http://learn.tsinghua.edu.cn/) | Site Internet | Pas d'enquête | Disponible | Page Web officielle |
| [Learn-Project](https://github.com/xxr3376/Learn-Project) | Plugins de navigateur | Tapuscrit | Disponible | Projets scolaires en ligne classés par chronologie et catégorie, dans les magasins de plug-ins Google, Firefox et Edge, front-end moderne |
| [LearnX](https://github.com/robertying/learnX) | iOS, système d'exploitation iPad, macOS, Android | Réagir | Disponible | Licence open source du projet, voir l'introduction du projet pour le reste |
| [THUInfo](https://github.com/UNIDY2002/THUInfo) | APPLICATION mobile | Tapuscrit | Disponible | Avec la distribution Apple App Store, y compris la maison, le département étudiant (salle de classe), les projets de bibliothèque, prend en charge les trous d'arbre |
| ÀTsinghua | APPLICATION mobile | Inconnu | Inconnu | Distribué par l'App Store d'Apple, le reste n'a pas fait l'objet d'une enquête, c'est une œuvre pour la fête du campus d'un certain laboratoire |
| [learn2018-autodown](https://github.com/Trinkle23897/learn2018-autodown) | Plateforme prenant en charge Python | Python | Disponible | Informations complètes/téléchargement de fichiers (voir l'introduction du projet pour d'autres détails) |
| [THUCourseHelper](https://github.com/Starrah/THUCourseHelper) | Android | Kotlin | Inconnu | Calendrier des cours |
| [thu-learn-downloader](https://github.com/liblaf/thu-learn-downloader) | Linux, Mac, Windows | Python | Disponible | Fichiers de cours en classe en ligne et téléchargements de devoirs avec une belle interface (voir les documents du projet pour plus de détails) |

## Indicateur de conflit de sélection de cours

Soumettez-vous toujours vos sélections de cours avec des attentes élevées alors que vous vous précipitez pour suivre des cours, mais vous constatez qu'il y a un conflit d'horaire et vous avez manqué la sélection de cours ?
Vous sentez-vous toujours lent lorsque vous vous souvenez de l'heure du cours sélectionnée et que vous consultez la liste de départ du cours ?
Ce script vous aide !

Ce script détecte les cours que vous avez sélectionnés et marque automatiquement en rouge les cours présentant des horaires conflictuels dans les cours candidats, vous permettant ainsi de parcourir
La vitesse de millions de cours est comme un miracle. Lorsque la souris passe sur une heure marquée en rouge, tous les parcours en conflit avec celle-ci seront affichés.

Il convient de noter que les cours semestriels ne sont pas encore entièrement pris en charge, ce qui signifie que de faux conflits d'horaires peuvent survenir ;
Dans le même temps, il ne peut pas fonctionner sur l'interface d'informations d'ouverture de cours et de requête de sélection de cours, mais fonctionne uniquement sur l'interface d'opération de sélection de cours.

Ce script se trouve dans aux/TsinghuaCourseConflictMarker.user.js et doit être installé à l'aide de Oil Monkey.

Ou vous pouvez y accéder en visitant [这里](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker)
Venez récupérer le script en un clic.

La prise en charge Webvpn a maintenant été ajoutée.

Merci à [CircuitCoder](https://github.com/CircuitCoder) pour les conseils techniques
Merci à [SharzyL](https://github.com/SharzyL) pour les suggestions et le DEBUG

## Note restante du contenu du cours pour la sélection du cours

Vous ne savez pas quel type de bénévoles utiliser pour suivre des cours ?
Ce script vous aide !

Ce script colore le nombre de candidats. La dernière couleur verte est la meilleure candidate pour prendre un cours !

Le script est encore en développement et la prise en charge des files d'attente sera bientôt disponible !

Visitez [这里](https://greasyfork.org/en/scripts/456440-colorful-course) pour obtenir le script

## INFO Message télégramme scolaire en ligne Push

Voir [thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) et
[thu-info-forwarder](https://github.com/Konano/thu-info-forwarder).

THU INFO CHANNEL existe déjà sur Telegram. Puisqu'il s'agit d'une chaîne privée, vous devez transmettre [邮件](mailto:i@zenithal.me)
Obtenez le lien d'invitation.

## Statut des machines à laver à l'échelle de l'école

### Statut de la machine à laver à l'échelle de l'école - outil de requête de machine à laver (avec interface)

https://washer.sdevs.top/

L'interface est simple et facile à utiliser, les données ont été organisées, les immeubles d'habitation interrogés peuvent être mémorisés et un canal de feedback est fourni.

### Demande de disponibilité de la buanderie de l’Université Tsinghua

https://washer.voltair.top/

### Statut de la machine à laver à l'échelle de l'école - applet officiel

Vous pouvez également vérifier l'état du lave-linge dans l'applet du fabricant du lave-linge.

L'entrée se fait par le bouton « Machine à laver à proximité » en bas de la page d'accueil.

![“自助智能校园”小程序码](image/washer_official.jpg)

### Statut des machines à laver à l'échelle de l'école - Interface API (version texte, obsolète)

Travaillez-vous toujours dur pour vous procurer une machine à laver ? Avez-vous encore du mal à monter et descendre pour constater qu'il n'y a pas de machine à laver ? Ce service
Vous aider à détecter l'état de la machine à laver, et connaître les tendances des machines à laver dans toute l'école en un clic sans quitter la maison !

Le code source se trouve dans le répertoire aux du dépôt. Actuellement déployé sur les travailleurs cf à [https://washer.thu.services](https://washer.thu.services)

Pour implémenter la recherche, nous devons ajouter des paramètres. Actuellement, il accepte trois paramètres, « s », « j » et « p ». "s" est la recherche
Pour les immeubles d'habitation, les chaînes généralement acceptées sont « Bâtiment x, Bauhinia » ou « Bâtiment x, Quartier Sud ». Par exemple

```
https://washer.thu.services/?s=紫荆1号楼
```

Il renverra l'état de fonctionnement de la machine à laver dans le « Bâtiment 1 Zijing ». Par défaut, ce paramètre renvoie
L'état de fonctionnement de la machine à laver dans le "Zijing Building 2".

Pour le paramètre "j", on vérifie uniquement si "j" existe. Si elles existent, les données json d'origine sont renvoyées.
Cet élément est destiné aux développeurs. Les paramètres « s » et « j » peuvent être utilisés simultanément.

Pour le paramètre "p", on vérifie uniquement si "p" existe. S'il existe, des données texte/plaines sont renvoyées.
Les paramètres « s » et « p » peuvent être utilisés simultanément. Lorsque « j » et « p » apparaissent en même temps, « j » a une priorité plus élevée.

### Statut de la machine à laver à l'échelle de l'école - Raccourci iOS (non disponible)

Les utilisateurs disposant d'iOS 12 ou supérieur peuvent installer le raccourci via ce [链接](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0) pour vérifier rapidement la machine à laver inactive. Actuellement, seules les requêtes précises aux étages sont prises en charge.

### Statut de la machine à laver à l'échelle de l'école - Telegram Bot Erha (indisponible)

Sur la base de cette interface [Konano](https://github.com/Konano), un Telegram Bot nommé Erha a été développé.

L'adresse du projet est [此](https://github.com/Konano/Tuna-Erha-Bot). En plus de la fonction de requête sur l'état de la machine à laver, il existe d'autres fonctions.

Le bot est accessible via [t.me/erhabot](https://t.me/erhabot).

### Surveillance et rappel du linge - Applet WeChat (non disponible)

![THU洗衣](image/washer.jpg)

En utilisant la même API, après avoir prêté attention à la machine à laver, lorsque la machine à laver est inactive, un rappel sera envoyé via le compte de service WeChat.

[项目地址](https://github.com/zrt/thu-wash-notify)

## INFO Calculateur GPA

Est-il difficile d'interroger GPA en un clic après l'échec de cksqs, ou dois-je dépenser 10 yuans pour obtenir GPA ?
Ce type de GPA, qui ne retient que 3 chiffres significatifs, fait ressentir une grande incertitude en raison de l'arrondi de [-0,005,0,005) ;
Pour les étudiants qui calculent manuellement leur GPA, à mesure que l’année universitaire augmente et que le nombre de cours augmente, la difficulté du calcul manuel devient de plus en plus grande.
Vous n’avez besoin de calculer votre GPA qu’une seule fois, ce qui est extrêmement fastidieux.

Par conséquent, nous avons proposé la fonction de calcul automatique du GPA. Compte tenu de divers facteurs tels que la commodité et la facilité d'utilisation, comme d'habitude, nous
Introduction du script utilisateur pour implémenter cette petite fonctionnalité.

Ce script lira uniquement les résultats qui existent dans l'interface "INFO-Tous les résultats" (ceux qui ont été saisis dans le système mais qui n'ont pas été publiés ne peuvent que
Obtenu via cksqs ou relevés de notes payants, non inclus dans le calcul), utilisez les nouveaux et anciens algorithmes pour combiner tous les GPA et le GPA requis
Calculez-le (sortie double directement) et affichez un rappel de notification.

Ce script se trouve dans `aux/Tsinghua GPA Calculator.user.js` et doit être installé à l'aide d'Oil Monkey.

Ou via [这里](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator)
obtenir.

## Requête GPA de l'Université Tsinghua

Reportez-vous à la section précédente pour l'introduction.

Calculez la moyenne cumulative pour chaque semestre et le total des notes requises et requises sur la page « INFO-Toutes les notes ». L'adresse du script est [此](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询)

## Aide en classe sous la pluie

Ce script utilisateur est conçu pour offrir une meilleure expérience utilisateur aux étudiants de Rain Classroom sur des appareils à grand écran (PC, tablette).

L'adresse du projet est [此](https://github.com/RainEggplant/rain-classroom-helper)

## Lecture automatique de vidéos sur la plate-forme intégrée de l'Université Tsinghua

Le script se trouve dans [此](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay) et peut lire automatiquement la vidéo du cours sur [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn).

## La vidéo en ligne Xuetang est lue automatiquement

Vérifiez-vous souvent si cela s’est arrêté lorsque vous étudiez des MOOC en arrière-plan ? Un script jouera automatiquement la prochaine leçon pour vous !

Le script est dans [此](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放)

Étant donné que ce script a une longue histoire, n'a pas été maintenu depuis longtemps et contient également quelques bugs, sa disponibilité à long terme ne peut être garantie. Lorsque vous rencontrez des problèmes ou améliorez le code, vous pouvez contacter l'auteur original @RikaSugisawa

## Téléchargeur de sous-titres en ligne Xuetang

Êtes-vous toujours en train de feuilleter les vidéos une par une et de télécharger des sous-titres lorsque vous vous préparez à les visionner ? Ce script vous aide !

Version Rabbit Hu : le script est à [此](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler) et l'adresse du projet est à [此](https://github.com/Rabbit-Hu/xuetangx-caption-crawler).

Version Roberts Holder : L'adresse du projet est [此](https://github.com/rcy17/MOOC_subtitle_spider)

Version Rynco Maekawa : L'adresse du projet est [此](https://github.com/lynzrand/xuetangx_sub)

Version c7w : L'adresse du projet est [此](https://github.com/c7w/TsinghuaMoocCaptionCrawler)

## Téléchargeur de didacticiels Rain Classroom

Actuellement, il n'est applicable qu'à la « Classe de pluie du fleuve Yangtze », mais il peut être utilisé dans la classe de pluie de Lotus Pond après modification.

L'adresse du projet est [此](https://github.com/ShevonKuan/yuektang_ppt2pdf).

## Livre de référence pédagogique Tsinghua rampant

La bibliothèque scolaire a acheté un lot de [图书资源](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7). Il est recommandé d'utiliser d'abord [清华大学教参服务平台](http://reserves.lib.tsinghua.edu.cn/) et [文泉学堂-清华大学出版社电子图书数据库](https://lib-tsinghua.wqxuetang.com/) pour trouver du matériel pédagogique en chinois.

### Plateforme de services de référence pédagogique de l’Université Tsinghua

La plateforme de services de référence pédagogique de l'Université Tsinghua fournit des versions électroniques numérisées des manuels de cours et des documents de référence pédagogiques dans le cadre du droit d'auteur (navigation en ligne). Si vous avez besoin de matériel pédagogique qui n'est pas disponible sur la plateforme, vous pouvez contacter [相关部门](https://lib.tsinghua.edu.cn/info/1184/3617.htm) directement par email ou par téléphone pour le scanner.

Il est recommandé d'utiliser [reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader) pour le téléchargement.

La fonction de téléchargement est également implémentée dans [thu-info-lib](https://github.com/thu-info-community/thu-info-lib).

Les deux éléments suivants ne sont pas disponibles en raison de modifications de l'API.

Cité du texte original : La récente épidémie a été grave et il a été difficile d'acheter des manuels. Afin de faciliter l'apprentissage en ligne de chacun, j'ai écrit un script python pour explorer le matériel pédagogique Tsinghua.

L'adresse du projet est [此](https://github.com/lflame/TsinghuaBookCrawler)

Citer le texte original : Téléchargez automatiquement les images originales de chaque page du livre.

L'adresse du projet est [此](https://github.com/i207M/reserves-lib-tsinghua-downloader)

### Académie Wenquan

Wenquan Xuetang est utilisé pour rechercher des livres de Tsinghua University Press. L'anti-exploration est strict. Vous pouvez utiliser le script [这个](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88) pour télécharger.

## Partage de localisation de cours

Actuellement disponible : [courseX 课程信息共享计划](https://tsinghua.app/courses) maintenu par l'équipe de développement learnX

Les projets suivants ont actuellement cessé leur maintenance et leur exploitation :

Dans [https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/), son adresse de projet est [此](https://github.com/RikaKagurasaka/where-my-course-gone-backend).

## Marque d'immatriculation (pour les billets de train)

Référez-vous à [此网站](https://tuixue.online/zcimage/) pour obtenir facilement la marque d'enregistrement appropriée lorsque vous êtes hors campus.

## Demande de facture d'électricité dans un dortoir

Il y a [实现](https://github.com/WhymustIhaveaname/TsinghuaElectric) via Chrome sans tête

Il existe également une autre implémentation, reportez-vous à `TsinghuaElectricityBillChecker.py` dans le répertoire aux, l'utilisateur doit modifier certains paramètres intégrés.

Il existe également une autre implémentation, voir `TsinghuaBills.py` dans le répertoire aux.

Grâce à ces scripts, les données peuvent être versées dans grafana pour réaliser la surveillance et l'alarme des factures d'électricité.

## Demande de facture d'eau et d'électricité dans la chambre

Voir `TsinghuaBills.py` dans le répertoire aux.

Remarque : ce script peut interroger le solde de la facture d'eau du dortoir (pas le portefeuille de la carte du campus !) et s'applique principalement au bâtiment W et à l'appartement Shuangqing. Champ d'application spécifique : appartement Shuangqing, immeuble d'appartements étudiants Bauhinia n° 14, immeuble d'appartements étudiants Bauhinia n° 15, immeuble d'appartements étudiants Bauhinia n° 16, immeuble d'appartements étudiants Bauhinia n° 17, bâtiment 17 et bâtiment 18.

Ce script peut verser des données dans grafana pour mettre en œuvre la surveillance et l'alarme des factures de services publics.

## Sonnerie de cours de l'Université Tsinghua

Il n'y a pas d'ambiance pour étudier à la maison et la salle d'étude de l'école vous manque ? Le logiciel de sonnerie Tsinghua vous aide !

Il existe actuellement une version macOS, projet [在此](https://github.com/LyricZhao/THU-Bell)

## Sélection aléatoire de restaurants sur le campus – mini-programme WeChat

Il y a trop de cantines et vous ne savez pas où manger ? Générateur de nombres aléatoires pour vous aider !

Projet dans [此](https://github.com/SuXY15/RandomCanteen)

Code QR du mini-programme

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## Sélectionnez au hasard des restaurants sur le campus - Telegram Bot

Comme ci-dessus.

En outre, Telegram Bot propose également des fonctions interactives telles que la consommation de thé au lait en ligne, la consommation de cappuccino en ligne et la production de boissons en ligne.

L'adresse du projet est [此](https://github.com/Lancern/thufood-tgbot)

L'adresse du BOT est https://t.me/thufood_bot

Les similaires sont https://t.me/thufoodbot

## Guide des cours d'informatique de l'Université Tsinghua

[GitHub地址](https://github.com/PKUanonym/REKCARC-TSC-UHT) et [校内地址](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## Guide de cours de l'Institut de génie logiciel Tsinghua

[GitHub地址](https://github.com/SerCharles/THSS-CRACKER)

## Plan de partage du guide de cours de l'Université de Huaqing

Le plan de partage du guide de cours pour tous les élèves de l'école vise à éliminer l'asymétrie de l'information dans les ressources d'apprentissage et à promouvoir le partage ouvert des ressources et du matériel d'apprentissage. Projet [在此](https://closed.social/pastExam/). Par rapport à GitHub, les opérations de partage et de téléchargement sont plus conviviales pour les étudiants qui ne sont pas familiers avec la technologie. Bienvenue à partager !

![华清大学课程攻略共享计划](image/course_strategy.jpg)

## Plateforme d'évaluation de l'enseignement sur le campus

Colleguide : une plateforme pour évaluer les écoles, les professeurs et les cours

https://www.colleguide.com/

## Faits sur le Département d'informatique

https://github.com/jiegec/dcst-facts

## Carte campus NFSee

https://github.com/nfcim/nfsee

## Plan de partage d'informations sur les cours

https://tsinghua.app/courses

## Matériel d'examen d'entrée de troisième cycle pour la majeure en informatique de l'Université Tsinghua 912

https://github.com/Wsky51/THU-CS912-kaoyan

## Grattoir de score Tsinghua

https://github.com/summivox/thu-scratch

* Installez le plugin Chrome ou Userscript
* Informations de connexion
* L'endroit où vous pouvez voir vos résultats a été bloqué~
* Je ressens "ドキドキ" dans mon cœur

## des souvenirs

Tout le contenu provient de grottes-boutiques et de collections personnelles.

https://github.com/pb0316/thuhole_memories

## sauvegarde de la base de données Thhuhole

Après avoir lavé les données, la plupart des trous d'arborescence significatifs qui n'impliquent pas la confidentialité personnelle sont sauvegardés dans ce référentiel GitHub.

https://github.com/thuhole/database_backup

## Document d'orientation sur les compétences de l'Association scientifique des étudiants du département informatique

Ce document d'orientation sur les compétences est maintenu par l'Association des étudiants en informatique de l'Université Tsinghua. L’objectif est de permettre aux étudiants en informatique et en informatique de maîtriser rapidement certaines compétences spécifiques. En donnant des moyens d'utiliser ces compétences dans les cours, la recherche scientifique et les stages, il permet aux étudiants de gagner du temps dans la collecte d'informations pertinentes et améliore leur capacité à acquérir de nouvelles compétences.

https://docs.net9.org/

## Robot d'exploration du système de pratique sociale des étudiants diplômés de l'Université Tsinghua

Analysez les données structurées de https://thshijian.tsinghua.edu.cn (Système de pratique sociale des diplômés de l'Université Tsinghua). Utilisez à vos propres risques.

https://github.com/Harry-Chen/thshijian-crawler
