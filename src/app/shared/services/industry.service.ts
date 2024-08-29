import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/Api-response';
import { Industry } from '../models/common/Industry';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(public http: HttpClient) { }

  getIndustries(): Observable<ApiResponse<Industry[]>> {
    return this.http.get<ApiResponse<Industry[]>>(`${environment.baseUrl}/api/industries`);
  }

}
