-- employee 테이블
INSERT INTO employee(login_id, password, employee_id, name, reset_vacation_date, total_vacation_count, is_admin, authority)
VALUES ('gipyeong', 'gipyeong', 'R20210701', '정기평', '2021-07-05', 15, TRUE, 'ADMIN');

INSERT INTO employee(login_id, password, employee_id, name, reset_vacation_date, total_vacation_count, is_admin, authority)
VALUES ('seoeun', 'seoeun', 'R20220202', '이서은', '2022-02-14', 15, TRUE, 'ADMIN');

INSERT INTO employee(login_id, password, employee_id, name, reset_vacation_date, total_vacation_count, is_admin, authority)
VALUES ('jooyoung', 'jooyoung', 'R20210601', '최주영', '2021-06-21', 15, FALSE, 'USER');

INSERT INTO employee(login_id, password, employee_id, name, reset_vacation_date, total_vacation_count, is_admin, authority)
VALUES ('seokwon', 'seokwon', 'R20220201', '임석원', '2022-02-14', 15, FALSE, 'USER');

-- vacation 테이블
INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-01-09', '2024-01-09', '개인 사정', 'W', 'R', 'R20210701');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs02', '2024-02-13', '2024-02-13', '졸업식', 'A', 'U', 'R20220202');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-02-15', '2024-02-15', '긴히 쓸 일이 있어용', 'R', 'R', 'R20210601');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs03', '2024-03-10', '2024-03-10', '저도 긴히 쓸 일이 있어용', 'C', 'R', 'R20220201');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs04', '2024-04-21', '2024-04-21', '생일자 조기 퇴근', 'W', 'R', 'R20210701');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs07', '2024-06-10', '2024-06-10', '집에 가고 싶어요', 'A', 'R', 'R20220202');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-09-18', '2024-09-20', '저도 집에 가고 싶어요', 'R', 'U', 'R20210701');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs04', '2024-12-11', '2024-12-11', '아플 예정', 'C', 'U', 'R20210701');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-06-21', '2024-06-24', '해외 봉사', 'A', 'R', 'R20210701');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-07-15', '2024-07-19', '여름 휴가', 'W', 'R', 'R20220202');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs07', '2024-07-31', '2024-07-31', '생일자 조기 퇴근', 'A', 'R', 'R20220202');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-07-17', '2024-07-19', '여름 휴가', 'W', 'R', 'R20210701');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-07-08', '2024-07-10', '여름 휴가', 'W', 'R', 'R20210601');

INSERT INTO vacation(code, start, end, content, approval_status, use_status, employee_id)
VALUES ('abs01', '2024-07-08', '2024-07-11', '여름 휴가', 'W', 'R', 'R20220201');

-- vacation_date 테이블
INSERT INTO vacation_date(vacation_idx, date)
VALUES (1, '2024-01-09');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (2, '2024-02-13');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (3, '2024-02-15');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (4, '2024-03-10');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (5, '2024-04-21');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (6, '2024-06-10');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (7, '2024-09-18');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (7, '2024-09-19');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (7, '2024-09-20');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (8, '2024-12-11');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (9, '2024-06-21');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (9, '2024-06-24');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (10, '2024-07-15');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (10, '2024-07-16');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (10, '2024-07-17');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (10, '2024-07-18');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (10, '2024-07-19');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (11, '2024-07-31');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (12, '2024-07-17');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (12, '2024-07-18');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (12, '2024-07-19');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (13, '2024-07-08');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (13, '2024-07-09');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (13, '2024-07-10');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (14, '2024-07-08');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (14, '2024-07-09');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (14, '2024-07-10');

INSERT INTO vacation_date(vacation_idx, date)
VALUES (14, '2024-07-11');

-- whole_vacation 테이블
INSERT INTO whole_vacation(start, end, content, use_status)
VALUES ('2024-06-07', '2024-06-07', '전체 연차) 현충일', 'R');

INSERT INTO whole_vacation(start, end, content, use_status)
VALUES ('2024-08-16', '2024-08-16', '전체 연차) 광복절', 'R');

INSERT INTO whole_vacation(start, end, content, use_status)
VALUES ('2024-10-04', '2024-10-04', '전체 연차) 개천절', 'R');

-- whole_vacation_date 테이블
INSERT INTO whole_vacation_date(vacation_idx, date)
VALUES (1, '2024-06-07');

INSERT INTO whole_vacation_date(vacation_idx, date)
VALUES (2, '2024-08-16');

INSERT INTO whole_vacation_date(vacation_idx, date)
VALUES (3, '2024-10-04');

-- vacation_code 테이블
INSERT INTO vacation_code(code, name, value)
VALUES ('abs01', '연차', 1);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs02', '연차)오전반차', 0.5);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs03', '연차)오후반차', 0.5);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs04', '대체휴가', 0);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs05', '경조휴가', 0);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs06', '출산육아휴가', 0);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs07', '기타', 0);

INSERT INTO vacation_code(code, name, value)
VALUES ('abs08', '전체연차', 1);
