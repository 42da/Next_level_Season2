package com.nextlevel.evas.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
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

  // 연차 신청, 수정 후 신청 시
  public Vacation apply(VacationApplicationForm form) {
    Vacation vacation = new Vacation();

    vacation.setCode(form.getCode());
    vacation.setStart(parseStringToDate(form.getStart()));
    vacation.setEnd(parseStringToDate(form.getEnd()));
    vacation.setContent(form.getContent());

    vacation.setPeriod(calculatePeriod(vacation.getCode(), vacation.getStart(), vacation.getEnd()));
    if (form.getType() != null) { 
      vacation.setType(form.getType());
    } else {
      vacation.setType("P");
    }

    vacation.setEmployeeId(form.getEmployeeId());

    // 수정
    if (form.getIdx() != null) {
      vacation.setIdx(Integer.parseInt(form.getIdx()));

      int result = vacationRepository.update(vacation);
      if (result > 0) {
        return vacationRepository.findByIdx(vacation.getIdx());
      } else {
        return null;
      }

      // 신청
    } else {
      int result = vacationRepository.insert(vacation);
      if (result > 0) {
        return vacationRepository.findByIdx(vacation.getIdx());
      } else {
        return null;
      }
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

  // 연차 승인/거절 시
  public Vacation approve(String idx, String approvalStatus, String rejectionContent) {
    int result = vacationRepository.updateApprovalStatus(Integer.parseInt(idx), approvalStatus, rejectionContent);
    if (result > 0) {
      return vacationRepository.findByIdx(Integer.parseInt(idx)); 
    } else {
      return null;
    }
  }

  private LocalDate parseStringToDate(String str) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate date = LocalDate.parse(str, formatter);

    System.out.println("parseStringToDate : " + date);

    return date;
  }

  private Float calculatePeriod(String code, LocalDate start, LocalDate end) {
    float period = 0;

    if (code.equals("abs01")) {
      period = Period.between(start, end).getDays();
    } else if (code.equals("abs02") || code.equals("abs03")) {
      period = (float) 0.5;
    }

    System.out.println("calculatePeriod : " + period);

    return period;
  }

}
