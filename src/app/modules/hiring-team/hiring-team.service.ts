import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, from, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/services/token.service';
import { RecruiterInvitationRequest } from '../../shared/models/recruiter/recruiter-invitation-request';
import { FormBuilder } from '@angular/forms';
import { RecruiterUpdateInfoByCompany } from '../../shared/models/recruiter/recruiter-update-into-by-company';


@Injectable({
  providedIn: 'root',
})
export class HiringTeamService implements OnInit {

  tokenService = inject(TokenService)
  formBuilder = inject(FormBuilder)

  userId: string | undefined;
  
  ngOnInit(): void {
     this.userId= this.tokenService.getUserId() as string
  }
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  getCompanyPendingInvitiations(): Observable<any> {
    return this.http.get(this.baseUrl+"/company-recruiters/all-valid-invitations")
  }
  
  getCompanyRecruiters(): Observable<any> {
    return this.http.get(this.baseUrl+"/company-recruiters/my-all")
  }

  updateRecruiter(recruiterId: string, recuiterEmailAndTitle: RecruiterUpdateInfoByCompany): Observable<any> {
    const options = { params: new HttpParams().set('recruiterId', recruiterId) };
    return this.http.post(this.baseUrl+"/company-recruiters/update", recuiterEmailAndTitle, options)
  }

  deleteRecruiter(recruiterEmail: string): Observable<any> {
    const options = { params: new HttpParams().set('recEmail', recruiterEmail) };
    return this.http.delete(this.baseUrl+"/company-recruiters/member", options)
  }

  deleteInvitation(recruiterEmail: string): Observable<any> {
    const options = { params: new HttpParams().set('recEmail', recruiterEmail) };
    return this.http.delete(this.baseUrl+"/company-recruiters/invitation", options)
  }
  
}
