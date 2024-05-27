package com.nextlevel.evas.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.nextlevel.evas.domain.Employee;

@Mapper
public interface RefreshTokenRepository {

  void save(@Param("loginId") String loginId, @Param("refreshToken") String refreshToken);
  void delete(String loginId);

  String findByLoginId(String loginId);
  Employee findByRefreshToken(String refreshToken); 

}
