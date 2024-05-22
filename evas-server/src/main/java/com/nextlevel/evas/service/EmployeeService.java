package com.nextlevel.evas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.repository.EmployeeRepository;

@Service
public class EmployeeService implements UserDetailsService {

  private final EmployeeRepository employeeRepository;

  @Autowired
  public EmployeeService(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public Employee login(String loginId, String password, String jwt) {
    Employee employee = employeeRepository.findByLoginId(loginId, password);
    if (employee != null) {
      employee.setUseVacationCount(employeeRepository.findUseVacationCountByEmployeeId(employee.getEmployeeId()));
      employee.setAccessToken(jwt);
    }

    return employee;
  }

  @Override
  public UserDetails loadUserByUsername(final String username) {
    Employee employee = employeeRepository.findWithAuthoritiesByLoginId(username);

    if (employee == null) {
      throw new UsernameNotFoundException(username);
    }

    BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
    String password = bcryptPasswordEncoder.encode(employee.getPassword());

    return User.builder()
        .username(employee.getLoginId())
        .password(password)
        .roles(employee.getAuthority())
        .build();
  }

}
