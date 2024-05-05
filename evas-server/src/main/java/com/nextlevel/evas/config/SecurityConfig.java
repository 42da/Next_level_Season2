//package com.nextlevel.evas.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
////@EnableWebSecurity
//public class SecurityConfig {
//
//  @Bean
//  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//    http
//    .authorizeHttpRequests((authz) -> authz
//        .anyRequest().authenticated() // 모든 요청에 대해 인증
//        );
//    return http.build();
//  }
//
//}
