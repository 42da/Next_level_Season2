# EVAS
<b>EVAS (Electronic Vacation Approval System, 연차 전자 결재 시스템)</b>은 연차 신청 과정에서 발생하던 불편함을 개선하기 위해 시작되었습니다.
기존 회사에서는 연차 신청 시 서면으로 담당자의 서명을 받아야 했으며, 담당자가 부재중일 경우 신청 절차가 지연되는 문제가 있었습니다.
이러한 문제를 해결하고자 연차 신청 과정을 디지털화하여 효율성과 편의성을 높이는 연차 전자 결재 시스템을 개발했습니다.

<br>

### 팀원 소개
|이서은|정기평|
|-|-|
|Back-End|Front-End|
|[GitHub](https://github.com/leeseoeun)|[GitHub](https://github.com/42da)|

<br>

### 사용 기술
||Back-End|Front-End|
|-|-|-|
|**Language**|Java|JavaScript|
|**Framework**|Spring Boot, MyBatis|React|
|**Database**|MySQL||
|**IDE**|Eclipse|Visual Studio Code|

<br>

### 기능 명세
[기능 명세서](./functional_specification.md)

<br>

### 구현 기능
- **로그인, 로그아웃**
    - Spring Security와 JWT를 사용하여 토큰 기반 인증 구현
    - 사용자, 관리자 권한 부여

<img src="./image/login.PNG" style="border: solid 1px">

<br>

- **메인**
    - 화면에서 전체 연차와 남은 연차를 한눈에 확인 가능하도록 구성 (남은 연차/전체 연차)
    - 화면 왼쪽에 연차 CRUD 기능을 제공하는 컴포넌트를 배치하고, 오른쪽에는 연차 현황을 시각적으로 확인할 수 있는 캘린더 배치

<img src="./image/employee_apply.PNG" style="border: solid 1px">

<br>

- **사용자**
    - 연차 신청, 조회(목록), 수정, 삭제, 취소

|||
|-|-|
|▽ 연차 신청|▽ 연차 조회(목록)|
|<img src="./image/l_employee_apply.PNG">|<img src="./image/l_employee_application_list.PNG">|
|▽ 연차 수정, 삭제|▽ 연차 취소|
|<img src="./image/l_employee_update.PNG">|<img src="./image/l_employee_cancel.PNG">|

<br>

- **관리자**
    - 회사 전체 연차 신청, 조회(목록), 승인, 거절
    - 각 사원 연차 신청, 조회(목록)

|||
|-|-|
|▽ 연차 신청|▽ 연차 조회(목록)|
|<img src="./image/l_admin_apply.PNG">|<img src="./image/l_admin_vacation_list.PNG">|
|▽ 연차 승인|▽ 연차 거절|
|<img src="./image/l_admin_approve.PNG">|<img src="./image/l_admin_reject.PNG">|

<br>

### 데이터베이스 모델링
<img src="./image/erd.PNG" style="border: solid 1px">
