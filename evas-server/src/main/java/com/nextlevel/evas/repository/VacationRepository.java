package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nextlevel.evas.domain.Vacation;

@Mapper
public interface VacationRepository {

  Vacation insert(Vacation vacation);
  void update(Vacation vacation);
  void delete(int idx);

  void updateApprovalStatus(int idx);
  void updateUseStatus(int idx);

  Vacation findByIdx(int idx);
  List<Vacation> findAllApplicationByEmployeeId(String employeeId);
  List<Vacation> findAllVacationByEmployeeId(String employeeId);
  List<Vacation> findAllCalendar();

}
