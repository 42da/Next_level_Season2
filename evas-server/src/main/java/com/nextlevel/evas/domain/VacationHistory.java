package com.nextlevel.evas.domain;

import java.time.LocalDate;

public class VacationHistory {

  private int idx;
  private int vacationIdx;
  private LocalDate date;

  public int getIdx() {
    return idx;
  }

  public void setIdx(int idx) {
    this.idx = idx;
  }

  public int getVacationIdx() {
    return vacationIdx;
  }

  public void setVacationIdx(int vacationIdx) {
    this.vacationIdx = vacationIdx;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

}
