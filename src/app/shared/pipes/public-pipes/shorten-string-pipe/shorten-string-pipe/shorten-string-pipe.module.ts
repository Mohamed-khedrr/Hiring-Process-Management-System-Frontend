import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenStringPipe } from '../shorten-string.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ShortenStringPipe],
  exports: [ShortenStringPipe],
})
export class ShortenStringPipeModule {}
