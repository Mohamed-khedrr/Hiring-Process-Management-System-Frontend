import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { JobSeekerRegisterComponent } from './registration/job-seeker-register/job-seeker-register.component';
import { EmployerRegisterComponent } from './registration/employer-register/employer-register.component';
import { NavbarComponent } from '../../shared/layout/standalone-components/navbar/navbar.component';
import { EmailVerifiedComponent } from './registration/verification/email-verified/email-verified.component';
import { NotificationMessageComponent } from '../../shared/standalone-components/notification-message/notification-message.component';
import { LoginModule } from './login/login.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationModule } from './registration/registration.module';
import { ChangePasswordModule } from './change-password/change-password.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    NavbarComponent,
    FormsModule,
    NotificationMessageComponent,
    LoginModule,
    ChangePasswordModule,
  ],
})
export class AuthModuleModule { }
