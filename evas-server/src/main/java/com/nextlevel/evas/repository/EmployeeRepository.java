package com.nextlevel.evas.repository;

import java.util.Optional;
import com.nextlevel.evas.domain.Employee;

public interface EmployeeRepository {

  Optional<Employee> findByLogId(String logId, String pw);
  Employee findByEmpId(String empId, String pw);

}
