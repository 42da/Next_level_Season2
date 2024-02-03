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
import com.nextlevel.evas.domain.VacationHistory;
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
    Vacation vacation = new Vacation();

    vacation.setCode(form.getCode());
    vacation.setStart(parseStringToDate(form.getStart()));
    vacation.setEnd(parseStringToDate(form.getEnd()));
    vacation.setContent(form.getContent());
    vacation.setEmployeeId(form.getEmployeeId());

    int result = 0;
    // 수정
    if (form.getIdx() != null) {
      vacation.setIdx(Integer.parseInt(form.getIdx()));

      result = vacationRepository.update(vacation);
      if (result > 0) {
        result = 0;
        return updateVacationHistory(vacation, form.getDate());
      } else {
        return null;
      }

      // 신청
    } else {
      result = vacationRepository.insert(vacation);
      if (result > 1) {
        result = 0;
        return insertVacationHistory(vacation, form.getDate());
      } else {
        return null;
      }
    }
  }

  // 연차 삭제 시
  public int delete(String idx) {
    int result = vacationRepository.deleteHistory(Integer.parseInt(idx));
    if (result > 0) {
      result = 0;
      result = vacationRepository.delete(Integer.parseInt(idx));
      if (result > 0) {
        return Integer.parseInt(idx);
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }

  private LocalDate parseStringToDate(String str) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate date = LocalDate.parse(str, formatter);

    return date;
  }

  private List<LocalDate> parseStringListToDate(List<String> strList) {
    List<LocalDate> dateList = new ArrayList<>();
    for (String str : strList) {
      dateList.add(parseStringToDate(str));
    }
    return dateList;
  }

  private List<VacationHistory> createVacationHistory(int idx, List<String> vacationDateList) {
    List<VacationHistory> vacationHistoryList = new ArrayList<>();

    for (String date : vacationDateList) {
      VacationHistory vacationHistory = new VacationHistory();

      vacationHistory.setVacationIdx(idx);
      vacationHistory.setDate(parseStringToDate(date));

      vacationHistoryList.add(vacationHistory);
    }

    return vacationHistoryList;
  }

  private Vacation insertVacationHistory(Vacation vacation, List<String> vacationDateList) {
    List<VacationHistory> vacationHistoryList = createVacationHistory(vacation.getIdx(), vacationDateList);

    int result = vacationRepository.insertHistory(vacationHistoryList);
    if (result > 0) {
      vacation.setDate(parseStringListToDate(vacationDateList));
      return vacation;
    } else {
      return null;
    }
  }

  private Vacation updateVacationHistory(Vacation vacation, List<String> vacationDateList) {
    List<VacationHistory> vacationHistoryList = createVacationHistory(vacation.getIdx(), vacationDateList);

    int result = vacationRepository.deleteHistory(vacation.getIdx());
    if (result > 0) {
      result = 0;
      result = vacationRepository.insertHistory(vacationHistoryList);
      if (result > 0) {
        vacation.setDate(parseStringListToDate(vacationDateList));
        return vacation;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

}
