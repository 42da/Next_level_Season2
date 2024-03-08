package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.domain.VacationDate;

@Mapper
public interface AdminRepository {

  // 사원
  List<Employee> findAllEmployee();

  // 전체 연차
  int insertWhole(Vacation vacation);
  int updateWhole(Vacation vacation);

  Vacation findWholeByIdx(int idx);

  // 사원 연차
  int insert(Vacation vacation);
  int update(Vacation vacation);

  Vacation findByIdx(int idx);
  List<Vacation> findAllApplication();
  List<Vacation> findAllVacation();

  // 연차 날짜
  int insertDate(List<VacationDate> vacationDateList);
  int deleteDate(int vacationIdx);

}
