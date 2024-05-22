/*
 * JwtSecurityConfig
 * TokenProvider, JwtFilter를 SecurityConfig에 적용
 * */

package com.nextlevel.evas.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

  private final TokenProvider tokenProvider;

  public JwtSecurityConfig(TokenProvider tokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  // UsernamePasswordAuthenticationFilter 앞에 jwt 커스텀 필터 추가
  @Override
  public void configure(HttpSecurity http) {
    http.addFilterBefore(
        new JwtFilter(tokenProvider),
        UsernamePasswordAuthenticationFilter.class
        );
  }

}
