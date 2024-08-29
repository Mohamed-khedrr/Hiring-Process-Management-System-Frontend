import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiResponse } from '../../../../shared/models/Api-response';
import { LoginResponse } from '../../../../shared/models/auth/login-response';
import { environment } from '../../../../../environments/environment.development';
import { AuthInterceptor } from '../../../../interceptors/auth.interceptor';
import { UserDataService } from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-job-seeker-register',
  templateUrl: './job-seeker-register.component.html',
  styleUrl: './job-seeker-register.component.scss',
})
export class JobSeekerRegisterComponent {
  // Injection
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  destoryRef = inject(DestroyRef);
  userData = inject(UserDataService);

  errorMsg = '';
  passwordType = 'password';
  baseUrl = environment.baseUrl;

  accessToken: any;
  refreshToken: any;

  // Form Builder
  jobSeekerRegister = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    job: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.accessToken = params['accessToken'];
      console.log(this.accessToken); // price
      this.refreshToken = params['refreshToken'];
      console.log(this.refreshToken); // price
    });
    if (this.accessToken && this.refreshToken) {
      this.userData.setRefreshToken(this.refreshToken);
      this.userData.setAccessToken(this.accessToken);
      this.router.navigate(['/home/job-seeker']);
    }
  }

  get firstName() {
    return this.jobSeekerRegister.controls.firstName;
  }
  get lastName() {
    return this.jobSeekerRegister.controls.lastName;
  }
  get email() {
    return this.jobSeekerRegister.controls.email;
  }
  get job() {
    return this.jobSeekerRegister.controls.job;
  }
  get password() {
    return this.jobSeekerRegister.controls.password;
  }

  togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }
  registerJobSeeker() {
    const requestData = {
      username: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      jobTitle: this.job.value,
    };
    console.log(requestData);

    this.authService
      .registerJobSeeker(requestData)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(
        // Success Response
        (response: ApiResponse<LoginResponse>) => {
          if (response.ok) {
            console.log('Success');
            this.userData.setRegisterdEmail(response.body.username);
            this.userData.setUserRoleJobSeeker();
            console.log(this.userData.getUserRole());
            this.sendEmail();
            this.router.navigate(['/auth/registration/verify-email']);
          } else {
            if (response?.status == 406) {
              this.errorMsg = response.message;
              console.log(this.errorMsg);
            } else {
              console.log('Internal server error ');
              this.router.navigate(['/error', '500']);
            }
          }
        },
        // Handle Error
        (error: HttpErrorResponse) => {
          // console.error('API Error:', error);
          console.error('API Error:');
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            console.error('Client Side Error');
          } else {
            console.log('Internal server error ');
            this.router.navigate(['/error', '500']);
          }
        }
      );
  }

  googleAuthLink = this.baseUrl + '/oauth2/authorize/google';

  facebookAuthLink = this.baseUrl + '/oauth2/authorize/facebook';

  checkIfEmailUsed() {
    if (this.email.valid) {
      this.authService
        .checkEmail(this.email.value as string)
        .pipe(takeUntilDestroyed(this.destoryRef))
        .subscribe(
          // Success Response
          (response) => {
            if (response.body) {
              console.log('Email Exists');
              this.email.setErrors({ exist: true });
            } else {
              this.email.setErrors(null);
            }
          },
          // Handle Error
          (error: HttpErrorResponse) => {
            // console.error('API Error:', error);
            console.error('API Error:');
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred.
              console.error('Client Side Error');
            } else {
              console.log('internal server error ');
            }
          }
        );
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
}
