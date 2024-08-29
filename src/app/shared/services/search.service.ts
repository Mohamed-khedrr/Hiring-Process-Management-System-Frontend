import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'; 
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http : HttpClient) { }

  search(value: any) {
    return this.http.post(`${this.apiUrl}/search?keyword=${value}`, {}, {headers: this.headers});
  }

  companySearch(value : any , page = 0 , size = 5){
    return this.http.post(`${this.apiUrl}/search/company`, value, {headers: this.headers});
  }
  
  jobsSearch(value : any , page = 0 , size = 5){
    return this.http.post(`${this.apiUrl}/search/job-post`, value, {headers: this.headers});
  }

  jobSeekerSearch(value : any , page = 0 , size = 5){
    return this.http.post(`${this.apiUrl}/search/job-seeker`, value, {headers: this.headers});
  }

  getSuggestions(query: string): Observable<string[]> {
    if (!query.trim()) {
      return of([]);
    }
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${query}`;
    return this.http.get<any[]>(apiUrl).pipe(
      map((response:any) => response[1] as string[])
    );
  }

}
