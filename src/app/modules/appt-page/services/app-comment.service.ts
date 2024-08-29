import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComment } from '../../../shared/models/app/appComment';


@Injectable({
  providedIn: 'root'
})
export class AppCommentService {

  constructor() { }

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  addComment(comment: AppComment): Observable<any> {
    let url: string = this.baseUrl+"/app/comment";
    return this.http.post(url, comment)
  }

  getCommentsForApplication(applicationId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/comments";
    const options = { params: new HttpParams().set('appId', applicationId) };
    return this.http.get(url, options)
  }

}
