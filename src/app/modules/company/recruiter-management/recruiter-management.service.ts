import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RecruiterInvitationRequest } from '../../../shared/models/recruiter/recruiter-invitation-request';

@Injectable({
  providedIn: 'root',
})
export class RecruiterManagementService {
  constructor() {}

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  sendInvitation(req: RecruiterInvitationRequest): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/company-recruiters/invite?recEmail=${req.recruiterEmail}&recJobTitle=${req.recruiterJobTitle}`,
      {
        headers: this.headers,
      }
    );
  }

  getRecruiterProfileImage(): Observable<any> {
    const url = `${this.baseUrl}/recruiter-profile/profile-photo`;
    return this.http.get(url, { headers: this.headers });
  }
  getRecruiterCompanyBasicInfo(): Observable<any> {
    const url = `${this.baseUrl}/recruiter-profile/recruiter-company-basicInfo`;
    return this.http.get(url, { headers: this.headers });
  }

  getRecruiterBasicInfo(): Observable<any> {
    const url = `${this.baseUrl}/recruiter-profile/my-info`;
    return this.http.get(url);
  }

}
