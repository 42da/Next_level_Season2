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
  public Map<String, List<Vacation>> findAllVacationList() {
    Map<String, List<Vacation>> result = new HashMap<String, List<Vacation>>();

    result.put("applicationList", adminRepository.findAllApplication());
    result.put("vacationList", adminRepository.findAllVacation());

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
    String type = "";
    // 수정
    if (form.getIdx() != null) {
      type = "U";

      vacation.setIdx(Integer.parseInt(form.getIdx()));
      result = adminRepository.update(vacation);

      // 신청
    } else {
      type = "A";

      result = adminRepository.insert(vacation);
    }

    if (result > 0) {
      return setVacationDate(vacation.getIdx(), form.getDate(), type);
    } else {
      return null;
    }
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

  private Vacation setVacationDate(int idx, List<String> vacationDate, String type) {
    List<VacationDate> vacationDateList = createVacationDateList(idx, vacationDate);

    int result = 0;
    if (type.equals("U")) {
      result = adminRepository.deleteDate(idx);
    }

    if ((type.equals("U") && result > 0) || type.equals("A")) {
      result = 0;
      result = adminRepository.insertDate(vacationDateList);
    } else {
      return null;
    }

    if (result > 0) {
      return adminRepository.findByIdx(idx);
    } else {
      return null;
    }
  }

}
