import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { JobSeekerLoginComponent } from './job-seeker-login/job-seeker-login.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';

import { NavbarComponent } from '../../../shared/layout/standalone-components/navbar/navbar.component';
import { AccountDeletedComponent } from './account-deleted/account-deleted.component';

@NgModule({
  declarations: [JobSeekerLoginComponent, EmployerLoginComponent, AccountDeletedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    LoginRoutingModule,
  ],
})
export class LoginModule {}
