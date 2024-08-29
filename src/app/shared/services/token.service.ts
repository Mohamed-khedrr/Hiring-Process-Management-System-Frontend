import { jwtDecode } from 'jwt-decode';
import { UserDataService } from './user-data.service';
import { Injectable } from '@angular/core';

// Read only Class
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private userDataService: UserDataService) {}

  isLoggedIn (){
    const token = this._getAccessToken(); 
    console.log(token);
    
    if(token) return true;
    return false;
  }

  _getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  _getRefreshToken(): string | null {
     return localStorage.getItem("");
  }

  isCompany() {
    const userRoles = this.getUserRoles();
    if (userRoles == null) {
      return false;
    }
    return userRoles.includes("ROLE_COMPANY") || userRoles.includes("ROLE_RECRUITER");
  }

  isJobSeeker() {
    const userRoles = this.getUserRoles();
    console.log(userRoles);
    if (userRoles == null) {
      return false;
    }
    return userRoles.includes("ROLE_JOBSEEKER");
  }

  isTokenExpired(): boolean {
    const token = this._getToken();
    let date = null;
    if (token) {
      date = this._getTokenExpirationDate(token);
    }
    if (date === null) return false;
    return date.valueOf() < new Date().valueOf();
  }

  getUserRoles(): string[] | null {
    const token = this._getToken();
    if (token) {
      const decodedToken = this._decodeToken(token);
      return decodedToken.authority || null;
    }
    return null;
  }

  getUserId(): string | null {
    const token = this._getToken();
    if (token) {
      const decodedToken = this._decodeToken(token);
      return decodedToken.jti || null;
    }
    return null;
  }

  getUserEmail(): string | null {
    const token = this._getToken();
    if (token) {
      const decodedToken = this._decodeToken(token);
      return decodedToken.sub || null;
    }
    return null;
  }

  _getTokenExpirationDate(token: string): Date | null {
    const decoded: any = this._decodeToken(token);
    if (!decoded.exp) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  _getToken(): string | null {
    return this.userDataService.getAccessToken();
  }

  _decodeToken(token: string): any {
    return jwtDecode(token);
  }
}
