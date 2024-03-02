package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.domain.Vacation;

@Mapper
public interface AdminRepository {

  List<Employee> findAllEmployee();

  List<Vacation> findAllApplication();
  List<Vacation> findAllVacation();

}
