import { TestBed } from '@angular/core/testing';

import { CurrentDateService } from './current-date.service';

describe('CurrentDateService', () => {

  let service: CurrentDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CurrentDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change date', () => {
    const date = new Date(2020, 11, 10);
    service.changeDate(date);
    service.currentDate.subscribe(d => {
      expect(d).toEqual(date);
    });
  });

  it('should return dates based on current date', () => {
    const date = new Date(2020, 10, 10);
    const expectedDates = [
      new Date(2020, 10, 6),
      new Date(2020, 10, 7),
      new Date(2020, 10, 8),
      new Date(2020, 10, 9),
      new Date(2020, 10, 10),
    ];
    expect(service.getDatesToDisplay(date)).toEqual(expectedDates);
  });

  it('should return dates descending by month', () => {
    const date = new Date(2020, 11, 0);
    const expectedDates = [
      new Date(2020, 10, 26),
      new Date(2020, 10, 27),
      new Date(2020, 10, 28),
      new Date(2020, 10, 29),
      new Date(2020, 11, 0),
    ];
    expect(service.getDatesToDisplay(date)).toEqual(expectedDates);
  });

  it('should get start date based on given date', () => {
    const date = new Date(2020, 11, 0);
    expect(service.getStartDate(date)).toEqual(new Date(2020, 11, 2));
  });
});
