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
export class GeneralAppService {

  constructor() { }

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  getApplicationsOfJob(jobId: string): Observable<any> {
    let url: string = this.baseUrl+"/jobs/app/info/"+jobId;
    return this.http.get(url)
  }

  getApplicationAnswers(appId: string): Observable<any> {
    let url: string = this.baseUrl+"/jobs/app/answers/"+appId;
    return this.http.get(url)
  }

  getJobSeekerJobsForApplications(): Observable<any> {
    let url: string = this.baseUrl+"/jobs/posts/apps-posts";
    return this.http.get(url)
  }

  getApplicantProfile(appId: string): Observable<any> {
    let url: string = this.baseUrl+"/jobs/app/app-info/"+appId;
    return this.http.get(url)
  }

  moveApplication(appId: string, appStatus: ApplicationStatus): Observable<any> {
    let url: string = this.baseUrl+"/app/status";
    const options = { params: new HttpParams().append("appId", appId).append("applicationStatus", appStatus)}
    return this.http.put(url, null, options)
  }

  markAssesmentsViewed(appId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/evaluations/mark-viewed";
    const options = { params: new HttpParams().append("appId", appId).append("evaluationType", "Assessment")}
    return this.http.put(url, null, options)
  }

  markInterviewsViewed(appId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/evaluations/mark-viewed";
    const options = { params: new HttpParams().append("appId", appId).append("evaluationType", "Interview")}
    return this.http.put(url, null, options)
  }

  markOfferAndItsCommentsViewed(appId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/offer/mark-viewed";
    const options = { params: new HttpParams().append("appId", appId)}
    return this.http.put(url, null, options)
  }

  isJobSeekerAppliedToJobPost(jobId: string): Observable<any> {
    let url: string = this.baseUrl+"/jobs/app/is-applied";
    const options = { params: new HttpParams().append("jobId", jobId)}
    return this.http.get(url, options)
  }
  
}
