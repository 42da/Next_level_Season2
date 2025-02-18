package com.nextlevel.evas.domain;

import java.time.LocalDate;

public class Vacation {

  private int idx;
  private String code;
  private LocalDate start;
  private LocalDate end;
  private String content;

  private String approvalStatus;    // 기본 값 : 대기 (W), 승인 (A), 거절 (R), 취소 (C)
  private String useStatus;         // 기본 값 : 미사용 (R), 사용 (U)

  private String employeeId;

  private String rejectionContent;
  private String cancellationContent;

  private String date;
  private String isWhole;

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

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public String getRejectionContent() {
    return rejectionContent;
  }

  public void setRejectionContent(String rejectionContent) {
    this.rejectionContent = rejectionContent;
  }

  public String getCancellationContent() {
    return cancellationContent;
  }

  public void setCancellationContent(String cancellationContent) {
    this.cancellationContent = cancellationContent;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getIsWhole() {
    return isWhole;
  }

  public void setIsWhole(String isWhole) {
    this.isWhole = isWhole;
  }

}
