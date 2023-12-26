package com.nextlevel.evas.domain;

import java.util.Date;

public class Annual {

  private int idx;
  private float total;          // 반차일 경우 고려
  private Date resetTime;       // java.sql.Date?

  private float period;         // 반차일 경우 고려
  private Date date;            // java.sql.Date?
  private Date cP;              // C : 전체 연차, P : 개인 연차
  private String reservation;   // U : 사용, R : 미사용

  private String empId;

  public int getIdx() {
    return idx;
  }

  public void setIdx(int idx) {
    this.idx = idx;
  }

  public float getTotal() {
    return total;
  }

  public void setTotal(float total) {
    this.total = total;
  }

  public Date getResetTime() {
    return resetTime;
  }

  public void setResetTime(Date resetTime) {
    this.resetTime = resetTime;
  }

  public float getPeriod() {
    return period;
  }

  public void setPeriod(float period) {
    this.period = period;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public Date getcP() {
    return cP;
  }

  public void setcP(Date cP) {
    this.cP = cP;
  }

  public String getReservation() {
    return reservation;
  }

  public void setReservation(String reservation) {
    this.reservation = reservation;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

}
