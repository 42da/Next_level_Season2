package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.domain.VacationHistory;

@Mapper
public interface VacationRepository {

  int insert(Vacation vacation);
  int update(Vacation vacation);
  int delete(int idx);

  int insertHistory(List<VacationHistory> vacationList);
  int deleteHistory(int vacationIdx);

  Vacation findByIdx(int idx);
  List<Vacation> findAllApplicationByEmployeeId(String employeeId);
  List<Vacation> findAllVacationByEmployeeId(String employeeId);
  List<Vacation> findAllCalendar();

}
