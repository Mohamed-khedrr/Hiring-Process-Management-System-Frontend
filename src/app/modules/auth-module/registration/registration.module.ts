import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { JobSeekerRegisterComponent } from './job-seeker-register/job-seeker-register.component';
import { EmailVerifiedComponent } from './verification/email-verified/email-verified.component';
import { NavbarComponent } from '../../../shared/layout/standalone-components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verification/verify-email/verify-email.component';
import { RecruiterRegisterComponent } from './recruiter-register/recruiter-register.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { PublicPipesSharedModuleModule } from "../../../shared/pipes/public-pipes/public-pipes-shared-module.module";

@NgModule({
    declarations: [
        EmployerRegisterComponent,
        JobSeekerRegisterComponent,
        VerifyEmailComponent,
        EmailVerifiedComponent,
        RecruiterRegisterComponent,
    ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        NavbarComponent,
        ReactiveFormsModule,
        MultiSelectModule,
        FormsModule,
        DropdownModule,
    ]
})
export class RegistrationModule {}
