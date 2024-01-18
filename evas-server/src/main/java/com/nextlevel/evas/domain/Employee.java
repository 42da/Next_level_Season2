package com.nextlevel.evas.domain;

import java.time.LocalDate;

public class Employee {

  private String loginId;
  private String password;

  private String employeeId;
  private String name;

  private LocalDate resetVacationDate;
  private Float totalVacation;

  private Boolean isAdmin;

  public String getLoginId() {
    return loginId;
  }

  public void setLoginId(String loginId) {
    this.loginId = loginId;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
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

  public Boolean getIsAdmin() {
    return isAdmin;
  }

  public void setIsAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

}
