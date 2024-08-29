import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assessment } from '../../../shared/models/app/assessment';
import { Interview } from '../../../shared/models/app/interview';
import { InterviewStatus } from '../../../shared/models/app/InterviewStatus';
import { AssessmentStatus } from '../../../shared/models/app/AssessmentStatus';
import { ApplicationStatus } from '../../../shared/models/app/ApplicationStatus';

@Injectable({
  providedIn: 'root'
})
export class AppTimelineService {

  constructor() { }

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  getTimelineApplications(appId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/timeline";
    const options = { params: new HttpParams().append("appId", appId)}
    return this.http.get(url, options)
  }

  moveApplication(appId: string, appStatus: ApplicationStatus): Observable<any> {
    let url: string = this.baseUrl+"/app/status";
    const options = { params: new HttpParams().append("appId", appId).append("applicationStatus", appStatus)}
    return this.http.put(url, null, options)
  }
  
}
