import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResendMailComponent } from './resend-mail/resend-mail.component';
import { NavbarComponent } from '../../../shared/layout/standalone-components/navbar/navbar.component';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ResendMailComponent,
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ReactiveFormsModule,
    NavbarComponent,
  ],
})
export class ChangePasswordModule {}
