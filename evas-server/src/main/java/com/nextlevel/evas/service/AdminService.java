package com.nextlevel.evas.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.domain.Vacation;
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

  //관리자 전환 시 연차 목록
  public Map<String, List<Vacation>> findAllVacationList() {
    Map<String, List<Vacation>> result = new HashMap<String, List<Vacation>>();

    result.put("applicationList", adminRepository.findAllApplication());
    result.put("vacationList", adminRepository.findAllVacation());

    return result;
  }

}
