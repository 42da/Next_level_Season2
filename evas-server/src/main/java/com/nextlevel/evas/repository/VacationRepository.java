package com.nextlevel.evas.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.nextlevel.evas.domain.Vacation;

@Mapper
public interface VacationRepository {

  int insert(Vacation vacation);
  int update(Vacation vacation);
  int delete(int idx);

  int updateApprovalStatus(@Param("idx") int idx, @Param("approvalStatus") String approvalStatus, @Param("rejectionContent") String rejectionContent);
  void updateUseStatus(int idx);

  Vacation findByIdx(int idx);
  List<Vacation> findAllApplicationByEmployeeId(String employeeId);
  List<Vacation> findAllVacationByEmployeeId(String employeeId);
  List<Vacation> findAllCalendar();

}
