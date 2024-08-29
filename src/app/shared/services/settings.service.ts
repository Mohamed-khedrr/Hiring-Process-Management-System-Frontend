import { Injectable, inject } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { CompanySubscriptionChoices } from '../models/company/CompanySubscriptionChoices'; 
import { RecruiterBasicInfo } from '../models/recruiter/recruiter-basic-info';
import { RecruiterUpdateBasicInfoRequest } from '../models/recruiter/recruiter-update-info-request';
import { ChangePasswordRequest } from '../models/job-seeker/Change-password-request';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  getCompanySubscriptionChoices(): Observable<any> {
    return this.http.get(this.baseUrl+'/company-profile/subscriptionChoices')
  }

  setCompanySubscriptionChoices(subscriptionChoices: CompanySubscriptionChoices): Observable<any> {
    return this.http.put(this.baseUrl+'/company-profile/subscriptionChoices', subscriptionChoices)
  }

  getRecruiterSubscriptionChoices(): Observable<any> {
    return this.http.get(this.baseUrl+'/recruiter-profile/subscriptionChoices')
  }

  setRecruiterSubscriptionChoices(subscriptionChoices: CompanySubscriptionChoices): Observable<any> {
    return this.http.put(this.baseUrl+'/recruiter-profile/subscriptionChoices', subscriptionChoices)
  }

  updateRecruiterBasicInfo(recruiterBasicInfo: RecruiterUpdateBasicInfoRequest): Observable<any> {
    return this.http.post(this.baseUrl+'/recruiter-profile/info', recruiterBasicInfo)
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any>{
    return this.http.post(this.baseUrl+'/change-password', changePasswordRequest, {
      headers: this.headers,
    })
  }

  removeProfilePhoto() {
    return this.http.delete(this.baseUrl+'/recruiter-profile/profile-photo')
  }

  updateProfilePhoto(photo: File) {
    const fd = new FormData();
    fd.append('photo', photo, photo.name);
    return this.http.post(this.baseUrl+'/recruiter-profile/profile-photo', fd)
  }

  setJobSeekerPrivateAccountStatus(value: boolean): Observable<any>{
    return this.http.post(this.baseUrl+`/jobseeker-profile/private-status?value=${value}`,{
      headers: this.headers,
    })
  }

  getJobSeekerPrivateAccountStatus(): Observable<any>{
    return this.http.get(this.baseUrl+'/jobseeker-profile/private-status',{
      headers: this.headers,
    })
  }

  setJobSeekerReceiveNotificationsStatus(value: boolean): Observable<any>{
    return this.http.post(this.baseUrl+`/settings/receive-notifications-status?value=${value}`,{
      headers: this.headers,
    })
  }

  getJobSeekerReceiveNotificationsStatus(): Observable<any>{
    return this.http.get(this.baseUrl+'/settings/receive-notifications-status',{
      headers: this.headers,
    })
  }

  setJobSeekerReceiveJobAlertsStatus(value: boolean): Observable<any>{
    return this.http.post(this.baseUrl+`/jobseeker-profile/receive-job-alerts-status?value=${value}`,{
      headers: this.headers,
    })
  }

  getJobSeekerReceiveJobAlertsStatus(): Observable<any>{
    return this.http.get(this.baseUrl+'/jobseeker-profile/receive-job-alerts-status',{
      headers: this.headers,
    })
  }

  deleteAccount(): Observable<any>{
    return this.http.post(this.baseUrl+'/settings/delete-account',{
      headers: this.headers,
    })
  }

  signOut(){ 
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
  }

  undeleteAccount(): Observable<any>{
    return this.http.post(this.baseUrl+'/settings/undelete-account',{
      headers: this.headers,
    })
  }
  
}
