import { IndustryService } from './../../../../shared/services/industry.service';
import { AuthService } from '../../auth.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, DestroyRef, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocationService } from '../../../../shared/services/location.service';
import { UserDataService } from '../../../../shared/services/user-data.service';
import { Industry } from '../../../../shared/models/common/Industry';
import { CountryCode } from '../../../../shared/models/common/CountryCode';
import { RetrieveJobSeekerDataService } from '../../../job-seeker/retrieve-job-seeker-data.service';

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrl: './employer-register.component.scss',
})
export class EmployerRegisterComponent {
  // Injection
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  destoryRef = inject(DestroyRef);
  locationService = inject(LocationService);
  userData = inject(UserDataService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  industries !: Industry[];




  passwordType = 'password';
  countriesCode: any[] = [];
  errorMsg = '';
  selectedCountyCode: CountryCode | undefined;

  constructor(private industryService: IndustryService) {
    this.getAllIndustries();
    this.getCountriesCode();
  }
  getCountriesCode() {
    this.retrieveJobSeekerData.getCountryCodes().subscribe({
      next: (res) => {
        this.countriesCode = res;
      },
      error: (err) => {
        console.log('Error in Loading Countries Code');
      },
    });
  }


  // Form Builder
  employerRegister = this.formBuilder.group({
    companyName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    industry: ['', Validators.required],
    mobileNumberCountryCode: [''],
    mobileNumber: [
      '',
      [Validators.required],
    ],
    businessEmail: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  get Industry() {
    return this.employerRegister.controls.industry;
  }

  get companyName() {
    return this.employerRegister.controls.companyName;
  }
  get fullName() {
    return `${this.employerRegister.controls.firstName} ${this.employerRegister.controls.lastName}`;
  }
  get firstName() {
    return this.employerRegister.controls.firstName;
  }
  get lastName() {
    return this.employerRegister.controls.lastName;
  }
  get mobileNumber() {
    return this.employerRegister.controls.mobileNumber;
  }
  get mobileNumberCountryCode() {
    return this.employerRegister.controls.mobileNumberCountryCode;
  }
  get businessEmail() {
    return this.employerRegister.controls.businessEmail;
  }
  get password() {
    return this.employerRegister.controls.password;
  }

  getRegisterFormInput(formElment: string): AbstractControl | null {
    return this.employerRegister.get(formElment);
  }

  updateCountryCode(){
    this.employerRegister.controls.mobileNumberCountryCode.patchValue(this.selectedCountyCode?.phoneCode || null)    
    this.checkIfMobileUsed()
  }

  registerEmployer() {
    console.log(this.employerRegister);
    const requestData = {
      name: this.companyName.value,
      industry: this.Industry.value,
      firstName: this.firstName.value,
      lastName:  this.lastName.value,
      // don't add plus '+' to country code, Spring ignores it and no record will be found for it
      mobileNumberCountryCode: this.mobileNumberCountryCode.value,
      mobileNumber: this.mobileNumber.value,
      username: this.businessEmail.value,
      password: this.password.value,
    };
    console.log(requestData);
    this.authService
      .registerEmployer(requestData)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (response) => {
          if (response.ok) {
            console.log('Success');
            this.userData.setRegisterdEmail(response.body.username);
            this.userData.setUserRoleEmployer();
            console.log(this.userData.getUserRole());
            this.sendEmail();
            this.router.navigate(['/auth/registration/verify-email']);
          } else {
            if (response?.status == 406) {
              this.errorMsg = response.message;
              console.log(this.errorMsg);
            } else {
              console.log('internal server error ');
              this.router.navigate(['/error', '500']);
            }
          }
        },
        // Handle Error
        error: (error: HttpErrorResponse) => {
          // console.error('API Error:', error);
          console.error('API Error:');
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            console.error('Client Side Error');
          } else {
            console.log('internal server error ');
            this.router.navigate(['/error', '500']);
          }
        },
      });
  }

  checkIfMobileUsed() {
    if (this.mobileNumber.valid) {
      this.authService
        .checkCompnayMobile(this.mobileNumberCountryCode.value as string, this.mobileNumber.value as string)
        .pipe(takeUntilDestroyed(this.destoryRef))
        .subscribe({
          // Success Response
          next: (response) => {
            if (response.body) {
              console.log('Mobile Exists');
              this.mobileNumber.setErrors({ exist: true });
            } else {
              this.mobileNumber.setErrors(null);
            }
          },
          // Handle Error
          error: (error: HttpErrorResponse) => {
            // console.error('API Error:', error);
            console.error('API Error:');
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred.
              console.error('Client Side Error');
            } else {
              console.log('internal server error ');
              // this.router.navigate(['/error', '500']);
            }
          },
        });
    }
  }

  checkIfEmailUsed() {
    if (this.businessEmail.valid) {
      this.authService
        .checkEmail(this.businessEmail.value as string)
        .pipe(takeUntilDestroyed(this.destoryRef))
        .subscribe({
          next: (response) => {
            if (response.body) {
              console.log('Email Exists');
              this.businessEmail.setErrors({ exist: true });
            } else {
              this.businessEmail.setErrors(null);
            }
          },
          // Handle Error
          error: (error: HttpErrorResponse) => {
            // console.error('API Error:', error);
            console.error('API Error:');
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred.
              console.error('Client Side Error');
            } else {
              console.log('internal server error ');
            }
          },
        });
    }
  }

  sendEmail(): void {
    let role = this.userData.getUserRole();
    let userEmail = this.userData.getRegisterdEmail();
    this.authService
      .verifyEmail(role, userEmail)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (response) => {
          console.log('Thank U');
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          this.router.navigate(['/error', '504']);
        },
      });
  }

  togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  getAllIndustries() {
    this.industryService.getIndustries().subscribe(res => {
      console.log(res);
      this.industries = res.body;
    })
  }

}
