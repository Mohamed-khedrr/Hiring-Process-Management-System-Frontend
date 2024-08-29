import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private http = inject(HttpClient);

  constructor() { }

  getAllCurrencies(): Observable<any> {
    return this.http.get('http://localhost:1600/APIs/currency');
  }
}
