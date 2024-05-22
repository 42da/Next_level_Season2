package com.nextlevel.evas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.nextlevel.evas.jwt.JwtAccessDeniedHandler;
import com.nextlevel.evas.jwt.JwtAuthenticationEntryPoint;
import com.nextlevel.evas.jwt.JwtSecurityConfig;
import com.nextlevel.evas.jwt.TokenProvider;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // 메소드 단위로 권한 설정
public class SecurityConfig {

  private final TokenProvider tokenProvider;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

  public SecurityConfig(
      TokenProvider tokenProvider,
      JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
      JwtAccessDeniedHandler jwtAccessDeniedHandler
      ) {
    this.tokenProvider = tokenProvider;
    this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
  }

  // 비밀번호 암호화
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
    .authorizeHttpRequests((authz) -> authz
        .requestMatchers("/login").permitAll()  // 로그인 요청 시 토큰이 없기 때문에 허용
        .anyRequest().authenticated()           // 모든 요청에 대해 인증
        )

    // 익셉션 핸들링
    .exceptionHandling(exceptionHandling -> exceptionHandling
        .accessDeniedHandler(jwtAccessDeniedHandler)
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        )

    // token을 사용하는 방식이기 때문에 csrf를 disable
    .csrf(AbstractHttpConfigurer::disable)

    // 세션을 사용하지 않기 때문에 STATELESS로 설정
    .sessionManagement(sessionManagement ->
    sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )

    // jwt 커스텀 필터 추가
    .with(new JwtSecurityConfig(tokenProvider), customizer -> {});

    return http.build();
  }

}
