import { Injectable } from '@angular/core';
import { UserDataService } from '../../shared/services/user-data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestService } from '../../shared/services/request.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoaderType } from '../../shared/enum/loader-type.enum';
import { CompanyBasicsInfoResponse } from '../../shared/models/company/CompanyBasicsInfoResponse';
import { CompanyAboutInfoResponse } from '../../shared/models/company/CompanyAboutInfoResponse';
import { ApiResponse } from '../../shared/models/Api-response';
import { Benefit } from '../../shared/models/company/Benefit';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private http: HttpClient,
    private requestService: RequestService,
    private userDataService: UserDataService
  ) {}

  defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAllCompanyData(companyId: any): Observable<any> {
    const loaderData = {
      showLoader: true,
      loaderType: LoaderType.companyProfileLoader,
    };
    console.log(companyId, '** getAllCompanyData **');
    return this.http.get(`${environment.baseUrl}/company-profile/${companyId}`);
  }

  updateBasicsInfo(basicsInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/basic-info`;
    return this.http.put<CompanyBasicsInfoResponse>(url, basicsInfo, {
      headers,
    });
  }
  updateAboutInfo(
    aboutInfo: any
  ): Observable<ApiResponse<CompanyAboutInfoResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/about-info`;
    return this.http.put<ApiResponse<CompanyAboutInfoResponse>>(
      url,
      aboutInfo,
      { headers }
    );
  }

  getIndustries(): Observable<any> {
    const url = `${environment.baseUrl}/api/industries`;
    return this.http.get(url);
  }

  getBenefits(): Observable<Benefit[]> {
    const url = `${environment.baseUrl}/api/benefits`;
    return this.http.get<Benefit[]>(url);
  }

  updateBenefits(benfits: any): Observable<ApiResponse<Benefit[]>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/benefits`;
    return this.http.put<ApiResponse<Benefit[]>>(url, JSON.stringify(benfits), {
      headers,
    });
  }

  getSocialIcons(): Observable<Icon[]> {
    const url = `${environment.baseUrl}/api/social-icons`;
    return this.http.get<Icon[]>(url);
  }

  uploadCoverImage(formData: FormData): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/cover-photo`;
    return this.http.post<any>(url, formData, { headers });
  }

  uploadProfileImage(coverImageFrom: FormData): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/profile-photo`;
    return this.http.post<any>(url, coverImageFrom, { headers });
  }

  getCoverImage(): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/cover-photo`;
    return this.http.get<any>(url, { headers });
  }

  getProfileImage(): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${this.userDataService.getAccessToken()}`,
    });
    const url = `${environment.baseUrl}/company-profile/profile-photo`;
    return this.http.get<any>(url, { headers });
  }

  getCompanyJobs(): Observable<any> {
    // const params = new HttpParams().set('postsNumber', postsNumber);
    const url = `${environment.baseUrl}/jobs/posts`;
    return this.http.get(url, { headers: this.defaultHeader, params: new HttpParams().append('size', 10)});
  }

  getJobPostDashboardNumbers(jobIds: string[]): Observable<any> {
    const url = `${environment.baseUrl}/jobs/posts/dashboard-numbers`;
    return this.http.get(url, { headers: this.defaultHeader, params: new HttpParams().append('jobIds', jobIds.toString())});
  }

  getCompanyStatistics(): Observable<any> {
    const url = `${environment.baseUrl}/company-profile/statistics`;
    return this.http.get(url);
  }

  getRecruiterStatistics(): Observable<any> {
    const url = `${environment.baseUrl}/recruiter-profile/statistics`;
    return this.http.get(url);
  }

  getCompanyName(): Observable<any> {
    let url = environment.baseUrl + '/company-profile/name';
    return this.http.get(url, { headers: this.defaultHeader });
  }

  getAllCompanyRecruitersById(companyId: string): Observable<any> {
    let url = environment.baseUrl + '/company-recruiters/all';
    return this.http.get(url, {
      headers: this.defaultHeader,
      params: { id: companyId },
    });
  }

  getPublicJobPosts(companyId: any) {
    const apiUrl = `${environment.baseUrl}/jobs/posts/published/${companyId}`;
    return this.http.get(apiUrl, { headers: this.defaultHeader });
  }
}
