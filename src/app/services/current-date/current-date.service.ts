import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {

  private readonly MAX_DISPLAYED_DATES = 5;

  private readonly _currentDate = new BehaviorSubject<Date>(new Date());
  currentDate = this._currentDate.asObservable();

  constructor() { }

  changeDate(newDate: Date) {
    this._currentDate.next(newDate);
  }

  getDatesToDisplay(startDate: Date) {
    return Array.from({ length: this.MAX_DISPLAYED_DATES }).map((d, idx) => {
      return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - idx);
    })
    .sort((prev, next) => prev.getMonth() - next.getMonth() || prev.getDate() - next.getDate())
  }

  getStartDate(startDate: Date) {
    const countDiff = 2;
    return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + countDiff);
  }

  private checkNumOfDays(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }
}
