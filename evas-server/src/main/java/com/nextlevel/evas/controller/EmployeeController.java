package com.nextlevel.evas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.service.EmployeeService;

@Controller
public class EmployeeController {

  private final EmployeeService employeeService;

  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @PostMapping("login")
  @ResponseBody
  // json 형태이기 때문에 @RequestBody 필요
  public Employee login(@RequestBody EmployeeLoginForm form) {
    return employeeService.login(form.getId(), form.getPasswd());
  }

}
