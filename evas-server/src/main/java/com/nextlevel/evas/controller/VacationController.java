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

  @PostMapping("main/application")
  @ResponseBody
  public Vacation application(@RequestBody VacationApplicationForm form) {
    return vacationService.application(form);
  }

  @PostMapping("main/update")
  @ResponseBody
  public Vacation update(@RequestBody VacationIdxForm form) {
    return vacationService.update(form.getIdx());
  }

}
