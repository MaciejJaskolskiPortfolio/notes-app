import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentDate'
})
export class CurrentDatePipe implements PipeTransform {

  private readonly monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private readonly weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  transform(value: Date, ...args: any[]): any {
    return args.length > 0 && args[0] == 'dayname'
      ? this.getDayName(value.getDay()) + ` \n<b>${this.getOrdinalNumber(value.getDate())}</b>`
      : this.getMonthName(value.getMonth()) + ` ${this.getOrdinalNumber(value.getDate())}`;
  }

  private getMonthName(monthIdx: number) {
    return this.monthNames[monthIdx];
  }

  private getDayName(weekdayIdx: number) {
    return this.weekdayNames[weekdayIdx];
  }

  private getOrdinalNumber(day: number) {
    if (day > 20 || day < 10) {
      const endsWith = (day: number, value: string) => day.toString().endsWith(value);
      if (endsWith(day, '1')) {
        return day + 'st';
      } else if (endsWith(day, '2')) {
        return day + 'nd';
      } else if (endsWith(day, '3')) {
        return day + 'rd';
      }
    } else {
      return day + 'th';
    }
    return day + 'th';
  }

}
