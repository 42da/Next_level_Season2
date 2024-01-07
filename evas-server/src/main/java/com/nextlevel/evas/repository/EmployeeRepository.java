package com.nextlevel.evas.repository;

import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import com.nextlevel.evas.domain.Employee;

@Mapper
public interface EmployeeRepository {

  void updateTotalVacation(int idx);

  Optional<Employee> findByLogId(String logId, String pw);
  Employee findByEmpId(String empId);

}
