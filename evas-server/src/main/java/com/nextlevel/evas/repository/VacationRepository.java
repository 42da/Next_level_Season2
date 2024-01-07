package com.nextlevel.evas.repository;

import java.util.List;
import com.nextlevel.evas.domain.Vacation;

public interface VacationRepository {

  void insert(Vacation absence);
  void update(Vacation absence);
  void delete(int idx);

  void updateApprovalStatus(int idx);
  void updateUseStatus(int idx);

  Vacation findByIdx(int idx);
  List<Vacation> findAllByEmpId(String empId);
  List<Vacation> findAll();

}
