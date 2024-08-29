import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root',
})
export class RecommendationService {
    http = inject(HttpClient);
    baseUrl = environment.flask_url;

    getRecommendedJobSeekers(employer_type: string, page_number: number, page_size: number): Observable<any> {
        let url: string = this.baseUrl+"/job-recommendation/"+ employer_type +"/"+page_number+"/"+page_size;
        return this.http.get(url)
    }

    getRecommendedJobPosts(page_number: number, page_size: number): Observable<any> {
        let url: string = this.baseUrl+"/job-seekers-recommendation/"+page_number+"/"+page_size;
        return this.http.get(url)
    }


}