import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerLoginComponent } from './job-seeker-login/job-seeker-login.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';

const routes: Routes = [
  { path: 'job-seeker', component: JobSeekerLoginComponent },
  { path: 'employer', component: EmployerLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
