import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandleFileUrlPipe } from './handle-file-url.pipe';
import { GetMonthNamePipe } from './get-month-name.pipe';
import { TimeDiffPipePipe } from './time-diff-pipe.pipe';

@NgModule({
  declarations: [HandleFileUrlPipe, GetMonthNamePipe, TimeDiffPipePipe],
  imports: [CommonModule],
  exports: [HandleFileUrlPipe, GetMonthNamePipe, TimeDiffPipePipe],
})
export class PublicPipesSharedModuleModule {}
