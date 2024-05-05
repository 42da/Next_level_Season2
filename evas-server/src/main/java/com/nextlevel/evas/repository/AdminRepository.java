package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
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
  int deleteWhole(int idx);

  Vacation findWholeByIdx(int idx);

  // 사원 연차
  int insert(Vacation vacation);
  int update(Vacation vacation);
  int delete(int idx);

  int updateAppravalStatus(@Param("idx") int idx, @Param("approvalStatus") String approvalStatus, @Param("rejectionContent") String rejectionContent);

  Vacation findByIdx(int idx);

  List<Vacation> findApplicationByEmployeeId(String employeeId);
  List<Vacation> findVacationByEmployeeId(String employeeId);

  List<Vacation> findAllApplication();
  List<Vacation> findAllVacation();

  // 사원 연차 날짜
  int insertDate(List<VacationDate> vacationDateList);
  int deleteDate(int vacationIdx);

  // 전체 연차 날짜
  int insertWholeDate(List<VacationDate> vacationDateList);
  int deleteWholeDate(int vacationIdx);

}
