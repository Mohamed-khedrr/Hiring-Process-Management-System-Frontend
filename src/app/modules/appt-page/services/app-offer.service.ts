import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Offer } from '../../../shared/models/app/offer';
import { Interview } from '../../../shared/models/app/interview';
import { InterviewStatus } from '../../../shared/models/app/InterviewStatus';
import { OfferStatus } from '../../../shared/models/app/OfferStatus';
import { OfferComment } from '../../../shared/models/app/offerComment';
import { HandleFileUrlPipe } from '../../../shared/pipes/public-pipes/handle-file-url.pipe';

@Injectable({
  providedIn: 'root'
})
export class AppOfferService {

  constructor() { }

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  router = inject(Router);

  addOffer(offer: Offer): Observable<any> {
    let url: string = this.baseUrl+"/app/offer";
    return this.http.post(url, offer)
  }

  addOfferEmployerFile(offerFileForm: FormData, offerId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/offer/employer-file";
    const options = { params: new HttpParams().set('offerId', offerId) };
    return this.http.put(url, offerFileForm, options)
  }

  addOfferSignedFile(signedFileForm: FormData, offerId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/offer/signed-file";
    const options = { params: new HttpParams().set('offerId', offerId) };
    return this.http.put(url, signedFileForm, options)
  }

  editOffer(offerId: string, offer: Offer): Observable<any> {
    let url: string = this.baseUrl+"/app/offer";
    const options = { params: new HttpParams().set('offerId', offerId) };
    return this.http.put(url, offer, options)
  }

  changeOfferStatus(offerId: string, offerStatus: OfferStatus): Observable<any> {
    let url: string = this.baseUrl+"/app/offer-status";
    const options = { params: new HttpParams().append('offerId', offerId).append('offerStatus', offerStatus) };
    return this.http.put(url, null, options)
  }

  deleteOffer(offerId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/offer";
    const options = { params: new HttpParams().set('offerId', offerId) };
    return this.http.delete(url, options)
  }

  getOfferForApplication(applicationId: string): Observable<any> {
    let url: string = this.baseUrl+"/app/offer";
    const options = { params: new HttpParams().set('applicationId', applicationId) };
    return this.http.get(url, options)
  }

  addOfferComment(offerComment: OfferComment): Observable<any> {
    let url: string = this.baseUrl+"/app/offer-comment";
    return this.http.post(url, offerComment)
  }

  getFileName(filePath: string): string {
    if(!filePath) return "" ;
    const pathParts = filePath.split(/[/\\]/);
    return pathParts[pathParts.length - 1];
  }

  getFileSize(fileUrl:string): Observable<any> {
    // Set headers if needed, such as authorization headers
    let handleFileUrl =new HandleFileUrlPipe()
    const url =handleFileUrl.transform(fileUrl)

    return this.http.head(url, {  observe: 'response', responseType: 'blob' })
      .pipe(
        map(response => {
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            return (parseInt(contentLength, 10) / (1024 * 1024)).toFixed(2);
          } else {
            throw new Error('Content-Length header not found');
          }
        }),
      );
  }


}
