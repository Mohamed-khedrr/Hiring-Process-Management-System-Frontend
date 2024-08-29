import { FormBuilder, Validators } from '@angular/forms';
import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Router } from '@angular/router';
import { UserDataService } from '../../../../shared/services/user-data.service';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrl: './employer-login.component.scss',
})
export class EmployerLoginComponent {
  // Injection
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  destoryRef = inject(DestroyRef);
  errorMsg = '';
  passwordType = 'password';
  userData = inject(UserDataService);

  // Form Validation
  employerLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  get email() {
    return this.employerLogin.controls.email;
  }
  get password() {
    return this.employerLogin.controls.password;
  }

  togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  onInputChange() {
    if (this.employerLogin.valid) {
      this.errorMsg = '';
    }
  }

  sendDataToApi() {
    if (this.employerLogin.invalid) return;
    const requestData = {
      username: this.email.value,
      password: this.password.value,
    };

    this.authService
      .loginEmployer(requestData)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(
        // Success Response
        (response) => {
          console.log('API Response:', response);
          if (response.ok) {
            this.userData.setRefreshToken(response.body.refreshToken);
            this.userData.setAccessToken(response.body.accessToken); 
            if (response.body.deleted == true) {
              this.router.navigate(['/auth/account-deleted'], {
                queryParams: { role: 'employer' },
              });
            } else {
              this.router.navigate(['company/dashboard-page']);
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
        // (err) => console.log(err)
        (error: HttpErrorResponse) => {
          console.log(error);
          this.router.navigate(['/error', '500']);
        }
      );
  }
}
