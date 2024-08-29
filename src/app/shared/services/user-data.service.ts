import { Injectable, inject } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

// 01efbfbd-5eef-bfbd-efbf-bdefbfbd4358 :   gdekneveti@craigslist.org
// 1fefbfbd-64ef-bfbd-19ef-bfbd4169efbf :   tjaulmex@people.com.cn
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  registerdEmail = '';
  userRole = '';
  private accessToken = '';
  private refreshToken: string = '';
  private userId: string = '';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor() {}

  setAccessToken(newAccessToken: string) {
    this.accessToken = newAccessToken;
    localStorage.setItem('accessToken', newAccessToken);
  }

  setRefreshToken(newRefreshToken: string) {
    this.refreshToken = newRefreshToken;
    localStorage.setItem('refreshToken', newRefreshToken);
  }

  // Set The user role to (employer , jobSeeker)
  setUserRoleEmployer() {
    return (this.userRole = 'company');
  }

  setUserRoleJobSeeker() {
    return (this.userRole = 'jobseeker');
  }

  getRefreshToken() {
    if (this.refreshToken) {
      return this.refreshToken;
    } else {
      return localStorage.getItem('refreshToken') || '';
    }
  }

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    } else {
      return localStorage.getItem('accessToken') || '';
    }
  }

  // get User Role
  getUserRole(): string {
    return this.userRole;
  }

  setRegisterdEmail(email: string) {
    this.registerdEmail = email;
  }

  getRegisterdEmail() {
    return this.registerdEmail;
  }

  clearUserData() {
    this.registerdEmail = '';
    this.userRole = '';
    this.clearAccessToken();
    this.clearRefreshToken();
  }

  clearAccessToken() {
    localStorage.removeItem('accessToken');
    this.accessToken = '';
  }

  clearRefreshToken() {
    localStorage.removeItem('refreshToken');
    this.refreshToken = '';
  }

  // Request new Access token
  RequestNewAccessToken(): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${this.getAccessToken()}`,
      'Refresh-Token': `Bearer ${this.getRefreshToken()}`,
    });
    // Request new AccessToken
    return this.http.post(
      `${this.baseUrl}/auth/refresh-token`,
      {},
      {
        headers: header,
      }
    );
  }

  checkIsProfileOwner(profileId: string): Observable<any> {
    const url = `${this.baseUrl}/user/is-profile-owner`;
    return this.http.get(url, {
      headers: this.headers,
      params: { profileId: profileId },
    });
  }

  /*
    getUserRoles(): any {
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdWhhbW1lZHNhZndhdDVAZ21haWwuY29tIiwicmlnaHRzIjpbXSwidXNlcklkIjo1NiwicmVmcmVzaCI6MSwic3RhdGUiOjIsImlhdCI6MTcwODAwMDc0MiwiZXhwIjoxNzA4MzYwNzQyfQ.d013ttdJY25HAwLfSdjtD23Y_74wpUCD2CmjtD35Dug";
      const decoded = jwtDecode(token);

      console.log(decoded?.aud);
      console.log(decoded?.exp);
      console.log(decoded?.iat);
      console.log(decoded?.nbf);
      console.log(decoded?.sub);
    }

  */
}
