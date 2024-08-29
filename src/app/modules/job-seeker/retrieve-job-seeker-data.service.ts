import { LoaderType } from './../../shared/enum/loader-type.enum';
import { LoaderData } from './../../shared/models/common/loaderData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RequestService } from '../../shared/services/request.service';

@Injectable({
  providedIn: 'root',
})
export class RetrieveJobSeekerDataService {
  constructor() {}

  // Variables
  http = inject(HttpClient);
  requestService = inject(RequestService);
  baseUrl = environment.baseUrl;
  yearsList: number[] = [];

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // Retrive Data
  getSecondStageData(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/career-interests`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }
  getProfileImageUrl(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobseeker-profile/profile-photo`, {
      headers: this.headers,
    });
  }

  getFirstStageData(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/basic-info`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getLanguages(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-language`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getLanguageNames(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/APIs/languageNames`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getAllJobNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/APIs/jobNames`, {
      headers: this.headers,
    });
  }

  getJobNamesBySearch(st: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/APIs/jobNamesLike?stringToSearch=${st}`,
      {
        headers: this.headers,
      }
    );
  }

  getJobNamesByLimit(limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/APIs/jobNamesLimit?limit=${limit}`, {
      headers: this.headers,
    });
  }

  getProfessionalInfo(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/professional-info`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getEducationInfo(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-education`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getExperience(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-job-experience`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }
  getCertficates(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-certificate`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getWorkSamples(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/work-samples-urls`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getWorkSamplesByUserId(userId: string): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/work-samples-urls-by-userId`;
    let loaderObject: LoaderData = {
      showLoader: false,
      loaderType: LoaderType.none,
    };

    return this.requestService.get_With_loaderData(url, loaderObject, this.headers, [
      { userId },
    ]);
  }

  getCv(showLoader: boolean = false, loaderType?: LoaderType): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/cv-url`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getNameAndEmail(
    showLoader: boolean = false,
    loaderType?: LoaderType
  ): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/name-email`;
    let loaderObject: LoaderData = {
      showLoader: showLoader,
      loaderType: loaderType,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getCountryCodes(): Observable<any> {
    let url = `${this.baseUrl}/APIs/countryCodes`;
    let loaderObject: LoaderData = {
      showLoader: false,
      loaderType: LoaderType.none,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers);
  }

  getSkillsListLimit(limit: number = 100): Observable<any> {
    let url = `${this.baseUrl}/APIs/skillsLimit`;
    let loaderObject: LoaderData = {
      showLoader: false,
      loaderType: LoaderType.none,
    };
    return this.requestService.get_With_loaderData(url, loaderObject, this.headers, [
      { limit },
    ]);
  }

  getskillsBySearch(skill: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/APIs/skillsLike?stringToSearch=${skill}`,
      {
        headers: this.headers,
      }
    );
  }

  getAllJobSeekerProfileInfo(userId: string) {
    return this.http.get(
      `${this.baseUrl}/jobseeker-profile/other-info?userId=${userId}`,
      {
        headers: this.headers,
      }
    );
  }


  getSavedJobPosts(companyId : any ,  page : any ,  size : any){
    
  }


}
