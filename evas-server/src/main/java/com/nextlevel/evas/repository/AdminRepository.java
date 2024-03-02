package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.domain.VacationDate;

@Mapper
public interface AdminRepository {

  List<Employee> findAllEmployee();

  int insert(Vacation vacation);
  int update(Vacation vacation);

  Vacation findByIdx(int idx);
  List<Vacation> findAllApplication();
  List<Vacation> findAllVacation();

  int insertDate(List<VacationDate> vacationDateList);
  int deleteDate(int vacationIdx);

}
