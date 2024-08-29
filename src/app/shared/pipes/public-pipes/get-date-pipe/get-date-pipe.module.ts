import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDatePipe } from './get-date.pipe';

@NgModule({
  declarations: [GetDatePipe],
  imports: [CommonModule],
  exports: [GetDatePipe],
})
export class GetDatePipeModule {}
