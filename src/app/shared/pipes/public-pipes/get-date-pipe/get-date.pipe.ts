import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDate',
})
export class GetDatePipe implements PipeTransform {
  transform(value: unknown) {
    const date = new Date(value as string);
    return date;
  }
}
