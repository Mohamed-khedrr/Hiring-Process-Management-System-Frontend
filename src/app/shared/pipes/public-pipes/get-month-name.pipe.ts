import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMonthName',
})
export class GetMonthNamePipe implements PipeTransform {
  transform(monthNumber: any): unknown {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNames[monthNumber - 1];
    } else {
      return '';
    }
  }
}
