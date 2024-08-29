import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assessment } from '../../../shared/models/app/assessment';
import { Interview } from '../../../shared/models/app/interview';
import { InterviewStatus } from '../../../shared/models/app/InterviewStatus';
import { AssessmentStatus } from '../../../shared/models/app/AssessmentStatus';

@Injectable({
  providedIn: 'root',
})
export class AppEvaluationService {
  constructor() {}

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  addAssessment(assessment: Assessment): Observable<any> {
    let url: string = this.baseUrl + '/app/assessment';
    return this.http.post(url, assessment);
  }

  editAssessment(
    assessmentId: string,
    assessment: Assessment
  ): Observable<any> {
    let url: string = this.baseUrl + '/app/assessment';
    const options = {
      params: new HttpParams().set('evaluationId', assessmentId),
    };
    return this.http.put(url, assessment, options);
  }

  addInterview(interview: Interview): Observable<any> {
    let url: string = this.baseUrl + '/app/interview';
    return this.http.post(url, interview);
  }

  editInterview(interviewId: string, interview: Interview): Observable<any> {
    let url: string = this.baseUrl + '/app/interview';
    const options = {
      params: new HttpParams().set('evaluationId', interviewId),
    };
    return this.http.put(url, interview, options);
  }

  changeInterviewStatus(
    interviewId: string,
    interviewStatus: InterviewStatus
  ): Observable<any> {
    let url: string = this.baseUrl + '/app/interview-status';
    const options = {
      params: new HttpParams()
        .append('evaluationId', interviewId)
        .append('interviewStatus', interviewStatus),
    };
    return this.http.put(url, null, options);
  }

  changeAssessmentStatus(
    assessmentId: string,
    assessmentStatus: AssessmentStatus
  ): Observable<any> {
    let url: string = this.baseUrl + '/app/assessment-status';
    const options = {
      params: new HttpParams()
        .append('evaluationId', assessmentId)
        .append('assessmentStatus', assessmentStatus),
    };
    return this.http.put(url, null, options);
  }

  changeAssessmentResult(
    assessmentId: string,
    assessmentResult: string
  ): Observable<any> {
    let url: string = this.baseUrl + '/app/assessment-result';
    const options = {
      params: new HttpParams()
        .append('evaluationId', assessmentId)
        .append('assessmentResult', assessmentResult),
    };
    return this.http.put(url, null, options);
  }

  deleteInterview(interviewId: string): Observable<any> {
    let url: string = this.baseUrl + '/app/interview';
    const options = {
      params: new HttpParams().set('evaluationId', interviewId),
    };
    return this.http.delete(url, options);
  }

  deleteAssessment(assessmentId: string): Observable<any> {
    let url: string = this.baseUrl + '/app/assessment';
    const options = {
      params: new HttpParams().set('evaluationId', assessmentId),
    };
    return this.http.delete(url, options);
  }

  getAssessment(assessmentId: string): Observable<any> {
    let url: string = this.baseUrl + '/app/assessment';
    const options = {
      params: new HttpParams().set('assessmentId', assessmentId),
    };
    return this.http.get(url, options);
  }

  getAllAssessmentsForApplication(applicationId: string): Observable<any> {
    let url: string = this.baseUrl + '/app/assessments';
    const options = {
      params: new HttpParams().set('applicationId', applicationId),
    };
    return this.http.get(url, options);
  }

  getInterview(interviewId: string): Observable<any> {
    let url: string = this.baseUrl + '/app/interview';
    const options = {
      params: new HttpParams().set('interviewId', interviewId),
    };
    return this.http.get(url, options);
  }

  getAllInterviewsForApplication(applicationId: string): Observable<any> {
    let url: string = this.baseUrl + '/app/interviews';
    const options = {
      params: new HttpParams().set('applicationId', applicationId),
    };
    return this.http.get(url, options);
  }
}
