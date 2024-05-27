package com.nextlevel.evas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.jwt.JwtFilter;
import com.nextlevel.evas.jwt.TokenProvider;
import com.nextlevel.evas.repository.EmployeeRepository;
import com.nextlevel.evas.repository.RefreshTokenRepository;

@Service
public class EmployeeService implements UserDetailsService {

  private final EmployeeRepository employeeRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final TokenProvider tokenProvider;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;

  @Autowired
  public EmployeeService(EmployeeRepository employeeRepository, RefreshTokenRepository refreshTokenRepository,
      TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
    this.employeeRepository = employeeRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.tokenProvider = tokenProvider;
    this.authenticationManagerBuilder = authenticationManagerBuilder;
  }

  public Employee login(String loginId, String password) {
    Employee employee = employeeRepository.findByLoginId(loginId, password);
    if (employee != null) {
      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, password);

      // authenticate 메소드 실행 시 loadUserByName 실행
      Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String accessJwt = tokenProvider.createToken(authentication);

      String refreshJwt = refreshTokenRepository.findByLoginId(loginId);
      if (refreshJwt != null) {
        refreshTokenRepository.delete(loginId);
      }
      refreshJwt = tokenProvider.createRefreshToken(authentication);
      refreshTokenRepository.save(loginId, refreshJwt);

      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + accessJwt);
      httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, "Bearer " + refreshJwt);

      employee.setUseVacationCount(employeeRepository.findUseVacationCountByEmployeeId(employee.getEmployeeId()));
      employee.setAccessToken(accessJwt);
      employee.setRefreshToken(refreshJwt);

      return employee;
    }

    return null;
  }

  public void logout(String loginId) {
    refreshTokenRepository.delete(loginId);
  }

  @Override
  public UserDetails loadUserByUsername(final String username) {
    Employee employee = employeeRepository.findAuthorityByLoginId(username);

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
