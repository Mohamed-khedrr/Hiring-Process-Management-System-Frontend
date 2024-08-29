import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../../shared/models/Api-response';
import { LoginResponse } from '../../../../shared/models/auth/login-response';
import { environment } from '../../../../../environments/environment';
import { UserDataService } from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-job-seeker-login',
  templateUrl: './job-seeker-login.component.html',
  styleUrl: './job-seeker-login.component.scss',
})
export class JobSeekerLoginComponent implements OnInit {
  // Injection
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  destoryRef = inject(DestroyRef);
  userData = inject(UserDataService);

  baseUrl = environment.baseUrl;
  passwordType = 'password';
  errorMsg = '';
  isAccountDeleted: any;

  accessToken: any;
  refreshToken: any;

  // Form Validation
  jobSeekerLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
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
      this.userData.setAccessToken(this.accessToken);
      this.userData.setRefreshToken(this.refreshToken);
      this.router.navigate(['/home/job-seeker']);
    }
  }

  googleAuthLink = this.baseUrl + '/oauth2/authorize/google';

  facebookAuthLink = this.baseUrl + '/oauth2/authorize/facebook';

  get email() {
    return this.jobSeekerLogin.controls.email;
  }
  get password() {
    return this.jobSeekerLogin.controls.password;
  }

  togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  onInputChange() {
    if (this.jobSeekerLogin.valid) {
      this.errorMsg = '';
    }
  }

  jobSeekerlogin() {
    if (this.jobSeekerLogin.invalid) return;
    const requestData = {
      username: this.email.value,
      password: this.password.value,
    };

    this.authService
      .loginJobSeeker(requestData)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(
        // Success Response
        (response: ApiResponse<LoginResponse>) => {
          console.log('API Response:', response);
          if (response.ok) {
            this.userData.setRefreshToken(response.body.refreshToken);
            this.userData.setAccessToken(response.body.accessToken);
            if (response.body.deleted == true) {
              this.router.navigate(['/auth/account-deleted'], {
                queryParams: { role: 'job-seeker' },
              });
            } else {
              this.router.navigate(['/job-seeker/jobs/explore']);
              console.log('Logged In');
            }
          } else {
            if (response?.status === 406) {
              console.log(response.message);
              this.errorMsg = response.message;
            } else {
              this.router.navigate(['/error', '403']);
            }
          }
        },
        // Handle Error
        (error: HttpErrorResponse) => {
          console.log(error);
          this.router.navigate(['/error', '500']);
        }
      );
  }
}
