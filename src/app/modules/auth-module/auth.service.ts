import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, pipe, retry, throwError } from 'rxjs';
import { UserDataService } from '../../shared/services/user-data.service';
import { RequestService } from '../../shared/services/request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  companyAuthUrl = '/auth/company';
  http = inject(HttpClient);
  requestService = inject(RequestService);
  userData = inject(UserDataService);

 
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'withCredentials': 'true' 
  });
  multipartHeaders = new HttpHeaders({
    'Content-Type': 'multipart/form-data, application/json',
    Accept: 'application/json',
  });
  constructor() {}

  // Handle Errors
  // private handleError(error: HttpErrorResponse) {
  //   switch (error.status) {
  //     case 0:
  //       // A client-side or network error occurred. Handle it accordingly.
  //       console.error('An error occurred:', error.error);
  //       break;

  //     case 400:
  //       // Handle Bad Request error
  //       console.error('Bad Request:', error.error);
  //       break;

  //     case 401:
  //       // Handle Unauthorized error
  //       console.error('Unauthorized:', error.error);
  //       break;

  //     case 404:
  //       // Handle Not Found error
  //       console.error('Not Found:', error.error);
  //       break;

  //     case 500:
  //       // Handle Internal Server Error
  //       console.error('Internal Server Error:', error.error);
  //       break;

  //     default:
  //       // Handle other errors
  //       console.error(
  //         `Backend returned code ${error.status}, body was: `,
  //         error.error
  //       );
  //       break;
  //   }

  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error(error.status + ''));
  // }

  // Company Register
  register(data: object, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/${role}/register`, data, {
      headers: this.headers,
    });
    // .pipe(
    //   retry(2), // retry a failed request up to 2 times
    //   catchError(this.handleError) // then handle the error
    // );
  }

  login(data: object, role: string): Observable<any> {
    return this.requestService.post(`${this.baseUrl}/auth/${role}/login`,JSON.stringify(data),undefined,true,
      this.headers
    );
    /*return this.http.post(`${this.baseUrl}/auth/${role}/login`, data, {headers: this.headers,
       withCredentials: true,});*/
  }

  // Set The Employer Registerd Email in case registeration is success

  // Send Verification Message
  verifyEmail(role: string, email: string): Observable<any> {
    console.log(
      'link:',
      `${this.baseUrl}/mail/${role}/activate-email?email=${email}`
    );
    return this.http.get(
      `${this.baseUrl}/mail/${role}/activate-email?email=${email}`,
      {
        // headers: this.multipartHeaders,
        headers: this.headers,
      }
    );
  }

  checkCompnayMobile(
    mobileNumberCountryCode: string,
    mobileNumber: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/company-profile/is-mobile-exist?mobileNumberCountryCode=${mobileNumberCountryCode}&mobileNumber=${mobileNumber}`,
      {
        headers: this.headers,
      }
    );
  }

  checkEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/is-email-exist?email=${email}`, {
      headers: this.headers,
    });
  }

  confirmEmail(token: string): Observable<any> {
    console.log(
      this.http.get(`${this.baseUrl}/auth/confirm-email?token=${token}`)
    );
    return this.http.get(`${this.baseUrl}/auth/confirm-email?token=${token}`, {
      headers: this.headers,
    });
  }

  registerEmployer(data: Object): Observable<any> {
    return this.register(data, 'company');
  }
  registerRecruiter(file: File, recruiterInfo: any): Observable<any> {
    const fd = new FormData();
    fd.append('photo', file, file.name);
    fd.append('invitationId', recruiterInfo.token);
    fd.append('firstName', recruiterInfo.firstName);
    fd.append('lastName', recruiterInfo.lastName);
    fd.append('countryCode', recruiterInfo.countryCode);
    fd.append('phoneNumber', recruiterInfo.phoneNumber);
    fd.append('password', recruiterInfo.password);

    return this.http.post(`${this.baseUrl}/auth/recruiter/register`, fd)
  }
  registerJobSeeker(data: Object): Observable<any> {
    return this.register(data, 'jobseeker');
  }

  loginEmployer(data: Object): Observable<any> {
    return this.login(data, 'employer');
  }
  loginJobSeeker(data: Object): Observable<any> {
    return this.login(data, 'jobseeker');
  }

  // Log Out
  logout() {
    this.userData.clearUserData();
  }
}
