package com.nextlevel.evas.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.nextlevel.evas.domain.Employee;

@Mapper
public interface EmployeeRepository {

  void updateTotalVacation(int idx);

  Employee findByLoginId(@Param("loginId") String loginId, @Param("password") String password);
  Employee findByEmployeeId(String employeeId);

}
