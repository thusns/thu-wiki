---

---
# alguns scripts e ferramentas

## Resumo das ferramentas de autenticação de rede do campus

Com o espírito de usar rodas em vez de fabricar rodas, gerações de pessoas de Tsinghua lutaram com inteligência e coragem na rede do campus e desenvolveram inúmeras ferramentas de autenticação. Listamos aqui o máximo possível para que cada um escolha de acordo com suas preferências.

| Links do projeto | Plataformas suportadas | Linguagens de implementação | Atualmente disponível (mantido) | Recursos |
| --- | --- | --- | --- | --- |
| [Tunet-2018 (official)](https://its.tsinghua.edu.cn/xywl/xywsyzn/yxw_hkhd_/khdxz.htm) | GUI do Windows, Linux-CLI | Desconhecido | Disponível | Não investigado |
| [GoAuthing](https://github.com/z4yx/GoAuthing/) | Linux-CLI (x86\_64, arm, mips, ppc, riscv), Windows-CLI, Mac OS-CLI (Intel, Apple) | Vá | Disponível | Plataforma completa e arquitetura completa, acesso e acesso, v4 e v6, serviço systemd, TUNA Fornece [镜像](https://mirrors.tuna.tsinghua.edu.cn/github-release/z4yx/GoAuthing/LatestRelease/) para baixar ferramentas de autenticação quando não autenticado e fornece bibliotecas relacionadas à autenticação |
| [tunet-python](https://github.com/yuantailing/tunet-python) | Plataforma que suporta python, CLI | Pitão | Disponível | v4 e v6, monitoramento de admissão e saída, tráfego e status de admissão |
| [tunet-c](https://github.com/robertying/tunet-c) | OpenWRT, Linux, macOS; CLI | C | Disponível | Fornece bibliotecas relacionadas à autenticação, os arquivos binários são pequenos |
| [tunet-rust](https://github.com/Berrysoft/tunet-rust) | Windows, Mac OS, Linux, Android, iOS | Ferrugem, Dardo | Disponível | Monitoramento de tráfego e saldo, entrada e saída, v4 e v6; fornece bibliotecas relacionadas à autenticação; fornece CLI, CUI, GUI, serviço Windows, serviço systemd, serviço launchd na área de trabalho; fornece GUI no terminal móvel |
| [TsinghuaTunet](https://github.com/WhymustIhaveaname/TsinghuaTunet) | Plataformas que suportam python, CLI | Pitão | Disponível em sub-redes específicas | Não investigado |
| [auth-tsinghua](https://github.com/jiegec/auth-tsinghua) | Compatível com plataformas node.js, CLI | JavaScript | Não é mais mantido | Redirecionado para GoAuthing |
| [TsinghuaNet](https://github.com/Berrysoft/TsinghuaNet) | Windows, Mac OS, Linux, UWP, Android, iOS | C# | Não é mais mantido | Redirecionado para tunet-rust |
| [tunet-cli](https://github.com/syimyuzya/tunet-cli) | Plataforma que suporta python, CLI | Pitão | Não é mais mantido, último commit em 2017 | Não investigado |
| [Tsinghua-Online](https://github.com/xxr3376/Tsinghua-Online) | Plug-in do navegador, em [Chrome 商店](https://chrome.google.com/webstore/detail/tsinghua-online/elkbekfdkihpbcbacmppemegcekohkjo) | JavaScript | Não é mais mantido, último commit em 2013 | Plug-in do navegador |
| [THUNetwork](https://github.com/zhaofeng-shu33/THUNetwork) | Suporta plataforma python, CLI | Pitão | Não é mais mantido | A senha é passada para a linha de comando em texto não criptografado, o que é relativamente inseguro |

## INFO/APLICATIVO Escolar Online/Plug-in

No espírito de usar rodas em vez de fabricar rodas, gerações de pessoas de Tsinghua lutaram contra inteligência e coragem com a INFO e escolas on-line e desenvolveram inúmeras ferramentas fáceis de usar. Tentamos ao máximo listá-los aqui para que cada um possa escolher de acordo com suas preferências.

| Links do projeto | Plataformas suportadas | Linguagens de implementação | Atualmente disponível (mantido) | Recursos |
| --- | --- | --- | --- | --- |
| [INFO](http://info.tsinghua.edu.cn/) | Página web | Não investigado | Disponível | Página oficial |
| [LEARN](http://learn.tsinghua.edu.cn/) | Página web | Não investigado | Disponível | Página oficial |
| [Learn-Project](https://github.com/xxr3376/Learn-Project) | Plug-ins de navegador | Datilografado | Disponível | Projetos escolares online organizados por linha do tempo e categoria, nas lojas de plug-ins Google, Firefox e Edge, front-end moderno |
| [LearnX](https://github.com/robertying/learnX) | iOS, iPad OS, macOS, Android | Reagir | Disponível | Licença de código aberto do projeto, veja a introdução do projeto para o resto |
| [THUInfo](https://github.com/UNIDY2002/THUInfo) | APLICATIVO Móvel | Datilografado | Disponível | Com distribuição da Apple App Store, incluindo casa, departamento estudantil (sala de aula), projetos de biblioteca, suporta buracos em árvores |
| EmTsinghua | APLICATIVO Móvel | Desconhecido | Desconhecido | Distribuído pela Apple App Store, o restante não foi investigado, é uma obra para comemoração do campus de um determinado laboratório |
| [learn2018-autodown](https://github.com/Trinkle23897/learn2018-autodown) | Plataforma que suporta Python | Pitão | Disponível | Verdadeiro download completo de informações/arquivos (veja a introdução do projeto para outros detalhes) |
| [THUCourseHelper](https://github.com/Starrah/THUCourseHelper) | Android | Kotlin | Desconhecido | Programação do curso |
| [thu-learn-downloader](https://github.com/liblaf/thu-learn-downloader) | Linux, Mac, Windows | Pitão | Disponível | Arquivos de cursos em sala de aula on-line e downloads de trabalhos de casa com uma interface bonita (consulte os documentos do projeto para obter detalhes) |

## Sinalizador de conflito de seleção de curso

Você ainda envia suas seleções de cursos com grandes expectativas quando está com pressa para assistir às aulas, mas descobre que há um conflito de horário e perdeu a seleção do curso?
Você ainda se sente lento ao lembrar o horário do curso selecionado e verificar a lista de início do curso?
Este script ajuda você!

Este script detecta os cursos que você selecionou e marca automaticamente em vermelho os cursos com horários conflitantes nos cursos candidatos, permitindo que você navegue
A velocidade de milhões de cursos é como um milagre. Quando o mouse passa sobre um horário marcado em vermelho, todos os cursos que entram em conflito com ele serão exibidos.

Ressalta-se que as aulas semestrais ainda não são totalmente suportadas, o que significa que podem ocorrer falsos conflitos de horário;
Ao mesmo tempo, não pode funcionar na interface de informações de abertura de curso e consulta de seleção de curso, mas funciona apenas na interface de operação de seleção de curso.

Este script está em aux/TsinghuaCourseConflictMarker.user.js e precisa ser instalado usando Oil Monkey.

Ou você pode acessá-lo visitando [这里](https://greasyfork.org/en/scripts/408340-tsinghuacourseconflictmarker)
Venha e obtenha o script com um clique.

O suporte Webvpn foi adicionado agora.

Agradecimentos a [CircuitCoder](https://github.com/CircuitCoder) pela orientação técnica
Obrigado a [SharzyL](https://github.com/SharzyL) pelas sugestões e DEBUG

## Marca de conteúdo restante do curso para seleção do curso

Não sabe que tipo de voluntários usar para assistir às aulas?
Este script ajuda você!

Este script colore o número de candidatos. A última cor verde é a melhor candidata para fazer uma aula!

O script ainda está em desenvolvimento e o suporte à fila estará disponível em breve!

Visite [这里](https://greasyfork.org/en/scripts/456440-colorful-course) para obter o script

## INFO Envio de mensagem de telegrama escolar on-line

Veja [thu-weblearn-tgbot](https://github.com/Konano/thu-weblearn-tgbot) e
[thu-info-forwarder](https://github.com/Konano/thu-info-forwarder).

O CANAL DE INFORMAÇÕES QUI já existe no Telegram. Por ser um canal privado, você precisa passar [邮件](mailto:i@zenithal.me)
Obtenha o link do convite.

## Status da máquina de lavar em toda a escola

### Status da máquina de lavar em toda a escola - ferramenta de consulta da máquina de lavar (com interface)

https://washer.sdevs.top/

A interface é simples e fácil de usar, os dados foram organizados, os prédios consultados podem ser memorizados e é fornecido um canal de feedback.

### Consulta sobre disponibilidade de lavanderia da Universidade de Tsinghua

https://washer.voltair.top/

### Status da máquina de lavar em toda a escola - miniaplicativo oficial

Você também pode verificar o status da máquina de lavar no miniaplicativo do fabricante da máquina de lavar.

A entrada é o botão “Máquina de lavar próxima” na parte inferior da página inicial.

![“自助智能校园”小程序码](pathname:///docs/thuservices/image/washer_official.jpg)

### Status da máquina de lavar em toda a escola - interface API (versão de texto, obsoleta)

Você ainda está trabalhando duro para conseguir uma máquina de lavar? Você ainda sofre de correr para cima e para baixo apenas para descobrir que não há máquina de lavar? Este serviço
Ajudá-lo a detectar o estado da máquina de lavar e conhecer as tendências das máquinas de lavar de toda a escola com um clique, sem sair de casa!

O código-fonte está no diretório aux do repositório. Atualmente implantado em trabalhadores cf em [https://washer.thu.services](https://washer.thu.services)

Para implementar a pesquisa, precisamos adicionar parâmetros. Atualmente aceita três parâmetros, "s", "j" e "p". "s" é a pesquisa
Para prédios de apartamentos, as strings geralmente aceitas são "Edifício x, Bauhinia" ou "Edifício x, Distrito Sul". Por exemplo

```
https://washer.thu.services/?s=紫荆1号楼
```

Ele retornará o status operacional da máquina de lavar no “Edifício Zijing 1”. Por padrão, esse parâmetro retorna
O status de operação da máquina de lavar no "Edifício Zijing 2".

Para o parâmetro “j”, verificamos apenas se “j” existe. Se existir, os dados json originais serão retornados.
Este item é para uso do desenvolvedor. Os parâmetros "s" e "j" podem ser usados ​​ao mesmo tempo.

Para o parâmetro “p”, verificamos apenas se “p” existe. Se existir, dados de texto/simples serão retornados.
Os parâmetros "s" e "p" podem ser usados ao mesmo tempo. Quando "j" e "p" aparecem ao mesmo tempo, "j" tem prioridade mais alta.

### Status da máquina de lavar em toda a escola - atalho iOS (não disponível)

Usuários com iOS 12 ou superior podem instalar o atalho por meio deste [链接](https://www.icloud.com/shortcuts/ffc9d9fff7e140ec9e5a92e5f7d16ae0) para verificar rapidamente a máquina de lavar ociosa. Atualmente, apenas consultas precisas de andares são suportadas.

### Status da máquina de lavar em toda a escola - Telegram Bot Erha (indisponível)

Com base nesta interface [Konano](https://github.com/Konano), foi desenvolvido um Telegram Bot chamado Erha.

O endereço do projeto é [此](https://github.com/Konano/Tuna-Erha-Bot). Além da função de consulta do status da máquina de lavar, existem mais funções.

O bot pode ser acessado via [t.me/erhabot](https://t.me/erhabot).

### Monitoramento e lembrete de lavanderia - miniaplicativo WeChat (não disponível)

![THU洗衣](pathname:///docs/thuservices/image/washer.jpg)

Utilizando a mesma API, após prestar atenção na máquina de lavar, quando a máquina estiver ociosa, um lembrete será enviado através da conta do serviço WeChat.

[项目地址](https://github.com/zrt/thu-wash-notify)

## INFORMAÇÃO Calculadora GPA

É difícil consultar o GPA com um clique após a falha do cksqs ou preciso gastar 10 yuans para obter o GPA?
Este tipo de GPA, que mantém apenas 3 algarismos significativos, provoca uma grande incerteza nas pessoas devido ao arredondamento de [-0,005,0,005);
Para os alunos que calculam o GPA manualmente, à medida que o ano letivo aumenta e o número de cursos aumenta, a dificuldade do cálculo manual torna-se cada vez maior.
Você só precisa calcular seu GPA uma vez, o que é extremamente trabalhoso.

Portanto, propusemos a função de cálculo automático do GPA. Considerando vários fatores como conveniência e facilidade de uso, como sempre,
Introduziu o userscript para implementar esta pequena funcionalidade.

Este script irá ler apenas os resultados que existem na interface "INFO-All Results" (aqueles que foram inseridos no sistema mas não foram publicados só podem
Obtido por meio de cksqs ou transcrições pagas, não incluídas no cálculo), use os algoritmos novos e antigos para combinar todo o GPA e o GPA exigido
Calcule-o (saia dupla diretamente) e exiba um lembrete de notificação.

Este script está em `aux/Tsinghua GPA Calculator.user.js` e precisa ser instalado usando Oil Monkey.

Ou via [这里](https://greasyfork.org/zh-CN/scripts/410960-tsinghua-gpa-calculator)
para conseguir.

## Consulta GPA da Universidade de Tsinghua

Consulte a seção anterior para introdução.

Calcule o GPA de cada semestre e o total de notas exigidas e obrigatórias na página “INFO-Todas as notas”. O endereço do script é [此](https://greasyfork.org/zh-CN/scripts/420540-清华大学gpa查询)

## Ajudante de sala de aula de chuva

Este script de usuário foi projetado para fornecer uma melhor experiência de usuário para alunos do Rain Classroom em dispositivos de tela grande (PC, tablet).

O endereço do projeto é [此](https://github.com/RainEggplant/rain-classroom-helper)

## Reprodução automática de vídeo da plataforma integrada da Universidade Tsinghua

O script está em [此](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay) e pode reproduzir automaticamente o vídeo do curso em [tsinghua.yuketang.cn](https://github.com/Co1lin/Tsinghua-Yukuotang-Autoplay/blob/main/tsinghua.yuketang.cn).

## O vídeo online Xuetang é reproduzido automaticamente

Você costuma verificar se ele parou quando você estuda MOOCs em segundo plano? Um script reproduzirá automaticamente a próxima lição para você!

O script está em [此](https://greasyfork.org/en/scripts/373881-清华学堂在线视频自动播放)

Como este script tem uma longa história, não é mantido há muito tempo e também contém alguns bugs, sua disponibilidade a longo prazo não pode ser garantida. Ao encontrar problemas ou melhorar o código, você pode entrar em contato com o autor original @RikaSugisawa

## Downloader de legendas on-line Xuetang

Você ainda está folheando os vídeos um por um e baixando as legendas quando se prepara para revisá-los? Este script ajuda você!

Versão Rabbit Hu: O script está em [此](https://greasyfork.org/zh-CN/scripts/408878-xuetangx-caption-crawler) e o endereço do projeto está em [此](https://github.com/Rabbit-Hu/xuetangx-caption-crawler).

Versão Roberts Holder: O endereço do projeto é [此](https://github.com/rcy17/MOOC_subtitle_spider)

Versão Rynco Maekawa: O endereço do projeto é [此](https://github.com/lynzrand/xuetangx_sub)

versão c7w: O endereço do projeto é [此](https://github.com/c7w/TsinghuaMoocCaptionCrawler)

## Downloader de material didático Rain Classroom

Atualmente, é aplicável apenas à "Sala de Aula Chuva do Rio Yangtze", mas pode ser usado na Sala de Aula Chuva do Lago Lotus após modificação.

O endereço do projeto é [此](https://github.com/ShevonKuan/yuektang_ppt2pdf).

## Tsinghua ensinando livro de referência rastejando

A biblioteca escolar comprou muitos [图书资源](https://nav.lib.tsinghua.edu.cn/cgi-bin/searchuse.cgi?c=7). Recomenda-se usar [清华大学教参服务平台](http://reserves.lib.tsinghua.edu.cn/) e [文泉学堂-清华大学出版社电子图书数据库](https://lib-tsinghua.wqxuetang.com/) primeiro para encontrar materiais de ensino de chinês.

### Plataforma de serviço de referência de ensino da Universidade de Tsinghua

A plataforma de serviço de referência de ensino da Universidade de Tsinghua fornece versões eletrônicas digitalizadas de livros didáticos e materiais de referência de ensino no âmbito dos direitos autorais (navegação online). Caso necessite de materiais didáticos que não estão disponíveis na plataforma, você pode entrar em contato diretamente com [相关部门](https://lib.tsinghua.edu.cn/info/1184/3617.htm) por e-mail ou telefone para digitalização.

Recomenda-se usar [reserves-lib-tsinghua-downloader](https://github.com/libthu/reserves-lib-tsinghua-downloader) para download.

A função de download também está implementada em [thu-info-lib](https://github.com/thu-info-community/thu-info-lib).

Os dois itens a seguir não estão disponíveis devido a alterações na API.

Citado no texto original: A recente epidemia foi grave e tem sido difícil comprar livros didáticos. Para facilitar o aprendizado on-line de todos, escrevi um script python para rastrear materiais de ensino de Tsinghua.

O endereço do projeto é [此](https://github.com/lflame/TsinghuaBookCrawler)

Citando o texto original: Baixe automaticamente as imagens originais de cada página do livro.

O endereço do projeto é [此](https://github.com/i207M/reserves-lib-tsinghua-downloader)

### Academia Wenquan

Wenquan Xuetang é usado para pesquisar livros na Tsinghua University Press. O anti-rastreamento é rigoroso. Você pode usar o script [这个](https://greasyfork.org/zh-CN/scripts/437737-%E6%96%87%E6%B3%89%E5%AD%A6%E5%A0%82pdf%E4%B8%8B%E8%BD%BD%E4%BF%AE%E5%A4%8D%E7%89%88) para fazer download.

## Compartilhamento de localização do curso

Atualmente disponível: [courseX 课程信息共享计划](https://tsinghua.app/courses) mantido pela equipe de desenvolvimento learnX

Os seguintes projetos atualmente cessaram manutenção e operação:

Em [https://wmcgcdn.rika.tech/](https://wmcgcdn.rika.tech/), o endereço do projeto é [此](https://github.com/RikaKagurasaka/where-my-course-gone-backend).

## Marca de registro (para bilhetes de trem)

Consulte [此网站](https://tuixue.online/zcimage/) para obter facilmente a marca de registro relevante quando estiver fora do campus.

## Consulta de conta de luz do dormitório

Existe [实现](https://github.com/WhymustIhaveaname/TsinghuaElectric) via Chrome sem cabeça

Há também outra implementação, consulte `TsinghuaElectricityBillChecker.py` no diretório aux, o usuário precisa modificar alguns parâmetros incorporados.

Há também outra implementação, consulte `TsinghuaBills.py` no diretório aux.

Através desses scripts, os dados podem ser despejados em grafana para realizar monitoramento e alarme da conta de luz.

## Consulta de conta de água e luz do quarto

Consulte `TsinghuaBills.py` no diretório aux.

Nota: Este script pode consultar o saldo da conta de água do dormitório (não a carteira do cartão do campus!) E é aplicável principalmente ao Edifício W e ao Apartamento Shuangqing. Âmbito específico de aplicação: Apartamento Shuangqing, Edifício de apartamentos estudantis Bauhinia nº 14, Edifício de apartamentos estudantis Bauhinia nº 15, Edifício de apartamentos estudantis Bauhinia nº 16, Edifício de apartamentos estudantis Bauhinia nº 17, Edifício 17 e Edifício 18.

Este script pode inserir dados em grafana para implementar monitoramento e alarme de contas de serviços públicos.

## Toque da aula da Universidade de Tsinghua

Não há ambiente para estudar em casa e você sente falta da sala de estudos da escola? O software de toque Tsinghua ajuda você!

Atualmente existe uma versão macOS, projeto [在此](https://github.com/LyricZhao/THU-Bell)

## Selecione aleatoriamente restaurantes no campus - miniprograma WeChat

Há muitas cantinas e você não sabe onde comer? Gerador de números aleatórios para ajudar!

Projeto em [此](https://github.com/SuXY15/RandomCanteen)

Código QR do miniprograma

![](https://raw.githubusercontent.com/SuXY15/MyPic/master/RandomCanteen/RandomCanteen.jpg)

## Selecione aleatoriamente restaurantes no campus - Telegram Bot

O mesmo que acima.

Além disso, o Telegram Bot também oferece funções interativas, como beber chá com leite online, beber cappuccino online e produção online de bebidas.

O endereço do projeto é [此](https://github.com/Lancern/thufood-tgbot)

O endereço do BOT é https://t.me/thufood_bot

Os semelhantes são https://t.me/thufoodbot

## Guia do curso de ciência da computação da Universidade de Tsinghua

[GitHub地址](https://github.com/PKUanonym/REKCARC-TSC-UHT) e [校内地址](https://git.tsinghua.edu.cn/pkuanonym/REKCARC-TSC-UHT)

## Guia do curso do Instituto Tsinghua de Engenharia de Software

[GitHub地址](https://github.com/SerCharles/THSS-CRACKER)

## Plano de compartilhamento do guia do curso da Universidade Huaqing

O plano de partilha do guia do curso para todos os alunos da escola visa eliminar a assimetria de informação nos recursos de aprendizagem e promover a partilha aberta de recursos e materiais de aprendizagem. Projeto [在此](https://closed.social/pastExam/). Em comparação com o GitHub, as operações de compartilhamento e download são mais amigáveis ​​para estudantes que não estão familiarizados com a tecnologia. Bem-vindo a compartilhar!

![华清大学课程攻略共享计划](pathname:///docs/thuservices/image/course_strategy.jpg)

## Plataforma de avaliação de ensino universitário

Colleguide: uma plataforma para avaliar escolas, professores e cursos

https://www.colleguide.com/

## Fatos sobre o Departamento de Ciência da Computação

https://github.com/jiegec/dcst-facts

## Cartão do campus NFSee

https://github.com/nfcim/nfsee

## Plano de compartilhamento de informações do curso

https://tsinghua.app/courses

## Materiais de exame de admissão de pós-graduação 912 da Universidade de Tsinghua

https://github.com/Wsky51/THU-CS912-kaoyan

## Arranhador de pontuação de Tsinghua

https://github.com/summivox/thu-scratch

* Instale o plugin do Chrome ou Userscript
* Informações de login
* O lugar onde você pode ver seus resultados foi bloqueado~
* Eu sinto "ドキドキ" em meu coração

## memórias thuhole

Todo o conteúdo vem de cavernas boutique e coleções pessoais.

https://github.com/pb0316/thuhole_memories

## backup de banco de dados thuhole

Depois de lavar os dados, a maioria dos buracos significativos nas árvores que não envolvem privacidade pessoal são armazenados em backup neste repositório GitHub.

https://github.com/thuhole/database_backup

## Documento de orientação de habilidades da Associação Científica de Estudantes do Departamento de Computação

Este documento de orientação de habilidades é mantido pela Associação de Estudantes de Ciência da Computação da Universidade de Tsinghua. O objetivo é permitir que estudantes de ciência da computação e ciências da computação dominem rapidamente certas habilidades específicas. Ao fornecer formas pelas quais essas habilidades podem ser usadas em cursos, pesquisas científicas e estágios, economiza-se tempo dos alunos na coleta de informações relevantes e melhora-se a capacidade dos alunos de aprender novas habilidades.

https://docs.net9.org/

## Rastreador do sistema de prática social de estudantes de pós-graduação da Universidade de Tsinghua

Rastreie dados estruturados de https://thshijian.tsinghua.edu.cn (Sistema de Prática Social de Pós-Graduação da Universidade de Tsinghua). Use por sua conta e risco.

https://github.com/Harry-Chen/thshijian-crawler
