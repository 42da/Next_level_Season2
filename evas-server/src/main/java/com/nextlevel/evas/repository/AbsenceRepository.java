package com.nextlevel.evas.repository;

import java.util.Date;
import java.util.List;
import com.nextlevel.evas.domain.Absence;

public interface AbsenceRepository {

  void insert(Absence absence);
  void update(Absence absence);
  void delete(int idx);

  Absence findByIdx(int idx);
  List<Absence> findAllByEmpId(String empId);           // 사원당 연차 리스트
  List<Absence> findAllByStartMonth(Date startMonth);   // 시작 달당 연차 리스트

}
