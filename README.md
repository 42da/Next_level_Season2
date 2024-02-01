1. 로그인
- 로그인 아이디, 비밀번호로 로그인
- 응답으로 사원 객체가 오면 로그인 성공
    - 관리자 여부가 false로 오면 `사원` 메인 페이지로 이동
    - true로 오면 `관리자` 메인 페이지로 이동
- null이 오면 로그인 실패

<br>

2. `사원` 메인
- 연차 신청
    - url : main/apply
    - request data
        |key|value|
        |-|-|
        |code|코드|
        |start|시작 날짜|
        |end|종료 날짜|
        |content|내용|
        |employeeId|사원 번호|
        |<b>date</b>|<b>배열로 (한개도)<br>2024년 기준 주말, 공휴일, 대체 공휴일 제외</b>|
- 신청 현황<br>
    - | 연차 종류 | 기간 | 사유 | 승인 상태 | 수정/삭제 |
    - 수정 시 url : main/update
    - request data
        |key|value|
        |-|-|
        |연차 신청과 동일||
        |idx|연차 번호|
    - 삭제 시 url : main/delete
    - request data
        |key|value|
        |-|-|
        |idx|연차 번호|
    - <b>예) 현재 날짜 : 2024년 1월 28일<br>
    사용 날짜 : 2024년 2월 15일</b><br>
        - 대기, 거절, 취소 : 사용 달 기준으로 보여 주기<br>
            <b>(2024년 2월 29일까지 보여 주기)</b>
- 연차 목록
    - | 연차 종류 | 기간 | 사유 | 사용 상태 | 취소 |
    - 취소 시 url : main/cancel
    - request data
        |key|value|
        |-|-|
        |idx|연차 번호|
        |<b>cancellationContent</b>|<b>취소 내용</b>|
    - 승인 연차만 보여 주기<br>
        - 취소 신청 시 신청 현황으로 이동
- 달력
    - 전체 사원, 대기, 승인 연차만 보여 주기
        - <b>(2023년 7월 1일부터 2024년 7월 31일까지 보여 주기)</b>

<br>

3. `관리자` 메인
- 로그인 시
    - <b>관리자 버튼 추가</b>
    - 연차 신청 (`사원` 연차 신청과 동일)
    - 신청 현황 (`사원` 신청 현황과 동일)
    - 연차 목록 (`사원` 연차 목록과 동일)
    - 달력 (`사원` 달력과 동일)
- 관리자 버튼 클릭 시
    - 사원 버튼 추가
    - 연차 신청
        - url : admin/apply
        - request data
            |key|value|
            |-|-|
            |연차 신청과 동일||
            |type|종류 (`관리자` 연차 신청 시)|
        - 전체 연차 추가
    - 전체 신청 현황
        - 승인 시 url : admin/approve
        - request data
            |key|value|
            |-|-|
            |idx|배열로 (한개도)|
        - 거절 시 url : admin/reject
        - request data
            |key|value|
            |-|-|
            |idx|배열로 (한개도)|
            |<b>rejectionContent</b>|<b>취소 내용</b>|
        - select box로 전체, 사원 선택 추가
        - check box 추가
            - 대기 : 체크 박스로 선택 후 일괄 승인/거절
    - 전체 연차 목록
        - select box로 전체, 사원 선택 추가
