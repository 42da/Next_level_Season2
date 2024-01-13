package com.nextlevel.evas.domain;

import java.time.LocalDate;

public class Vacation {

  private int idx;
  private String code;
  private LocalDate start;
  private LocalDate end;
  private String content;

  private String type;              // 기본 값 : 개인 연차 (P), 전체 연차 (C)
  private Float period;
  private String approvalStatus;    // 기본 값 : 대기 중 (W), 승인 (A), 거절 (R)
  private String useStatus;         // 기본 값 : 미사용 (R), 사용 (U)
  private LocalDate applicationDate;

  private String empId;

  public int getIdx() {
    return idx;
  }

  public void setIdx(int idx) {
    this.idx = idx;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public LocalDate getStart() {
    return start;
  }

  public void setStart(LocalDate start) {
    this.start = start;
  }

  public LocalDate getEnd() {
    return end;
  }

  public void setEnd(LocalDate end) {
    this.end = end;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Float getPeriod() {
    return period;
  }

  public void setPeriod(Float period) {
    this.period = period;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getApprovalStatus() {
    return approvalStatus;
  }

  public void setApprovalStatus(String approvalStatus) {
    this.approvalStatus = approvalStatus;
  }

  public String getUseStatus() {
    return useStatus;
  }

  public void setUseStatus(String useStatus) {
    this.useStatus = useStatus;
  }

  public LocalDate getApplicationDate() {
    return applicationDate;
  }

  public void setApplicationDate(LocalDate applicationDate) {
    this.applicationDate = applicationDate;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

}
