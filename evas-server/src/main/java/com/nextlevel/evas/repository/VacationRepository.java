package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.domain.VacationDate;

@Mapper
public interface VacationRepository {

  int insert(Vacation vacation);
  int update(Vacation vacation);
  int delete(int idx);

  int updateUseStatus();
  int updateWholeUseStatus();

  int updateCancellationContent(@Param("idx") int idx, @Param("cancellationContent") String cancellationContent);

  Vacation findByIdx(int idx);
  List<Vacation> findAllApplicationByEmployeeId(String employeeId);
  List<Vacation> findAllVacationByEmployeeId(String employeeId);
  List<Vacation> findAllCalendar();

  int insertDate(List<VacationDate> vacationDateList);
  int deleteDate(int vacationIdx);

}
