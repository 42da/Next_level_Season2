package com.nextlevel.evas.repository;

import java.util.List;
import com.nextlevel.evas.domain.Annual;

public interface AnnualRepository {

  void insert(Annual annual);
  void update(Annual annual);
  void delete(int idx);

  void updateTotal(String empId);
  void updateReservation(int idx);
  void updateStatus(int idx);

  Annual findByIdx(int idx);
  List<Annual> findAllByEmpId(String empId);
  List<Annual> findAll();

}
