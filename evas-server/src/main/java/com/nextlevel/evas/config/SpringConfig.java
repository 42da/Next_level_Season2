package com.nextlevel.evas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    // 모든 경로에 대해
    registry.addMapping("/**")
    // http://localhost:3000 origin에 대해
    .allowedOriginPatterns("http://localhost:3000")
    // GET, POST 메서드를 허용한다.
    .allowedMethods("GET", "POST")
    .allowCredentials(true);
  }

}
