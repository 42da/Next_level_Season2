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
import com.nextlevel.evas.form.VacationApprovalForm;
import com.nextlevel.evas.form.VacationDeletionForm;
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
  public Vacation apply(VacationApplicationForm form) {
    Vacation vacation = new Vacation();

    vacation.setCode(form.getCode());
    vacation.setStart(parseStringToDate(form.getStart()));
    vacation.setEnd(parseStringToDate(form.getEnd()));
    vacation.setContent(form.getContent());
    vacation.setApprovalStatus("A");
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
      result.put("applicationList", adminRepository.findApplicationByEmployeeId(employeeId));
      result.put("vacationList", adminRepository.findVacationByEmployeeId(employeeId));

      // 전체
    } else {
      result.put("applicationList", adminRepository.findAllApplication());
      result.put("vacationList", adminRepository.findAllVacation());
    }
    return result;
  }

  // 연차 취소(삭제) 시
  public int delete(VacationDeletionForm form) {
    int result = 0;
    if (form.getCode().equals("abs08")) {
      result = adminRepository.deleteWholeDate(Integer.parseInt(form.getIdx()));
    } else {
      result = adminRepository.deleteDate(Integer.parseInt(form.getIdx()));
    }

    if (result > 0) {
      result = 0;
      if (form.getCode().equals("abs08")) {
        result = adminRepository.deleteWhole(Integer.parseInt(form.getIdx()));
      } else {
        result = adminRepository.delete(Integer.parseInt(form.getIdx()));
      }
    } else {
      return -1;
    }

    if (result > 0) {
      return Integer.parseInt(form.getIdx());
    } else {
      return -1;
    }
  }

  // 연차 승인, 거절 시
  public Vacation approve(VacationApprovalForm form) {
    int result = adminRepository.updateAppravalStatus(Integer.parseInt(form.getIdx()), form.getApprovalStatus(), form.getRejectionContent());
    if (result > 0) {
      return adminRepository.findByIdx(Integer.parseInt(form.getIdx()));
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

  private Vacation setVacationDate(int idx, VacationApplicationForm form, String type) {
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
      if (form.getCode().equals("abs08")) {
        return adminRepository.findWholeByIdx(idx);
      } else {
        return adminRepository.findByIdx(idx);
      }
    } else {
      return null;
    }
  }

}
