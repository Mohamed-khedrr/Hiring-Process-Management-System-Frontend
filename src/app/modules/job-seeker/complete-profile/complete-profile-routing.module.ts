import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstStageComponent } from './first-stage/first-stage.component';
import { SecondStageComponent } from './second-stage/second-stage.component';
import { ThirdStageComponent } from './third-stage/third-stage.component';
import { StageCounterComponent } from './stage-counter/stage-counter.component';

const routes: Routes = [
  { path: '', component: FirstStageComponent },
  { path: 'first', component: FirstStageComponent },
  { path: 'second', component: SecondStageComponent },
  { path: 'third', component: ThirdStageComponent },
  { path: 'counter', component: StageCounterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteProfileRoutingModule { }
