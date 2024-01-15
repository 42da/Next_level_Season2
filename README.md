<b>1. main 접속 / 새로 고침 시</b>
- url : main
- request data
    |key|value|
    |-|-|
    |employeeId|사원 번호|

<br>

<b>2. `사원` 연차 신청 / 수정 후 신청 시</b>
- url : main/application
- request data
    |key|value|
    |-|-|
    |<i>idx</i>|<i>연차 번호 (수정 후 신청 시)</i>|
    |code|종류|
    |start|시작 날짜|
    |end|종료 날짜|
    |content|내용|
- 참고
    |code|value|period|
    |-|-|-|
    |abs01|연차|1|
    |abs02|연차)오전반차|0.5|
    |abs03|연차)오후반차|0.5|
    |abs04|대체휴가|0|
    |abs05|경조휴가|0|
    |abs06|출산육아휴가|0|
    |abs07|기타|0 <i>(상의)</i>|

    |key|기본 값|
    |-|-|
    |type|P (개인 연차)|
    |approvalStatus|W (대기)|
    |useStatus|R (미사용)|
    |applicationDate|오늘 날짜|

<br>

<b>3. `사원` 연차 수정 시</b>
- url : main/update
- request data
    |key|value|
    |-|-|
    |idx|연차 번호|

<br>

<b>4. `사원` 연차 삭제 시</b>
- url : main/delete
- request data
    |key|value|
    |-|-|
    |idx|연차 번호|
