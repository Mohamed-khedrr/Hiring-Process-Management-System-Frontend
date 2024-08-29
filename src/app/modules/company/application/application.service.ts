import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  http = inject(HttpClient);

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor() {}

  submitQuestionsApplication(
    jobPostId: string,
    application: Array<{ questionId: string; questionAnswer: string }>
  ): Observable<any> {
    console.log(`${environment.baseUrl}/jobs/app/${jobPostId}`);
    console.log(application);
    return this.http.post(
      `${environment.baseUrl}/jobs/app/${jobPostId}`,
      application,
      { headers: this.headers }
    );
  }
}
