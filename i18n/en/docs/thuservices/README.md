# Summary of Commonly Used THU Information/Services

## Quick Course Registration Entry

[Course Registration Login (On-campus or SSLVPN) (Valid during registration period)](http://zhjwxk.cic.tsinghua.edu.cn/xklogin.do)

## File Contents

- [accounts.md](accounts.md)
    - Public Accounts
        - WeChat Official Accounts
        - Zhihu
- [info.md](info.md)
    - Important INFO Information Collection
        - Academic Calendar
            - 2022-2023 Academic Year
        - Undergraduate Major Training Programs
        - University Promotional Materials
            - INFO Version
            - Homepage Version
        - Course Registration Schedule
        - Course Registration Shortcut
        - Course Registration System Notes
        - Final Exam Time/Location Query
        - Historical Undergraduate Course Catalogs
        - Tsinghua University New Student Orientation System
        - Registration Mark (For Student Train Tickets)
        - Campus Shuttle Buses
        - Campus Map (Static Version)
        - Tsinghua University Survey System
        - Tsinghua Zijing Code
        - eduroam
        - cksqs GPA Query
        - Tsinghua University Logistics Comprehensive Service Platform
            - Phone Numbers of Campus Units (Including Campus Hospital)
            - Campus Hospital Department Registration
            - Campus Map (Dynamic Version)
            - Online Repair Request
            - Guest Room Services
            - Vehicle Booking Services
        - Postal Code, Mailing Address and Mail Slips
        - Tsinghua University Campus Card Self-Service Query System
        - ACM/IEEE/CNKI Paper Downloads (Shibboleth or OpenAthens)
        - Train Ticket Reimbursement Vouchers
        - DIVI Device Registration
        - Tsinghua University Email
            - Tsinghua University Alumni Email
        - Tsinghua University Overleaf Service
        - LibGuides at Tsinghua University
        - Tsinghua Youth Daily
        - Dining Hall Occupancy
- [services.md](services.md)
    - Guide to Using THU Services (Primarily for Linux Users)
        - DNS/NTP
        - SSLVPN
        - Network Authentication
            - Campus Network Basics
            - CLI Authentication & Auto Authentication
                - CLI Authentication
                - Auto Authentication
            - Remote Server Proxy Authentication
            - Remote Server Web Authentication
            - Tsinghua-Secure
                - NetworkManager
                - wpa_supplicant
                - iwd
            - Tsinghua-Secure Campus-Only Login Method
        - Campus Network Characteristics Discussion
            - Layer 2 Isolation / Neighbor Discovery Isolation
                - IPv4
                - IPv6
            - Low Port Blocking
            - Dynamic IP
                - IPv6 Static Suffix or Short IPv6 Address
                - Attempting to Obtain a Specific IPv4/IPv6 Address
            - Departmental Network (Layer 3 Access) IPv6
            - Non-RFC-Compliant DHCPv6
            - 30-Minute Idle Disconnection from Network Access
            - Unable to Access External Network After Losing Authorization
            - Unable to Access External Network After Campus-Only Login
            - Other Machines Can Ping but Cannot SSH When Not Authenticated
        - Tsinghua Cloud Drive
            - Using the Terminal Client
                - Obtaining a Token
                - Replacing Partial Files for Token Login
                - Compiling the Terminal Client
            - Chrome Warning About Dangerous Downloads
        - ISATAP (Discontinued)
            - Getting IPv6 for PT
        - WIN 10 Activation
        - Licensed OS and Software Downloads
            - ITS
            - TUNA
        - Campus IP Ranges
- [templates.md](templates.md)
    - LaTeX and Other Templates
        - "How to Typeset Papers with LaTeX" Lecture Notes
        - ThuThesis
        - ThuWordThesis
        - THU-Beamer-Theme
        - Tsinghua University Chinese Beamer Template
        - TsinghuaBeamear
        - Report Presentation for Tsinghua University
        - thubeamer
        - THU coursework Template
        - Tsinghua University Modern Physics Experiment Report Template
        - THU Letter of Recommendation Template
        - A Simple Tsinghua Letterhead Template
        - CV-tsinghua-template
        - THU-Exam-LaTeX-Template
        - ilatex
- [utils.md](utils.md)
    - Scripts and Tools
        - Campus Network Authentication Tools Summary
        - INFO/Web Learning APP/Plugins
        - Course Conflict Marker
        - Remaining Course Capacity Marker
        - INFO Web Learning Telegram Push Notifications
        - Campus-Wide Washing Machine Status
            - Washing Machine Status - Query Tool (with UI)
            - Tsinghua University Laundry Room Availability Query
            - Washing Machine Status - Official Mini Program
            - Washing Machine Status - API (Text Version, Deprecated)
            - Washing Machine Status - iOS Shortcut (Unavailable)
            - Washing Machine Status - Telegram Bot Erha (Unavailable)
            - Laundry Monitoring & Alerts - WeChat Mini Program (Unavailable)
        - INFO GPA Calculator
        - Tsinghua University GPA Query
        - Rain Classroom Helper
        - Tsinghua University Integrated Platform Auto Video Playback
        - XuetangX Auto Video Playback
        - XuetangX Subtitle Downloader
        - Rain Classroom Slides Downloader
        - Tsinghua Teaching Reference Book Crawler
            - Tsinghua University Teaching Reference Service Platform
            - Wenquan Xuetang
        - Course Location Sharing
        - Registration Mark (For Train Tickets)
        - Dormitory Electricity Bill Query
        - Dormitory Water & Electricity Bill Query
        - Tsinghua Class Bell Sounds
        - Random Campus Restaurant Selector - WeChat Mini Program
        - Random Campus Restaurant Selector - Telegram Bot
        - THU Computer Science Course Guide
        - THU Software School Course Guide
        - Huaqing University Course Guide Sharing Project
        - Campus Course Evaluation Platform
        - Facts About the CS Department
        - NFSee Campus Card
        - Course Information Sharing Project
        - THU CS 912 Graduate Entrance Exam Materials
        - Tsinghua Score Scratch Card
        - thuhole memories
        - thuhole database backup
        - CS Department Student Technology Association Skill Guide
        - THU Graduate Social Practice System Crawler
- [websites.md](websites.md)
    - Commonly Used External Websites
        - thu.services
        - THU Tree Hole
        - Closed Social - Tsinghua Station
        - Online Dropout
        - Weiming BBS
        - Shuimu BBS
        - Shadiaoyuan's Blog
        - PT Sites
        - Thursday

## Know Important Information Not Listed in the Repo?

Contributions are welcome! Please [PR](https://github.com/ZenithalHourlyRate/thuservices/pulls)!

Note that [this repo](https://github.com/ZenithalHourlyRate/thuservices) uses a [pre-commit hook](https://github.com/ZenithalHourlyRate/thuservices/blob/master/pre-commit). Please [install it](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) and commit in an environment with bash and python3.

Under the pre-commit hook, README.md is auto-generated, so if you need to modify README.md, please do so in the [aux folder](https://github.com/ZenithalHourlyRate/thuservices/tree/master/aux).

Due to Windows file system limitations, the folder cannot be named aux. Please clone the project in a non-Windows environment (WSL also works).

### Building

```
python3 -m pip install --user -r requirements.txt # Install Python dependencies
mkdocs serve # Serve locally, or:
mkdocs build --clean # Build to site/ folder
```

## LICENSE

The text of this site is licensed under CC BY-NC 4.0.

The code stored in this project follows the LICENSE included in each code file. If a code file does not include a LICENSE, it is considered to currently have no LICENSE. Those with needs may contact the corresponding committer.
