// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserDataService } from '../shared/services/user-data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Flag To prevent  infinite loops in case of failed authentication attempts
  private refresh = false;
  // Backend Base Url
  baseUrl = environment.baseUrl;
  flaskUrl = environment.flask_url

  userData = inject(UserDataService);

  // Interceptor Method
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Validate the request Direction
    if (!request || !(request.url.startsWith(this.baseUrl) || request.url.startsWith(this.flaskUrl)))
      return next.handle(request);

    // Clone The Comming Request and attach the Access Token
    let newRequest = this.setAccessToken(request);

    return next.handle(newRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        // Check if the error because of expired access token or not

        // if (err.status === 401 && this.refreshToken !== '' && !this.refresh) {
        if (this.userData.getRefreshToken() !== '' && !this.refresh) {
          this.refresh = true;
          console.log('Refreshing Access Token');

          return this.userData.RequestNewAccessToken().pipe(
            switchMap((res: any) => {
              this.userData.setAccessToken(res.body.accessToken);

              // Resend The request with new access
              newRequest = this.setAccessToken(request);
              return next.handle(newRequest);
            })
          );
        }
        // return the refresh back if the error wasn't un auth err 401
        this.refresh = false;

        // FIX redirect user to the correct error route
        return throwError(() => err);
      })
    );
  }

  // set Access Token
  setAccessToken(oldReq: HttpRequest<any>) {
    return oldReq.clone({
      setHeaders: {
        Authorization: `Bearer  ${this.userData.getAccessToken()}`,
      },
    });
  }
}
