package com.nextlevel.evas.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.domain.VacationDate;
import com.nextlevel.evas.form.VacationApplicationForm;
import com.nextlevel.evas.repository.AdminRepository;

@Service
public class AdminService {

  private final AdminRepository adminRepository;

  @Autowired
  public AdminService(AdminRepository adminRepository) {
    this.adminRepository = adminRepository;
  }

  // 관리자 전환 시 사원 목록
  public Map<String, List<Employee>> findAllEmployeeList() {
    Map<String, List<Employee>> result = new HashMap<String, List<Employee>>();

    result.put("employeeList", adminRepository.findAllEmployee());

    return result;
  }

  // 관리자 전환 시 연차 목록
  public Map<String, List<Vacation>> findAllList() {
    Map<String, List<Vacation>> result = new HashMap<String, List<Vacation>>();

    result.put("applicationList", adminRepository.findAllApplication());
    result.put("vacationList", adminRepository.findAllVacation());

    return result;
  }

  // 연차 신청, 수정 시
  public Map<String, List<Vacation>> apply(VacationApplicationForm form) {
    Vacation vacation = new Vacation();

    vacation.setCode(form.getCode());
    vacation.setStart(parseStringToDate(form.getStart()));
    vacation.setEnd(parseStringToDate(form.getEnd()));
    vacation.setContent(form.getContent());
    vacation.setEmployeeId(form.getEmployeeId());

    int result = 0;
    String type = "";
    // 수정
    if (form.getIdx() != null) {
      type = "U";

      vacation.setIdx(Integer.parseInt(form.getIdx()));
      if (form.getCode().equals("abs08")) {
        result = adminRepository.updateWhole(vacation);
      } else {
        result = adminRepository.update(vacation);
      }

      // 신청
    } else {
      type = "A";
      if (form.getCode().equals("abs08")) {
        result = adminRepository.insertWhole(vacation);
      } else {
        result = adminRepository.insert(vacation);
      }
    }

    if (result > 0) {
      return setVacationDate(vacation.getIdx(), form, type);
    } else {
      return null;
    }
  }

  // 연차 조회 시
  public Map<String, List<Vacation>> findByEmployeeIdList(String employeeId) {
    Map<String, List<Vacation>> result = new HashMap<String, List<Vacation>>();
    // 사원
    if (employeeId != null) {
      result.put("applicationList", adminRepository.findByEmployeeIdApplication(employeeId));
      result.put("vacationList", adminRepository.findEmployeeIdVacation(employeeId));

      // 전체
    } else {
      result.put("applicationList", adminRepository.findAllApplication());
      result.put("vacationList", adminRepository.findAllVacation());
    }
    return result;
  }

  private LocalDate parseStringToDate(String str) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate date = LocalDate.parse(str, formatter);

    return date;
  }

  private List<VacationDate> createVacationDateList(int idx, List<String> strList) {
    List<VacationDate> vacationDateList = new ArrayList<>();

    for (String date : strList) {
      VacationDate vacationDate = new VacationDate();

      vacationDate.setVacationIdx(idx);
      vacationDate.setDate(parseStringToDate(date));

      vacationDateList.add(vacationDate);
    }

    return vacationDateList;
  }

  private Map<String, List<Vacation>> setVacationDate(int idx, VacationApplicationForm form, String type) {
    List<VacationDate> vacationDateList = createVacationDateList(idx, form.getDate());

    int result = 0;
    if (type.equals("U")) {
      if (form.getCode().equals("abs08")) {
        result = adminRepository.deleteWholeDate(idx);
      } else {
        result = adminRepository.deleteDate(idx);
      }
    }

    if ((type.equals("U") && result > 0) || type.equals("A")) {
      result = 0;
      if (form.getCode().equals("abs08")) {
        result = adminRepository.insertWholeDate(vacationDateList);
      } else {
        result = adminRepository.insertDate(vacationDateList);
      }
    }

    if (result > 0) {
      Map<String, List<Vacation>> resultList = new HashMap<String, List<Vacation>>();

      if (form.getCode().equals("abs08")) {
        resultList.put("applicationList", adminRepository.findAllApplication());
        resultList.put("vacationList", adminRepository.findAllVacation());
      } else {
        resultList.put("applicationList", adminRepository.findByEmployeeIdApplication(form.getEmployeeId()));
        resultList.put("vacationList", adminRepository.findEmployeeIdVacation(form.getEmployeeId()));
      }

      return resultList;
    } else {
      return null;
    }
  }

}
