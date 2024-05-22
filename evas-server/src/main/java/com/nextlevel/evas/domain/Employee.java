package com.nextlevel.evas.domain;

import java.time.LocalDate;

public class Employee {

  private String loginId;
  private String password;

  private String employeeId;
  private String name;

  private LocalDate resetVacationDate;
  private Float totalVacationCount;
  private Float useVacationCount;

  private Boolean isAdmin;

  private String authority;
  private String accessToken;

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

  public Float getTotalVacationCount() {
    return totalVacationCount;
  }

  public void setTotalVacationCount(Float totalVacationCount) {
    this.totalVacationCount = totalVacationCount;
  }

  public Float getUseVacationCount() {
    return useVacationCount;
  }

  public void setUseVacationCount(Float useVacationCount) {
    this.useVacationCount = useVacationCount;
  }

  public Boolean getIsAdmin() {
    return isAdmin;
  }

  public void setIsAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public String getAuthority() {
    return authority;
  }

  public void setAuthority(String authority) {
    this.authority = authority;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

}
