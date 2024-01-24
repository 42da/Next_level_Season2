package com.nextlevel.evas.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nextlevel.evas.domain.Vacation;
import com.nextlevel.evas.form.EmployeeIdForm;
import com.nextlevel.evas.form.VacationApplicationForm;
import com.nextlevel.evas.form.VacationApprovalForm;
import com.nextlevel.evas.form.VacationIdxForm;
import com.nextlevel.evas.service.VacationService;

@Controller
public class VacationController {

  private final VacationService vacationService;

  @Autowired
  public VacationController(VacationService vacationService) {
    this.vacationService = vacationService;
  }

  @PostMapping("main")
  @ResponseBody
  public Map<String, List<Vacation>> findAllList(@RequestBody EmployeeIdForm form) {
    return vacationService.findAllList(form.getEmployeeId());
  }

  @PostMapping("main/apply")
  @ResponseBody
  public Vacation apply(@RequestBody VacationApplicationForm form) {
    return vacationService.apply(form);
  }

  @PostMapping("main/delete")
  @ResponseBody
  public int delete(@RequestBody VacationIdxForm form) {
    return vacationService.delete(form.getIdx());
  }

  @PostMapping("main/approve")
  @ResponseBody
  public Vacation approve(@RequestBody VacationApprovalForm form) {
    return vacationService.approve(form.getIdx(), form.getApprovalStatus(), form.getRejectionContent());
  }

}
