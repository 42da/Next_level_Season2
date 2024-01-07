package com.nextlevel.evas.domain;

import java.time.LocalDate;

public class Employee {

  private String logId;
  private String pw;

  private String empId;
  private String name;

  private LocalDate resetVacationDate;
  private Float totalVacation;

  public String getLogId() {
    return logId;
  }

  public void setLogId(String logId) {
    this.logId = logId;
  }

  public String getPw() {
    return pw;
  }

  public void setPw(String pw) {
    this.pw = pw;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDate getResetVacationDate() {
    return resetVacationDate;
  }

  public void setResetVacationDate(LocalDate resetVacationDate) {
    this.resetVacationDate = resetVacationDate;
  }

  public Float getTotalVacation() {
    return totalVacation;
  }

  public void setTotalVacation(Float totalVacation) {
    this.totalVacation = totalVacation;
  }

}
