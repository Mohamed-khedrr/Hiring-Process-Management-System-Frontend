import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from '../../../../../shared/services/user-data.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.scss',
})
export class EmailVerifiedComponent {

  router = inject(Router);

  route: ActivatedRoute = inject(ActivatedRoute);
  heading: string = 'Your Email has been verified.';
  imgSrc: String = '';
  authService = inject(AuthService);
  destoryRef = inject(DestroyRef);
  userData = inject(UserDataService);

  activated = false;
  role = '';

  ngOnInit() {
    this.imgSrc = `assets/imgs/email-check.png`;
    let token = this.route.snapshot.params['token'];
    this.role = this.userData.getUserRole();

    console.log(token);
    this.authService
      .confirmEmail(token)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(
        (response) => {
          console.log(response);
          this.activated = true;
          this.role = response.body.userRole;
          console.log(response);          
          console.log(this.role);          
          console.log('activated');
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/error', '406']);
        }
      );
  }

  toLogin() {
    if(this.role == 'ROLE_JOBSEEKER')
      this.router.navigate(['/auth/login/job-seeker'])
    else
      this.router.navigate(['/auth/login/employer'])
  }
}
