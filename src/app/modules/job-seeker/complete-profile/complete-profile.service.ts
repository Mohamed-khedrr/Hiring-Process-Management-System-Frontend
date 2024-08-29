import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobSeekerBasicInfomation } from '../../../shared/models/job-seeker/complete-profile/job-seeker-basic-info-model';
import { CareerInterestDataModel } from '../../../shared/models/job-seeker/complete-profile/career-interest-data-model';
import { EducationData } from '../../../shared/models/job-seeker/complete-profile/education-data';
import { ExperienceDataModel } from '../../../shared/models/job-seeker/complete-profile/experience-data-model';
import { SampleDataModel } from '../../../shared/models/job-seeker/complete-profile/sampleDataModel';
import { RequestService } from '../../../shared/services/request.service';
import { LoaderType } from '../../../shared/enum/loader-type.enum';
import { LoaderData } from '../../../shared/models/common/loaderData';
import { LanguageData } from '../../../shared/models/job-seeker/complete-profile/language-data';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CertificateData } from '../../../shared/models/job-seeker/complete-profile/certificateData';

@Injectable({
  providedIn: 'root',
})
export class CompleteProfileService {
  // Variables
  http = inject(HttpClient);
  requestService = inject(RequestService);

  baseUrl = environment.baseUrl;
  yearsList: number[] = [];

  monthsList: Array<number> = Array.from(
    { length: 12 },
    (_, index) => index + 1
  );

  noLoaderObj: LoaderData = {
    showLoader: false,
    loaderType: LoaderType.none,
  };
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor() {
    this.fillYearsList();
  }

  saveCareerInterest(data: CareerInterestDataModel): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/jobseeker-profile/career-interests`,
      data,
      {
        headers: this.headers,
      }
    );
  }

  saveBasicInfo(data: JobSeekerBasicInfomation) {
    return this.http.post(
      `${this.baseUrl}/jobseeker-profile/basic-info`,
      data,
      {
        headers: this.headers,
      }
    );
  }

  saveLanguage(data: {
    languageName: string;
    languageLevel: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/jobseeker-language`, data, {
      headers: this.headers,
    });
  }

  saveProfessionalInfo(data: {
    yearsOfExperience: string;
    skills: Array<string>;
  }): Observable<any> {
    console.log('Proffision ', data);
    return this.http.post(
      `${this.baseUrl}/jobseeker-profile/professional-info`,
      data,
      { headers: this.headers }
    );
  }

  saveEducationInfo(data: EducationData): Observable<any> {
    return this.http.post(`${this.baseUrl}/jobseeker-education`, data, {
      headers: this.headers,
    });
  }

  saveExperience(data: ExperienceDataModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/jobseeker-job-experience`, data, {
      headers: this.headers,
    });
  }

  saveCertificate(data: CertificateData): Observable<any> {
    return this.http.post(`${this.baseUrl}/jobseeker-certificate`, data, {
      headers: this.headers,
    });
  }

  uploadPorfileImage(selectedFile: File): Observable<any> {
    const fd = new FormData();
    fd.append('photo', selectedFile, selectedFile.name);
    return this.http.post(
      `${this.baseUrl}/jobseeker-profile/profile-photo`,
      fd
    );
  }

  uploadCV(selectedFile: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post(`${this.baseUrl}/jobseeker-profile/cv`, fd);
  }

  removeCV(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/jobseeker-profile/cv`);
  }

  uploadWrokSample(data: SampleDataModel): Observable<any> {
    const fd = new FormData();
    fd.append('photo', data.photo, data.photo.name);
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('link', data.link);
    return this.http.post(`${this.baseUrl}/jobseeker-profile/work-sample`, fd);
  }

  dataToIso(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    return date.toISOString();
  }

  isoToDate(isoDate: string) {
    return new Date(isoDate);
  }

  fillYearsList() {
    const j = new Date().getFullYear();
    for (let i = 1900; i <= j; i++) {
      this.yearsList.push(i);
    }
  }

  deleteEducation(id: string): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-education`;
    let params = [{ eduId: id }];
    return this.requestService.deleteWithLoaderData(
      url,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

  deleteCertificate(id: string): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-certificate`;
    let params = [{ certId: id }];
    return this.requestService.deleteWithLoaderData(
      url,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

  deleteExperience(id: string): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-job-experience`;
    let params = [{ expId: id }];
    return this.requestService.deleteWithLoaderData(
      url,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

  deleteLanguage(data: LanguageData): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-language`;
    return this.requestService.deleteWithLoaderData(
      url,
      this.noLoaderObj,
      this.headers,
      [],
      data
    );
  }

  deleteWorkSample(id: string): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-profile/work-sample`;
    let params = [{ sampleId: id }];
    return this.requestService.deleteWithLoaderData(
      url,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

  updateEducation(data: EducationData): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-education`;
    let params = [{ eduId: data.id }];
    return this.requestService.putWithLoaderData(
      url,
      data,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

  updateCertificate(data: CertificateData): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-certificate`;
    let params = [{ certId: data.id }];
    return this.requestService.putWithLoaderData(
      url,
      data,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

  updateExperience(data: ExperienceDataModel): Observable<any> {
    let url = `${this.baseUrl}/jobseeker-job-experience`;
    let params = [{ expId: data.id }];
    return this.requestService.putWithLoaderData(
      url,
      data,
      this.noLoaderObj,
      this.headers,
      params
    );
  }

}
