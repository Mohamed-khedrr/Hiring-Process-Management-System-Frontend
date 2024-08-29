import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../../shared/models/Api-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-resend-mail',
  templateUrl: './resend-mail.component.html',
  styleUrl: './resend-mail.component.scss',
})
export class ResendMailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  counter: any;
  countTime: number = 0;
  isResnedHidden: boolean = false;

  ngOnInit(): void {
    this.startCounter();
  }

  SendRequest() {
    const email = this.route.snapshot.params['email'];
    let params;
    console.log(email);
    if (email) {
      this.isResnedHidden = true;
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
            this.startCounter();
          } else if (response.status == 504) {
            this.router.navigate(['/error', '504']);
          }
        },
        () => {
          this.router.navigate(['/error', '500']);
        },
        () => {
          this.isResnedHidden = false;
        }
      );
  }

  startCounter() {
    this.countTime = 60;
    this.counter = setInterval(() => {
      if (this.countTime) {
        --this.countTime;
      } else {
        clearInterval(this.counter);
      }
    }, 1000);
  }
}
