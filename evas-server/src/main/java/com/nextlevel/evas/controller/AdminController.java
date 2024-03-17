package com.nextlevel.evas.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nextlevel.evas.domain.Employee;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.form.EmployeeIdForm;
import com.nextlevel.evas.form.VacationApplicationForm;
import com.nextlevel.evas.form.VacationApprovalForm;
import com.nextlevel.evas.form.VacationDeletionForm;
import com.nextlevel.evas.service.AdminService;

@Controller
public class AdminController {

  private final AdminService adminService;

  @Autowired
  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @PostMapping("employee")
  @ResponseBody
  public Map<String, List<Employee>> findAllEmployeeList() {
    return adminService.findAllEmployeeList();
  }

  @PostMapping("admin")
  @ResponseBody
  public Map<String, List<Vacation>> findAllList() {
    return adminService.findAllList();
  }

  @PostMapping({"admin/apply", "admin/update"})
  @ResponseBody
  public Map<String, List<Vacation>> apply(@RequestBody VacationApplicationForm form) {
    return adminService.apply(form);
  }

  @PostMapping("admin/list")
  @ResponseBody
  public Map<String, List<Vacation>> findByEmployeeIdList(@RequestBody EmployeeIdForm form) {
    return adminService.findByEmployeeIdList(form.getEmployeeId());
  }

  // 관리자가 전체, 사원 연차 신청 시 approvalStatus가 A인데
  // 사원한테 기록이 남으면 안 되니까 ‘취소’가 아니라
  // ‘삭제’로 처리
  @PostMapping("admin/cancel")
  @ResponseBody
  public int delete(@RequestBody VacationDeletionForm form) {
    return adminService.delete(form);
  }

  @PostMapping("admin/approve")
  @ResponseBody
  public Vacation approve(@RequestBody VacationApprovalForm form) {
    return adminService.approve(form);
  }

}
