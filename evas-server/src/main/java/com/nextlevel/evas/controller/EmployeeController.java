package com.nextlevel.evas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.form.EmployeeLoginForm;
import com.nextlevel.evas.jwt.JwtFilter;
import com.nextlevel.evas.jwt.TokenProvider;
import com.nextlevel.evas.service.EmployeeService;

@Controller
public class EmployeeController {

  private final EmployeeService employeeService;
  private final TokenProvider tokenProvider;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;

  @Autowired
  public EmployeeController(EmployeeService employeeService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
    this.employeeService = employeeService;
    this.tokenProvider = tokenProvider;
    this.authenticationManagerBuilder = authenticationManagerBuilder;
  }

  @PostMapping("login")
  // json 형태이기 때문에 @ResponseBody, @RequestBody 필요
  @ResponseBody
  // EmployeeLoginForm 과 같이 파라미터 타입이 자바 객체라면 자바 객체로 변환해줌
  // 단, passWd와 같이 자바 객체에 json의 key에 해당하는 값의 변수와 getter가 있어야 함
  public Employee login(@RequestBody EmployeeLoginForm form) {
    System.out.println("in");

    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(form.getLoginId(), form.getPassword());

    // authenticate 메소드 실행 시 loadUserByName 실행
    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = tokenProvider.createToken(authentication);

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

    return employeeService.login(form.getLoginId(), form.getPassword(), jwt);
  }

}
