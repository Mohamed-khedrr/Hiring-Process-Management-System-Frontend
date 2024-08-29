import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/Api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { RequestService } from '../../../shared/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  constructor(private http: HttpClient,private requestService : RequestService) { }

  sendJobPost(jobPost: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts`, jobPost);
  }

  updateInitInfo(jobPost: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/basics-info`, jobPost);
  }

  publishOrSaveJob(jobPost : any ) : Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/advanced-setting`,jobPost);
  }

  deleteNewJob(jobId : any) : Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/new/${jobId}`);
  }

  deleteJob(jobId : any) : Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/${jobId}`);
  }

  closeJob(jobId: any) : Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/${jobId}/close`,{});
  }

  getJobPostInitInfo(jobId : any ) : Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/init-info/${jobId}`);
  }

  getJobPostInfoForAnyUser(jobId : any ) : Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/info-for-user/${jobId}`);
  }

  getJobPostInfoForApp(jobId : any ) : Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/info-for-app/${jobId}`);
  }
  
  getJobPostAdvancedSetting(jobId : any ) : Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/advanced-setting/${jobId}`);
  }

  getJobPostApplicationForm(jobId : any ) : Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.baseUrl}/jobs/app/${jobId}`);
  }
 
  getSavedJobs(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.baseUrl}/jobs/posts/saved`);
  }

  saveJob(jobPostId: any) {
     return this.requestService.put(`${environment.baseUrl}/jobs/posts/saved/${jobPostId}`,{},undefined,true);
  }

}
