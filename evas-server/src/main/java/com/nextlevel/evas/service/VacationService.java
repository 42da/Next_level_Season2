package com.nextlevel.evas.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
  public Map<String, List<Vacation>> findAllVacation(String employeeId) {
    Map<String, List<Vacation>> result = new HashMap<String, List<Vacation>>();

    // 신청 현황
    result.put("applicationList", vacationRepository.findAllApplicationByEmployeeId(employeeId));
    // 연차 목록
    result.put("vacationList", vacationRepository.findAllVacationByEmployeeId(employeeId));
    // 달력
    result.put("calendarList", vacationRepository.findAllCalendar());

    return result;
  }

}
