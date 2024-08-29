import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { SpinnerService } from './spinner.service'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoaderData } from '../models/common/loaderData';
import { ApiResponse } from '../models/Api-response';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  defaultHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient, private spinner: SpinnerService) { }

  get_With_loaderData(
    url: string,
    loaderObj: LoaderData,
    headers?: HttpHeaders,
    queryParams?: any[]
  ): Observable<ApiResponse<any>> {
    if (!headers) {
      headers = this.defaultHeader;
    }
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    if (loaderObj.showLoader && loaderObj.loaderType) {
      this.loaderService.showLoader(loaderObj);
    }

    return this.http.get<any>(url, { headers: headers, params: params }).pipe(
      map((res) => {
        setTimeout(() => {
          this.loaderService.closeLoader();
        }, 500);
        return res;
      }),
      catchError((err) => {
        this.loaderService.closeLoader();
        return throwError(() => new Error(err));
      })
    );
  }


  get(apiUrl: string, queryParams?: any,showSpinner?: boolean, headers?: any): Observable<any> {
    if (!headers) {
      headers = new HttpHeaders();
    }

    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        params = params.set(key, queryParams[key]);
      });
    }

    this.spinner.show(showSpinner);

    return this._http.get(apiUrl, { headers, params }).pipe(
      map((res: any) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 700);
        return res;
      }),
      catchError(err => {
        this.spinner.hide();
        return throwError(() => new Error(err));
      })
    );
  }

  post(apiUrl: string, body: any, queryParams?: any[], showSpinner?: boolean, headers?: any): Observable<any> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    // debugger
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    this.spinner.show(showSpinner);
    return this._http.post<any>(apiUrl, body, { headers: headers, params: params }).pipe(map((res) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 700)
      return res;
    }), catchError(err => {
      this.spinner.hide();
      return throwError(() => new Error(err));
    }))
  }

  delete(apiUrl: string, queryParams?: any[], showSpinner?: boolean, headers?: any): Observable<any> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    // debugger
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    this.spinner.show(showSpinner);

    return this._http.delete<any>(apiUrl, { headers: headers, params: params }).pipe(map((res) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 700)
      return res;
    }), catchError(err => {
      this.spinner.hide();
      return throwError(() => new Error(err));
    }))
  }

  put(apiUrl: string, body: any, queryParams?: any[], showSpinner?: boolean, headers?: any): Observable<any> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    // debugger
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    this.spinner.show(showSpinner);
    return this._http.put<any>(apiUrl, body, { headers: headers, params: params }).pipe(map((res) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 700)
      return res;
    }), catchError(err => {
      this.spinner.hide();
      return throwError(() => new Error(err));
    }))
  }

  postWithLoaderData(
    url: string,
    body: any,
    loaderObj: LoaderData,
    headers?: any,
    queryParams?: any[]
  ): Observable<any> {
    if (!headers) {
      headers = this.defaultHeader;
    }
    // debugger
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    if (loaderObj.showLoader && loaderObj.loaderType) {
      // Show Loader Here accoreding to loader type and message
      this.loaderService.showLoader(loaderObj);
    }
    return this.http
      .post<any>(url, body, { headers: headers, params: params })
      .pipe(
        map((res) => {
          setTimeout(() => {
            this.loaderService.closeLoader();
          }, 500);
          return res;
        }),
        catchError((err) => {
          this.loaderService.closeLoader();
          return throwError(() => new Error(err));
        })
      );
  }

  deleteWithLoaderData(
    url: string,
    loaderObj: LoaderData,
    headers?: any,
    queryParams?: any[],
    body?: any
  ): Observable<any> {
    if (!headers) {
      headers = this.defaultHeader;
    }
    // debugger
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    if (loaderObj.showLoader && loaderObj.loaderType) {
      // Show Loader Here accoreding to loader type and message
      this.loaderService.showLoader(loaderObj);
    }

    return this.http
      .delete<any>(url, { headers: headers, params: params, body: body })
      .pipe(
        map((res) => {
          setTimeout(() => {
            this.loaderService.closeLoader();
          }, 500);
          return res;
        }),
        catchError((err) => {
          this.loaderService.closeLoader();
          return throwError(() => new Error(err));
        })
      );
  }

  putWithLoaderData(
    url: string,
    body: any,
    loaderObj: LoaderData,
    headers?: any,
    queryParams?: any[]
  ): Observable<any> {
    if (!headers) {
      headers = this.defaultHeader;
    }
    // debugger
    let params = new HttpParams();
    if (queryParams && queryParams.length > 0) {
      params = this.addQueryParams(queryParams);
    }

    if (loaderObj.showLoader && loaderObj.loaderType) {
      // Show Loader Here accoreding to loader type and message
      this.loaderService.showLoader(loaderObj);
    }

    return this.http
      .put<any>(url, body, { headers: headers, params: params })
      .pipe(
        map((res) => {
          setTimeout(() => {
            this.loaderService.closeLoader();
          }, 500);
          return res;
        }),
        catchError((err) => {
          this.loaderService.closeLoader();
          return throwError(() => new Error(err));
        })
      );
  }
  addQueryParams(queryParams: any[]) {
    let params = new HttpParams();
    for (let param of queryParams) {
      let entries = Object.entries(param)[0];
      let paramName: string = entries[0];
      let paramValue: any = entries[1];
      params = params.set(paramName, paramValue);
    }

    return params;
  }
}
