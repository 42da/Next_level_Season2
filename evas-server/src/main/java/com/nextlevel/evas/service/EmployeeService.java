package com.nextlevel.evas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.repository.EmployeeRepository;

@Service
public class EmployeeService {

  private final EmployeeRepository employeeRepository;

  @Autowired
  public EmployeeService(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository; // 인터페이스가 아닌 구현체 등록
  }

  public Employee login(String loginId, String password) {
    //    String result = "";
    //
    //    if (id.equals("admin") && password.equals("admin")) {
    //      result = "ok";
    //    }
    //
    //    return result;

    return employeeRepository.findByLoginId(loginId, password);
  }
}
