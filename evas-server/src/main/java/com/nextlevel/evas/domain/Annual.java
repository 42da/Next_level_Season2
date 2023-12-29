package com.nextlevel.evas.domain;

import java.time.LocalDateTime;

// 관리자 연차
public class Annual {

  private int idx;
  private float total;          // 반차일 경우 고려
  private LocalDateTime resetTime;
  private float period;         // 반차일 경우 고려
  private LocalDateTime date;
  private LocalDateTime cP;     // C : 전체 연차, P : 개인 연차
  private String reservation;   // U : 사용, R : 미사용
  private String empId;
  private String status;

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

  public LocalDateTime getResetTime() {
    return resetTime;
  }

  public void setResetTime(LocalDateTime resetTime) {
    this.resetTime = resetTime;
  }

  public float getPeriod() {
    return period;
  }

  public void setPeriod(float period) {
    this.period = period;
  }

  public LocalDateTime getDate() {
    return date;
  }

  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  public LocalDateTime getcP() {
    return cP;
  }

  public void setcP(LocalDateTime cP) {
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

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}
