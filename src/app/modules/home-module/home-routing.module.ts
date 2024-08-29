import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerHomeComponent } from './job-seeker-home/job-seeker-home.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';

const routes: Routes = [
  { path: '', component: JobSeekerHomeComponent },
  { path: 'job-seeker', component: JobSeekerHomeComponent },
  { path: 'employer', component: EmployerHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
