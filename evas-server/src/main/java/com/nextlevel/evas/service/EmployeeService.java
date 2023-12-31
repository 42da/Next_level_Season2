package com.nextlevel.evas.service;

import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

  //  private final EmployeeRepository employeeRepository;
  //
  //  @Autowired
  //  public EmployeeService(EmployeeRepository employeeRepository) {
  //    this.employeeRepository = employeeRepository; // 인터페이스가 아닌 구현체 등록
  //  }

  public String login(String id, String pw) {
    String result = "";

    if (id.equals("admin") && pw.equals("admin")) {
      result = "ok";
    }

    return result;
  }
}
