-- 사원 테이블 생성
CREATE TABLE employee
(
  login_id VARCHAR(15) NOT NULL,
  password VARCHAR(15) NOT NULL, -- 아이디와 동일 (임시)
  employee_id CHAR(9) NOT NULL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  reset_vacation_date DATE NOT NULL,
  total_vacation_count FLOAT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  authority CHAR(5) DEFAULT 'USER'
);

-- 사원 연차 테이블 생성
CREATE TABLE vacation
(
  idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(5) NOT NULL,
  start DATE NOT NULL,
  end DATE NOT NULL,
  content VARCHAR(300) NOT NULL,
  approval_status CHAR(1) DEFAULT 'W',
  use_status CHAR(1) DEFAULT 'R',
  employee_id CHAR(9) NOT NULL,
  rejection_content VARCHAR(300),
  cancellation_content VARCHAR(300),
  
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- 연차 날짜 테이블 생성
CREATE TABLE vacation_date
(
  idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  vacation_idx INT NOT NULL,
  date DATE NOT NULL,
  
  FOREIGN KEY (vacation_idx) REFERENCES vacation(idx)
);

-- 전체 연차 테이블 생성
CREATE TABLE whole_vacation
(
  idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(5) DEFAULT 'abs08',
  start DATE NOT NULL,
  end DATE NOT NULL,
  content VARCHAR(300) NOT NULL,
  approval_status CHAR(1) DEFAULT 'A',
  use_status CHAR(1) DEFAULT 'R',
  employee_id CHAR(9) DEFAULT '',
  rejection_content VARCHAR(300) DEFAULT '',
  cancellation_content VARCHAR(300) DEFAULT ''
);

-- 전체 연차 날짜 테이블 생성
CREATE TABLE whole_vacation_date
(
  idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  vacation_idx INT NOT NULL,
  date DATE NOT NULL,
  
  FOREIGN KEY (vacation_idx) REFERENCES whole_vacation(idx)
);

-- 연차 코드 테이블 생성
CREATE TABLE vacation_code
(
  code VARCHAR(5) NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  value float NOT NULL
);

-- refresh 토큰 테이블 생성
CREATE TABLE refresh_token
(
  login_id VARCHAR(15) NOT NULL,
  token TEXT NOT NULL
);
