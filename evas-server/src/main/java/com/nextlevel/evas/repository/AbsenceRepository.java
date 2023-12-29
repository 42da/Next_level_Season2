package com.nextlevel.evas.repository;

import java.util.List;
import com.nextlevel.evas.domain.Absence;

public interface AbsenceRepository {

  void insert(Absence absence);
  void update(Absence absence);
  void delete(int idx);

  void updateStatus(int idx);

  Absence findByIdx(int idx);
  List<Absence> findAllByEmpId(String empId);
  List<Absence> findAll();

}
