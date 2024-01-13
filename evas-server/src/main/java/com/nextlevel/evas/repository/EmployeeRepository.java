package com.nextlevel.evas.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.nextlevel.evas.domain.Employee;

@Mapper
public interface EmployeeRepository {

  // mybatis에서 파라미터가 두개 이상이라면 때문에 @Param("xml파일에서사용할이름") 필요
  Employee findByLoginId(@Param("loginId") String loginId, @Param("password") String password);

}
