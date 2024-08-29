import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString',
})
export class ShortenStringPipe implements PipeTransform {
  transform(targetString: any, maxLength: number = 15): string {
    if (!targetString) return '';

    if (targetString.length < maxLength) {
      return targetString;
    } else {
      return targetString.substring(0, maxLength - 3) + '...';
    }
  }
}
