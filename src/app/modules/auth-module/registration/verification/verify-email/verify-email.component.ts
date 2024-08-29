import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from '../../../../../shared/services/user-data.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  authService = inject(AuthService);
  destoryRef = inject(DestroyRef);
  router = inject(Router);
  userData = inject(UserDataService);
  route: ActivatedRoute = inject(ActivatedRoute);
  email: string = this.userData.getRegisterdEmail();
  heading: string = 'Please Verify Your Email.';
  message1: string = 'We sent you an email to ';
  message2: string = 'Just click the link in the email to verify your account,';
  message3: string = "if you can't see it check your spam folder.";
  imgSrc: String = '';

  ngOnInit(): void {
    this.imgSrc = `assets/imgs/Email.png`;
    this.resendEmail();
  }

  resendEmail(): void {
    let role = this.userData.getUserRole();
    this.authService
      .verifyEmail(role, this.email)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(
        (response) => {
          console.log('mail sent');
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/error', '500']);
        }
      );
  }
}
