package com.nextlevel.evas.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nextlevel.evas.domain.Vacation;
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
  public Map<String, List<Vacation>> findAllVacation(@RequestBody EmployeeForm form) {
    return vacationService.findAllVacation(form.getEmployeeId());
  }

}
