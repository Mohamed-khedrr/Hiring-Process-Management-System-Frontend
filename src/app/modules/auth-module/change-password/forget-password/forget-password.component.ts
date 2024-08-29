import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiResponse } from '../../../../shared/models/Api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  messagePanale = false;
  errorMessage = '';
  errorHeader = '';
  isError = false;
  linkClicked = false;
  submitButtonDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router
  ) {}

  checkEmailform = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  SendRequest() {
    if (this.checkEmailform.valid) {
      const email = this.checkEmailform.value.email;
      let params;
      if (email != null) {
        params = new HttpParams().set('email', email);
      }
      console.log(params);
      this.http
        .post<ApiResponse<any>>(
          'http://localhost:1600/auth/forget-password-request',
          null,
          { params }
        )
        .subscribe(
          (response: ApiResponse<any>) => {
            console.log(response);
            if (response.ok) {
              this.messagePanale = true;
              this.router.navigate(['/auth/change-password/resend', email]);
            } else if (response.status == 406) {
              this.showErrorMessage(response);
            } else if (response.status == 504) {
              this.router.navigate(['/error', '504']);
            }
          },
          () => {
            this.router.navigate(['/error', '500']);
          }
        );
    }
  }

  close() {
    this.messagePanale = false;
    this.router.navigate(['/auth/reset-password/']);
  }

  showErrorMessage(response: any) {
    this.isError = true;
    this.errorHeader = 'Faild';
    this.errorMessage = response.message;
  }

  resendEmail() {
    this.linkClicked = true;
    this.SendRequest();
  }
}
