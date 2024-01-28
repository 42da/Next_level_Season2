<b>1. main 접속 / 새로 고침 시</b>
- url : main
- request data
    |key|value|
    |-|-|
    |employeeId|사원 번호|

<br>

<b>2. `사원` 연차 신청 시</b><br>
<b>3. `관리자` 연차 신청 시</b><br>
- url : main/apply

<b>4. `사원` 연차 수정 후 신청 시</b><br>
<b>5. `관리자` 연차 수정 후 신청 시</b><br>
- url : main/update
- request data
    |key|value|
    |-|-|
    |code|코드|
    |start|시작 날짜|
    |end|종료 날짜|
    |content|내용|
    |employeeId|사원 번호|
    |<i>type</i>|<i>종류 (`관리자` 연차 신청 시)</i>|
    |<i>idx</i>|<i>연차 번호 (수정 후 신청 시)</i>|
- 참고
    |code|value|period|
    |-|-|-|
    |abs01|연차|1|
    |abs02|연차)오전반차|0.5|
    |abs03|연차)오후반차|0.5|
    |abs04|대체휴가|0|
    |abs05|경조휴가|0|
    |abs06|출산육아휴가|0|
    |abs07|기타|0|

    |key|기본 값|
    |-|-|
    |type|P (개인 연차)|
    |approvalStatus|W (대기)|
    |useStatus|R (미사용)|
    |applicationDate|오늘 날짜|

<br>

<b>6. `사원` 연차 삭제 시</b>
- url : main/delete
- request data
    |key|value|
    |-|-|
    |idx|연차 번호|

<br>

<b>7. `사원` 연차 취소 시</b>
- url : main/cancel
- request data
    |key|value|
    |-|-|
    |idx|연차 번호|

<br>

<b>8. `사원` 연차 취소의 취소 시</b>
- url : main/recancel
- request data
    |key|value|
    |-|-|
    |idx|연차 번호|

<br>

<b>9. `관리자` 승인/거절/취소 승인 시</b>
- url : main/approval
- request data
    |key|value|
    |-|-|
    |idx|연차 번호|
    |approvalStatus|승인 상태|
    |<i>rejectionContent</i>|<i>거절 내용 (거절 시)</i>|
