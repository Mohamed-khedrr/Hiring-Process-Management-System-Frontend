import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff'
})
export class TimeDiffPipePipe implements PipeTransform {


  transform(value: any): any {
    if (value) {
      let expiryDate = +new Date(value);
      let now = +new Date();
      let seconds = (expiryDate - now) / 1000; // expiry Date - current time
      let sign = Math.sign(seconds);
      let suffix = "left"; // if the time is yet to come.
      if (sign === -1) {
        seconds = Math.floor(seconds * sign); // removing the sign and the float part
        suffix = "ago"; // if time is already expired.
      }
      const intervals: { [key: string]: number } = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      const allInterval = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
      let counter: number;

      for (let unit of allInterval) {
        counter = Math.floor(seconds / intervals[unit]);
        if (counter > 0) {
          let result = this.calculateTime(counter, unit); // e.g., "2 hours"
          let remainingSeconds = seconds - counter * intervals[unit];
          if (remainingSeconds > 0 && intervals[unit] > 1) {
            unit = allInterval[allInterval.indexOf(unit) + 1];
            counter = Math.floor(remainingSeconds / intervals[unit]);
            if (counter > 0) {
              result += " " + this.calculateTime(counter, unit);
            }
          }
          return result + " " + suffix;
        }
      }
    }
    return value;
  }

  calculateTime(counter: number, timeUnit: string): string {
    if (counter === 1) {
      return counter + ' ' + timeUnit; // singular (e.g., "1 hour")
    } else {
      return counter + ' ' + timeUnit + 's'; // plural (e.g., "2 hours")
    }
  }

}
