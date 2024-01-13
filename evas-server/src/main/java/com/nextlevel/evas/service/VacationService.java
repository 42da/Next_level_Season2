package com.nextlevel.evas.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.repository.VacationRepository;

@Service
public class VacationService {

  private final VacationRepository vacationRepository;

  @Autowired
  public VacationService(VacationRepository vacationRepository) {
    this.vacationRepository = vacationRepository;
  }

  // 연차 목록
  public List<Vacation> findAllByEmployeeId(String employeeId) {
    return vacationRepository.findAllByEmployeeId(employeeId);
  }

}
