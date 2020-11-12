import { CurrentDatePipe } from './current-date.pipe';

describe('CurrentDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrentDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return \'st\' on 1st or 21st day of the month', () => {
    const pipe = new CurrentDatePipe();
    const day = [new Date(2020, 8, 1), new Date(2020, 8, 21)];
    day.forEach(d => expect(pipe.transform(d)).toContain('st'));
  });

  it('should return \'nd\' on 2nd or 22nd day of the month', () => {
    const pipe = new CurrentDatePipe();
    const day = [new Date(2020, 8, 2), new Date(2020, 8, 22)];
    day.forEach(d => expect(pipe.transform(d)).toContain('nd'));
  });

  it('should return \'rd\' on 3rd or 23rd day of the month', () => {
    const pipe = new CurrentDatePipe();
    const day = [new Date(2020, 8, 3), new Date(2020, 8, 23)];
    day.forEach(d => expect(pipe.transform(d)).toContain('rd'));
  });

  it('should NOT return \'st\', \'nd\' or \'rd\' on 11th, 12th, 13th day of the month', () => {
    const pipe = new CurrentDatePipe();
    const ordinals = ['st', 'nd', 'rd'];
    const day = [new Date(2020, 8, 11), new Date(2020, 8, 12), new Date(2020, 8, 13)];
    day.forEach((d, idx) => expect(pipe.transform(d)).not.toContain(ordinals[idx]));
  });

  it('should return weekdays names with \'dayname\' argument', () => {
    const pipe = new CurrentDatePipe();
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = [new Date(2020, 8, 13),
                new Date(2020, 8, 14),
                new Date(2020, 8, 15),
                new Date(2020, 8, 16),
                new Date(2020, 8, 17),
                new Date(2020, 8, 18),
                new Date(2020, 8, 19)];
    day.forEach((d, idx) => expect(pipe.transform(d, 'dayname')).toContain(weekdayNames[idx]));
  });
});
