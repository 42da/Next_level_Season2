package com.nextlevel.evas.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.form.VacationApplicationForm;
import com.nextlevel.evas.repository.VacationRepository;

@Service
public class VacationService {

  private final VacationRepository vacationRepository;

  @Autowired
  public VacationService(VacationRepository vacationRepository) {
    this.vacationRepository = vacationRepository;
  }

  // main 접속, 새로 고침 시
  public Map<String, List<Vacation>> findAllList(String employeeId) {
    Map<String, List<Vacation>> result = new HashMap<String, List<Vacation>>();

    result.put("applicationList", vacationRepository.findAllApplicationByEmployeeId(employeeId));
    result.put("vacationList", vacationRepository.findAllVacationByEmployeeId(employeeId));
    result.put("calendarList", vacationRepository.findAllCalendar());

    return result;
  }

  // 연차 신청, 수정 시
  public Vacation apply(VacationApplicationForm form) {
    List<Vacation> vacationList = new ArrayList<>();

    for (String date : form.getDate()) {
      Vacation vacation = new Vacation();

      vacation.setCode(form.getCode());
      vacation.setStart(parseStringToDate(form.getStart()));
      vacation.setEnd(parseStringToDate(form.getEnd()));
      vacation.setDate(parseStringToDate(date));
      System.out.println(date);
      vacation.setContent(form.getContent());
      if (form.getIdx() != null) {
        vacation.setIdx(Integer.parseInt(form.getIdx()));
      }
      vacation.setEmployeeId(form.getEmployeeId());

      vacationList.add(vacation);
    }

    int result = 0;
    if (form.getIdx() != null) {
      result = vacationRepository.update(vacationList);
    } else {
      result = vacationRepository.insert(vacationList);
    }

    Vacation vacation = new Vacation(); // 임시
    if (result > 0) {
      return vacationRepository.findByIdx(vacation.getIdx());
    } else {
      return null;
    }
  }

  // 연차 삭제 시
  public int delete(String idx) {
    int result = vacationRepository.delete(Integer.parseInt(idx));
    if (result > 0) {
      return Integer.parseInt(idx);
    } else {
      return -1;
    }
  }

  private LocalDate parseStringToDate(String str) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate date = LocalDate.parse(str, formatter);

    System.out.println("parseStringToDate : " + date);

    return date;
  }

}
