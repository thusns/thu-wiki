---

---
# algunos scripts y herramientas

## Resumen de las herramientas de autenticación de la red del campus

Con el espíritu de utilizar ruedas en lugar de fabricar ruedas, generaciones de personas de Tsinghua han luchado con ingenio y coraje con la red del campus y han desarrollado innumerables herramientas de autenticación. Los enumeramos aquí tanto como sea posible para que cada uno elija según sus preferencias.

| Enlaces del proyecto | Plataformas compatibles | Idiomas de implementación | Actualmente disponible (mantenido) | Características |
| --- | --- | --- | --- | --- |
| __JUE_WIKI_TOKEN_0__ | GUI de Windows, CLI de Linux | Desconocido | Disponible | No investigado |
| __JUE_WIKI_TOKEN_0__ | Linux-CLI (x86\_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI (Intel, Apple) | Ir | Disponible | Plataforma completa y arquitectura completa, acceso y acceso, v4 y v6, servicio systemd, TUNA Proporciona [镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/) para descargar herramientas de autenticación cuando no está autenticado y proporciona bibliotecas relacionadas con la autenticación |
| __JUE_WIKI_TOKEN_0__ | Plataforma que soporta python, CLI | Pitón | Disponible | v4 y v6, admisión y salida, monitoreo de estado de tráfico y admisión |
| __JUE_WIKI_TOKEN_0__ | OpenWRT, Linux, MacOS; CLI | C | Disponible | Proporciona bibliotecas relacionadas con la autenticación, los archivos binarios son pequeños |
| __JUE_WIKI_TOKEN_0__ | Windows, Mac OS, Linux, Android, iOS | Óxido, dardo | Disponible | Monitoreo de tránsito y saldo, admisión y salida, v4 y v6; proporciona bibliotecas relacionadas con la autenticación; proporciona CLI, CUI, GUI, servicio de Windows, servicio systemd, servicio launchd en el escritorio; proporciona GUI en el terminal móvil |
| __JUE_WIKI_TOKEN_0__ | Plataformas que soportan python, CLI | Pitón | Disponible en subredes específicas | No investigado |
| __JUE_WIKI_TOKEN_0__ | Compatible con plataformas node.js, CLI | JavaScript | Ya no se mantiene | Redirigido a GoAuthing |
| __JUE_WIKI_TOKEN_0__ | Windows, Mac OS, Linux, UWP, Android, iOS | C# | Ya no se mantiene | Redirigido a tunet-rust |
| __JUE_WIKI_TOKEN_0__ | Plataforma que soporta python, CLI | Pitón | Ya no se mantiene, última confirmación en 2017 | No investigado |
| __JUE_WIKI_TOKEN_0__ | Complemento del navegador, en [Chrome 商店](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo) | JavaScript | Ya no se mantiene, última confirmación en 2013 | Complemento del navegador |
| __JUE_WIKI_TOKEN_0__ | Admite plataforma Python, CLI | Pitón | Ya no se mantiene | La contraseña se pasa a la línea de comando en texto claro, lo cual es relativamente inseguro |

## INFORMACIÓN/APLICACIÓN de escuela en línea/Plug-in

Con el espíritu de utilizar ruedas en lugar de fabricar ruedas, generaciones de gente de Tsinghua han luchado con ingenio y coraje con INFO y las escuelas en línea, y han desarrollado innumerables herramientas fáciles de usar. Hacemos todo lo posible para enumerarlos aquí para que todos puedan elegir según sus preferencias.

| Enlaces del proyecto | Plataformas compatibles | Idiomas de implementación | Actualmente disponible (mantenido) | Características |
| --- | --- | --- | --- | --- |
| __JUE_WIKI_TOKEN_0__ | Página web | No investigado | Disponible | Página web oficial |
| __JUE_WIKI_TOKEN_0__ | Página web | No investigado | Disponible | Página web oficial |
| __JUE_WIKI_TOKEN_0__ | Complementos del navegador | Texto mecanografiado | Disponible | Proyectos escolares en línea ordenados por cronograma y categoría, en las tiendas de complementos de Google, Firefox y Edge, interfaz moderna |
| __JUE_WIKI_TOKEN_0__ | iOS, iPad OS, macOS, Android | Reaccionar | Disponible | Licencia de código abierto del proyecto, consulte la introducción del proyecto para el resto |
| __JUE_WIKI_TOKEN_0__ | APLICACIÓN Móvil | Texto mecanografiado | Disponible | Con distribución de Apple App Store, incluido el hogar, el departamento de estudiantes (aula), proyectos de biblioteca, soportes para huecos de árboles |
| En Tsinghua | APLICACIÓN Móvil | Desconocido | Desconocido | Distribuida por la App Store de Apple, el resto no ha sido investigado, es un trabajo para la celebración del campus de cierto laboratorio |
| __JUE_WIKI_TOKEN_0__ | Plataforma que soporta Python | Pitón | Disponible | Verdadera información completa/descarga de archivos (consulte la introducción del proyecto para obtener más detalles) |
| __JUE_WIKI_TOKEN_0__ | Androide | Kotlin | Desconocido | Horario del curso |
| __JUE_WIKI_TOKEN_0__ | Linux, Mac, Windows | Pitón | Disponible | Archivos de cursos presenciales en línea y descargas de tareas con una hermosa interfaz (consulte los documentos del proyecto para obtener más detalles) |

## Bandera de conflicto de selección de cursos

¿Sigues enviando tus selecciones de cursos con grandes expectativas cuando te apresuras a tomar clases, pero descubres que hay un conflicto de tiempo y te perdiste la selección de cursos?
¿Todavía te sientes lento al recordar el horario del curso seleccionado y consultar la lista de inicio del curso?
¡Este script te ayuda!

Este script detecta los cursos que ha seleccionado y automáticamente marca en rojo los cursos con horarios conflictivos en los cursos candidatos, lo que le permite navegar
La velocidad de millones de cursos es como un milagro. Cuando se pasa el mouse sobre un tiempo marcado en rojo, se mostrarán todos los cursos que entren en conflicto con él.

Cabe señalar que las clases de medio semestre aún no son totalmente compatibles, lo que significa que pueden ocurrir conflictos de horarios falsos;
Al mismo tiempo, no puede funcionar en la interfaz de consulta de información de apertura de cursos y selección de cursos, sino que solo funciona en la interfaz de operación de selección de cursos.

Este script está en aux/TsinghuaCourseConflictMarker.user.js y debe instalarse utilizando Oil Monkey.

O puedes acceder visitando [这里](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker)
Ven y obtén el guión con un clic.

Ahora se ha agregado soporte para Webvpn.

Gracias a [CircuitCoder](https://github.com/CircuitCoder) por su orientación técnica.
Gracias a [SharzyL](https://github.com/SharzyL) por las sugerencias y DEBUG.

## Marca de contenido del curso restante para la selección del curso

¿No sabes qué tipo de voluntarios utilizar para tomar clases?
¡Este script te ayuda!

Este script colorea el número de solicitantes. ¡El último color verde es el mejor candidato para tomar una clase!

¡El guión aún está en desarrollo y pronto habrá soporte para colas!

Visita [这里](https://greasyfork.org/en/scripts/456440-colorful-course) para obtener el guión.

## Información push de mensajes de telegramas escolares en línea

Ver [thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) y
__JUE_WIKI_TOKEN_0__.

JUE CANAL DE INFORMACIÓN ya existe en Telegram. Como es un canal privado, debes pasar [邮件](mailto:i@zenithal.me)
Obtenga el enlace de invitación.

## Estado de la lavadora en toda la escuela

### Estado de la lavadora en toda la escuela: herramienta de consulta de la lavadora (con interfaz)

https://washer.sdevs.top/

La interfaz es sencilla y fácil de usar, los datos están organizados, se pueden memorizar los edificios de viviendas consultados y se proporciona un canal de retroalimentación.

### Consulta sobre disponibilidad de lavandería en la Universidad de Tsinghua

https://washer.voltair.top/

### Estado de la lavadora en toda la escuela: subprograma oficial

También puedes consultar el estado de la lavadora en el subprograma del fabricante de la lavadora.

La entrada es el botón "Lavadora cercana" en la parte inferior de la página de inicio.

![“自助智能校园”小程序码](pathname:///docs/thuservices/image/washer_official.jpg)

### Estado de la lavadora en toda la escuela: interfaz API (versión de texto, obsoleta)

¿Sigues trabajando duro para conseguir una lavadora? ¿Sigues sufriendo por correr de un lado a otro sólo para descubrir que no hay lavadora? este servicio
¡Ayudarte a detectar el estado de la lavadora, y conocer las tendencias de las lavadoras de todo el colegio con un clic sin salir de casa!

El código fuente está en el directorio aux del repositorio. Actualmente desplegado en trabajadores de cf en [https://washer.thu.services](https://washer.thu.services)

Para implementar la búsqueda, necesitamos agregar parámetros. Actualmente acepta tres parámetros, "s", "j" y "p". "s" es la búsqueda
Para edificios de apartamentos, las cadenas generalmente aceptadas son "Edificio x, Bauhinia" o "Edificio x, Distrito Sur". Por ejemplo

```
https://washer.thu.services/?s=紫荆1号楼
```

Devolverá el estado de funcionamiento de la lavadora en el "Edificio Zijing 1". Por defecto, este parámetro devuelve
El estado de funcionamiento de la lavadora en el "Edificio Zijing 2".

Para el parámetro "j", solo verificamos si "j" existe. Si existe, se devuelven los datos json originales.
Este elemento es para uso de desarrolladores. Los parámetros "s" y "j" se pueden utilizar al mismo tiempo.

Para el parámetro "p", solo verificamos si "p" existe. Si existe, se devuelve texto/datos sin formato.
Los parámetros "s" y "p" se pueden utilizar al mismo tiempo. Cuando "j" y "p" aparecen al mismo tiempo, "j" tiene mayor prioridad.

### Estado de la lavadora en toda la escuela: acceso directo de iOS (no disponible)

Los usuarios con iOS 12 o superior pueden instalar el acceso directo a través de este [链接](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0) para verificar rápidamente la lavadora inactiva. Actualmente, solo se admiten consultas precisas de pisos.

### Estado de la lavadora en toda la escuela - Telegram Bot Erha (no disponible)

Basado en esta interfaz [Konano](https://github.com/Konano), se desarrolló un Telegram Bot llamado Erha.

La dirección del proyecto es [此](https://github.com/Konano/Tuna-Erha-Bot). Además de la función de consulta del estado de la lavadora, existen más funciones.

Se puede acceder al bot a través de [t.me/erhabot](https://t.me/erhabot).

### Monitoreo y recordatorio de lavandería: subprograma WeChat (no disponible)

![THU洗衣](pathname:///docs/thuservices/image/washer.jpg)

Usando la misma API, después de prestar atención a la lavadora, cuando la lavadora esté inactiva, se enviará un recordatorio a través de la cuenta del servicio WeChat.

__JUE_WIKI_TOKEN_0__

## INFORMACIÓN Calculadora de GPA

¿Es difícil consultar el GPA con un clic después de que falla cksqs o necesito gastar 10 yuanes para obtener el GPA?
Este tipo de GPA, que sólo conserva 3 cifras significativas, hace que la gente sienta una gran incertidumbre debido al redondeo de [-0,005,0,005);
Para los estudiantes que calculan su GPA a mano, a medida que aumenta el año académico y el número de cursos, la dificultad del cálculo manual se vuelve cada vez mayor.
Sólo necesitas calcular tu GPA una vez, lo cual es extremadamente engorroso.

Por lo tanto, propusimos la función de cálculo automático del GPA. Teniendo en cuenta varios factores como la comodidad y la facilidad de uso, como siempre,
Se introdujo un script de usuario para implementar esta pequeña funcionalidad.

Este script solo leerá los resultados que existen en la interfaz "INFO-Todos los resultados" (aquellos que han sido ingresados ​​al sistema pero no han sido publicados solo pueden
Obtenido a través de cksqs o expedientes académicos pagados, no incluidos en el cálculo), utilice los algoritmos nuevos y antiguos para combinar todo el GPA y el GPA requerido.
Calcúlelo (emita el doble directamente) y muestre un recordatorio de notificación.

Este script está en `aux/Tsinghua GPA Calculator.user.js` y debe instalarse mediante Oil Monkey.

O a través de [这里](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator)
Llegar.

## Consulta de GPA de la Universidad de Tsinghua

Consulte la sección anterior para obtener una introducción.

Calcule el GPA para cada semestre y las calificaciones totales requeridas y requeridas en la página "INFO-Todas las calificaciones". La dirección del script es [此](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询)

## Ayudante de aula de lluvia

Este script de usuario está diseñado para brindar una mejor experiencia de usuario a los estudiantes de Rain Classroom en dispositivos de pantalla grande (PC, tableta).

La dirección del proyecto es [此](https://github.com/RainEggplant/rain-classroom-helper)

## Reproducción automática de vídeo de plataforma integrada de la Universidad de Tsinghua

El guión está en [此](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay) y puede reproducir automáticamente el vídeo del curso en [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn).

## El video en línea de Xuetang se reproduce automáticamente

¿Compruebas a menudo si se ha detenido cuando estás estudiando MOOC en segundo plano? ¡Un guión reproducirá automáticamente la siguiente lección!

El guión está en [此](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放)

Dado que este script tiene una larga historia, no se ha mantenido durante mucho tiempo y también contiene algunos errores, no se puede garantizar su disponibilidad a largo plazo. Cuando encuentre problemas o mejore el código, puede comunicarse con el autor original @RikaSugisawa.

## Descargador de subtítulos en línea de Xuetang

¿Sigues hojeando vídeos uno por uno y descargando subtítulos cuando te preparas para revisarlos? ¡Este script te ayuda!

Versión Rabbit Hu: el script está en [此](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler) y la dirección del proyecto está en [此](https://github.com/Rabbit-Hu/xuetangx-caption-crawler).

Versión de Roberts Holder: la dirección del proyecto es [此](https://github.com/rcy17/MOOC_subtitle_spider)

Versión de Rynco Maekawa: la dirección del proyecto es [此](https://github.com/lynzrand/xuetangx_sub)

Versión c7w: la dirección del proyecto es [此](https://github.com/c7w/TsinghuaMoocCaptionCrawler)

## Descargador de material didáctico de Rain Classroom

Actualmente, solo se aplica al "Aula de lluvia del río Yangtze", pero se puede usar en el Aula de lluvia del estanque de loto después de una modificación.

La dirección del proyecto es [此](https://github.com/ShevonKuan/yuektang_ppt2pdf).

## Rastreo del libro de referencia de enseñanza de Tsinghua

La biblioteca de la escuela ha comprado una gran cantidad de [图书资源](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7). Se recomienda utilizar [清华大学教参服务平台](http://reserves.lib.tsinghua.edu.cn/) y [文泉学堂-清华大学出版社电子图书数据库](https://lib-tsinghua.wqxuetang.com/) primero para buscar materiales didácticos de chino.

### Plataforma de servicios de referencia docente de la Universidad de Tsinghua

La plataforma de servicios de referencia docente de la Universidad de Tsinghua proporciona versiones electrónicas escaneadas de los libros de texto de los cursos y materiales de referencia docente dentro del alcance de los derechos de autor (navegación en línea). Si necesita materiales didácticos que no están disponibles en la plataforma, puede comunicarse con [相关部门](https://lib.tsinghua.edu.cn/info/1184/3617.htm) directamente por correo electrónico o por teléfono para escanearlos.

Se recomienda utilizar [reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader) para la descarga.

La función de descarga también está implementada en [thu-info-lib](https://github.com/thu-info-community/thu-info-lib).

Los dos elementos siguientes no están disponibles debido a cambios en la API.

Citado del texto original: La reciente epidemia ha sido grave y ha resultado difícil comprar libros de texto. Para facilitar el aprendizaje en línea de todos, escribí un script en Python para rastrear los materiales didácticos de Tsinghua.

La dirección del proyecto es [此](https://github.com/lflame/TsinghuaBookCrawler)

Citando el texto original: Descarga automáticamente las imágenes originales de cada página del libro.

La dirección del proyecto es [此](https://github.com/i207M/reserves-lib-tsinghua-downloader)

### Academia Wenquan

Wenquan Xuetang se utiliza para buscar libros en Tsinghua University Press. El anti-rastreo es estricto. Puede utilizar el script [这个](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88) para descargar.

## Compartir la ubicación del curso

Actualmente disponible: [courseX 课程信息共享计划](https://tsinghua.app/courses) mantenido por el equipo de desarrollo de learnX

Actualmente los siguientes proyectos han cesado en mantenimiento y operación:

En [https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/), la dirección de su proyecto es [此](https://github.com/RikaKagurasaka/where-my-course-gone-backend).

## Marca de registro (para billetes de tren)

Consulte [此网站](https://tuixue.online/zcimage/) para obtener fácilmente la marca de registro correspondiente cuando esté fuera del campus.

## Consulta de factura de electricidad del dormitorio.

Hay [实现](https://github.com/WhymustIhaveaname/TsinghuaElectric) a través de Chrome sin cabeza

También hay otra implementación, consulte `TsinghuaElectricityBillChecker.py` en el directorio auxiliar, el usuario necesita modificar algunos parámetros integrados.

También hay otra implementación, consulte `TsinghuaBills.py` en el directorio aux.

A través de estos scripts, se pueden verter datos en grafana para realizar el seguimiento y la alarma de las facturas de electricidad.

## Consulta de factura de agua y luz del dormitorio.

Consulte `TsinghuaBills.py` en el directorio auxiliar.

Nota: Este script puede consultar el saldo de la factura de agua del dormitorio (¡no la billetera de la tarjeta del campus!) y se aplica principalmente al Edificio W y al Apartamento Shuangqing. Ámbito de aplicación específico: Apartamento Shuangqing, Edificio de apartamentos para estudiantes Bauhinia N° 14, Edificio de apartamentos para estudiantes Bauhinia N° 15, Edificio de apartamentos para estudiantes Bauhinia N° 16, Edificio de apartamentos para estudiantes Bauhinia N° 17, Edificio 17 y Edificio 18.

Este script puede verter datos en grafana para implementar alarmas y monitoreo de facturas de servicios públicos.

## Tono de llamada para salir de clase de la Universidad de Tsinghua

¿No hay ambiente para estudiar en casa y extrañas la sala de estudio de la escuela? ¡El software de tonos de llamada Tsinghua te ayuda!

Actualmente existe una versión de macOS, proyecto [在此](https://github.com/LyricZhao/THU-Bell)

## Seleccione aleatoriamente restaurantes en el campus: mini programa WeChat

¿Hay demasiados comedores y no sabes dónde comer? ¡Generador de números aleatorios para ayudar!

Proyecto en [此](https://github.com/SuXY15/RandomCanteen)

Código QR del mini programa

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## Seleccionar aleatoriamente restaurantes en el campus - Telegram Bot

Lo mismo que arriba.

Además, Telegram Bot también proporciona funciones interactivas como beber té con leche en línea, beber capuchino en línea y producir bebidas en línea.

La dirección del proyecto es [此](https://github.com/Lancern/thufood-tgbot)

La dirección BOT es https://t.me/thufood_bot

Los similares son https://t.me/thufoodbot

## Guía del curso de informática de la Universidad de Tsinghua

[GitHub地址](https://github.com/PKUanonym/REKCARC-TSC-UHT) y [校内地址](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## Guía del curso del Instituto Tsinghua de Ingeniería de Software

__JUE_WIKI_TOKEN_0__

## Plan de intercambio de guías de cursos de la Universidad de Huaqing

El plan de intercambio de guías del curso para todos los estudiantes de la escuela tiene como objetivo eliminar la asimetría de información en los recursos de aprendizaje y promover el intercambio abierto de recursos y materiales de aprendizaje. Proyecto [在此](https://closed.social/pastExam/). En comparación con GitHub, las operaciones de compartir y descargar son más amigables para los estudiantes que no están familiarizados con la tecnología. ¡Bienvenidos a compartir!

![华清大学课程攻略共享计划](pathname:///docs/thuservices/image/course_strategy.jpg)

## Plataforma de evaluación docente del campus

Colleguide: una plataforma para calificar escuelas, profesores y cursos

https://www.colleguide.com/

## Datos sobre el Departamento de Ciencias de la Computación

https://github.com/jiegec/dcst-facts

## NFVer tarjeta del campus

https://github.com/nfcim/nfsee

## Plan de intercambio de información del curso

https://tsinghua.app/courses

## Materiales del examen de ingreso de posgrado 912 de especialización en informática de la Universidad de Tsinghua

https://github.com/Wsky51/THU-CS912-kaoyan

## Rascador de puntuaciones Tsinghua

https://github.com/summivox/thu-scratch

* Instale el complemento de Chrome o Userscript
* Información de inicio de sesión
* El lugar donde puedes ver tus resultados ha sido bloqueado~
* Siento "ドキドキ" en mi corazón

## recuerdos de thuhole

Todo el contenido proviene de cuevas boutique y colecciones personales.

https://github.com/pb0316/thuhole_memories

## copia de seguridad de la base de datos de Thuhole

Después de lavar los datos, la mayoría de los agujeros de árbol significativos que no involucran privacidad personal se respaldan en este repositorio de GitHub.

https://github.com/thuhole/database_backup

## Documento de orientación de habilidades de la Asociación de Ciencias Estudiantiles del Departamento de Computación

Este documento de orientación de habilidades lo mantiene la Asociación de Estudiantes de Ciencias de la Computación de la Universidad de Tsinghua. El objetivo es permitir que los estudiantes de informática y ciencias de la computación dominen rápidamente ciertas habilidades específicas. Al brindar formas en que estas habilidades pueden usarse en cursos, investigaciones científicas y pasantías, se ahorra tiempo a los estudiantes en la recopilación de información relevante y se mejora su capacidad para aprender nuevas habilidades.

https://docs.net9.org/

## Rastreador del sistema de práctica social de estudiantes graduados de la Universidad de Tsinghua

Rastree datos estructurados de https://thshijian.tsinghua.edu.cn (Sistema de práctica social para graduados de la Universidad de Tsinghua). Úselo bajo su propio riesgo.

https://github.com/Harry-Chen/thshijian-crawler
