/*
 * TokenProvider
 * 토큰 생성, 유효성 검증
 * */

package com.nextlevel.evas.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component // TokenProvider 클래스를 자바 빈으로 등록
public class TokenProvider implements InitializingBean {

  private static final String AUTHORITIES_KEY = "auth";
  private final String secret;
  private final long tokenValidityInMilliseconds;
  private final long refreshTokenValidityInMilliseconds;
  private Key key;

  private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

  // @Value("${키}") : 빈 생성 시점에 application.properties에 정의되어 있는 값 주입
  public TokenProvider(
      @Value("${jwt.secret}") String secret,
      @Value("${jwt.token-validity-in-seconds}") long tokenValidityInMilliseconds,
      @Value("${jwt.refresh-token-validity-in-seconds}") long refreshTokenValidityInMilliseconds) {
    this.secret = secret;
    //    this.tokenValidityInMilliseconds = tokenValidityInMilliseconds * 1000;
    this.tokenValidityInMilliseconds = 1000; // refresh 토큰 테스트용
    this.refreshTokenValidityInMilliseconds = refreshTokenValidityInMilliseconds * 1000;

  }

  // 의존 관계가 끝나면 호출
  @Override
  public void afterPropertiesSet() {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    this.key = Keys.hmacShaKeyFor(keyBytes);
  }

  /*
   * // stream 생성 (내부적으로 정렬 후 반복)
   * String authorities = authentication.getAuthorities().stream()
   *     // stream 가공 (중간 연산)
   *     // (stream 요소를 변환하여 새로운 stream 형성)
   *     // map : 데이터 변환
   *     // Authentication의 getAuthorities stream을 GrantedAuthority의 getAuthority로
   *     .map(GrantedAuthority::getAuthority)
   *     // stream 결과 (최종 연산)
   *     // collect : 데이터 수집
   *     // , 구분자로 한개의 String으로 이어붙이기
   *     .collect(Collectors.joining(","));
   * 
   * 참고 : https://mangkyu.tistory.com/112
   * */

  // access 토큰 생성
  public String createToken(Authentication authentication) {
    // 권한을 가지고 옴
    String authorities = authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(","));

    // 권한 정보를 사용하여 토큰 생성
    long now = (new Date()).getTime();
    Date validity = new Date(now + this.tokenValidityInMilliseconds);

    return Jwts.builder()                           // JwtsBuilder 생성
        .setSubject(authentication.getName())       // 토큰 주제 (사용자 이름)
        .claim(AUTHORITIES_KEY, authorities)        // 토큰 정보 (auth, 사용자 권한)
        .signWith(key, SignatureAlgorithm.HS512)    // 토큰 서명 (key를 HS512 알고리즘으로)
        .setExpiration(validity)                    // 토큰 만료 시간
        .compact();                                 // 토큰 생성
  }

  // refresh 토큰 생성
  public String createRefreshToken(Authentication authentication) {
    // 권한을 가지고 옴
    String authorities = authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(","));

    long now = (new Date()).getTime();
    Date validity = new Date(now + this.refreshTokenValidityInMilliseconds);

    return Jwts.builder()                           // JwtsBuilder 생성
        .setSubject(authentication.getName())       // 토큰 주제 (사용자 이름)
        .claim(AUTHORITIES_KEY, authorities)        // 토큰 정보 (auth, 사용자 권한)
        .signWith(key, SignatureAlgorithm.HS512)    // 토큰 서명 (key를 HS512 알고리즘으로)
        .setExpiration(validity)                    // 토큰 만료 시간
        .compact();                                 // 토큰 생성
  }

  // 토큰에 있는 정보를 이용하여 Authentication 객체를 가지고 옴
  public Authentication getAuthentication(String token) {
    Claims claims = Jwts
        .parserBuilder()        // 객체 생성
        .setSigningKey(key)     // 서명 검증을 위한 키 설정
        .build()                // => 객체 생성
        .parseClaimsJws(token)  // 본문 추출
        .getBody();             // 본문 리턴 (Claims 객체)

    Collection<? extends GrantedAuthority> authorities =
        Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());  // list로 반환

    User principal = new User(claims.getSubject(), "", authorities);

    return new UsernamePasswordAuthenticationToken(principal, token, authorities);
  }

  // 토큰 유효성 검증
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
      logger.info("잘못된 JWT 서명입니다.");
    } catch (ExpiredJwtException e) {
      logger.info("만료된 JWT 토큰입니다.");
    } catch (UnsupportedJwtException e) {
      logger.info("지원되지 않는 JWT 토큰입니다.");
    } catch (IllegalArgumentException e) {
      logger.info("JWT 토큰이 잘못되었습니다.");
    }
    return false;
  }

}
