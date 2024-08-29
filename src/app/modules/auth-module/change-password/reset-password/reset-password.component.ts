import { retry } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../shared/models/Api-response';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  messagePanel = false;
  token: any;
  userRole!: string;
  errorMesg!: string;
  isError = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}
  restPasswordForm = this.fb.group({
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]],
  });

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
  }

  submit() {
    let isValid =
      this.restPasswordForm.value.password ==
      this.restPasswordForm.value.confirmPassword;
    if (!isValid) {
      this.restPasswordForm.controls.confirmPassword.setErrors({
        mismatch: true,
      });
      return;
    }
    if (this.restPasswordForm.valid && isValid) {
      const requestData = {
        token: this.token,
        password: this.restPasswordForm.value.password,
        confirmedPassword: this.restPasswordForm.value.confirmPassword,
      };

      console.log(this.restPasswordForm.value);
      this.http
        .post<ApiResponse<any>>(
          'http://localhost:1600/auth/reset-password',
          requestData
        )
        .subscribe(
          (response) => {
            console.log(response);
            if (response.ok) {
              console.log('Success:', response);
              console.log('role =>> ', response.body);
              this.userRole = response.body;
              console.log(this.userRole);
              this.messagePanel = true;
            } else if (response.status == 406) {
              this.isError = true;
              this.errorMesg = response.message;
            } else {
              console.log(response);
            }
          },
          (error) => {
            this.messagePanel = false;
          }
        );
    }
  }

  close() {
    this.messagePanel = false;
    if (this.userRole === 'ROLE_JOBSEEKER')
      this.router.navigate(['/auth/login/job-seeker']);
    else this.router.navigate(['/auth/login/employer']);
  }
  togglePassword(ele: any) {
    if (ele.type == 'password') {
      ele.type = 'text';
    } else {
      ele.type = 'password';
    }
  }
}
