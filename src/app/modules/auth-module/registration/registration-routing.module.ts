import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerRegisterComponent } from './job-seeker-register/job-seeker-register.component';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { EmailVerifiedComponent } from './verification/email-verified/email-verified.component';
import { VerifyEmailComponent } from './verification/verify-email/verify-email.component';
import { RecruiterRegisterComponent } from './recruiter-register/recruiter-register.component';

const routes: Routes = [
  { path: 'job-seeker', component: JobSeekerRegisterComponent },
  { path: 'employer', component: EmployerRegisterComponent },
  { path: 'recruiter/:token', component: RecruiterRegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'after-verification/:token', component: EmailVerifiedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
