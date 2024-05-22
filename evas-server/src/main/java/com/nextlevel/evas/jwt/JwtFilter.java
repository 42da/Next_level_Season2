/*
 * JwtFilter
 * jwt 커스텀 필터
 * */

package com.nextlevel.evas.jwt;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

public class JwtFilter extends GenericFilterBean {

  public static final String AUTHORIZATION_HEADER = "Authorization";
  private TokenProvider tokenProvider;

  private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

  public JwtFilter(TokenProvider tokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  // 토큰의 인증 정보를 SecurityContext에 저장
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
    String jwt = resolveToken(httpServletRequest);
    String requestURI = httpServletRequest.getRequestURI();

    // StringUtils.hasText(string) : string이 null이 아니고, 길이가 0보다 크고, 공백이 아닌 문자가 포함되어 있는지 확인
    if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {     // 토큰 유효성 검증
      Authentication authentication = tokenProvider.getAuthentication(jwt); // 토큰에 있는 정보를 이용하여 Authentication 객체를 가지고 옴
      SecurityContextHolder.getContext().setAuthentication(authentication);
      logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
    } else {
      logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
    }

    filterChain.doFilter(servletRequest, servletResponse);
  }

  // 리퀘스트 헤더에서 토큰 정보를 가지고 옴
  private String resolveToken(HttpServletRequest request) {
    String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }

    return null;
  }

}
