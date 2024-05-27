package com.nextlevel.evas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.AccessToken;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.jwt.JwtFilter;
import com.nextlevel.evas.jwt.TokenProvider;
import com.nextlevel.evas.repository.EmployeeRepository;
import com.nextlevel.evas.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {

  private final EmployeeRepository employeeRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final TokenProvider tokenProvider;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;

  @Autowired
  public RefreshTokenService(EmployeeRepository employeeRepository, RefreshTokenRepository refreshTokenRepository,
      TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
    this.employeeRepository = employeeRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.tokenProvider = tokenProvider;
    this.authenticationManagerBuilder = authenticationManagerBuilder;
  }

  public AccessToken createAccessToken(String refreshToken) {
    Employee employee = refreshTokenRepository.findByRefreshToken(refreshToken);

    if (employee != null) {
      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(employee.getLoginId(), employee.getPassword());

      // authenticate 메소드 실행 시 loadUserByName 실행
      Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String accessJwt = tokenProvider.createToken(authentication);

      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + accessJwt);

      AccessToken accessToken = new AccessToken();
      accessToken.setAccessToken(accessJwt);

      return accessToken;
    }

    return null;
  }

}
