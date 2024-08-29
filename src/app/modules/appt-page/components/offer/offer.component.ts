import { OfferForms } from './../../../../shared/models/app/offer-forms.enum';
import { PublicPipesSharedModuleModule } from './../../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Offer } from '../../../../shared/models/app/offer';
import { OfferStatus } from '../../../../shared/models/app/OfferStatus';
import { AppOfferService } from '../../services/app-offer.service';
import { FormBuilder } from '@angular/forms';
import { OfferComment } from '../../../../shared/models/app/offerComment';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
  standalone:true ,
  imports : [
    CommonModule,
    PublicPipesSharedModuleModule
  ]
})
export class OfferComponent implements OnInit , OnChanges {

  appOfferService = inject(AppOfferService);
  formBuilder = inject(FormBuilder)

  @Output() editOfferEvent = new EventEmitter<any>();

  @Input() applicationId: any;
  @Input() isFormDestroyed: any;

  OfferForms = OfferForms
  offerId!: any;
  applicationOffer : Offer | null = null ;
  companyDocumentSize:number = 0

  ngOnInit() {
    this.getOfferForApplication(this.applicationId)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isFormDestroyed']){
      this.getOfferForApplication(this.applicationId)
    }
  }

  editOfferStatus(offerId: string, offerStatus: OfferStatus) {
    this.appOfferService.changeOfferStatus(offerId, offerStatus)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addOfferSignedFile(offerId: string, e:any) {
    const file =  <File>e.target.files[0];
    const formData = new FormData()
    formData.append('file', file, file.name);
    this.appOfferService.addOfferSignedFile(formData, offerId)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getOfferForApplication(applicationId: string) {
    this.appOfferService.getOfferForApplication(applicationId)
    .subscribe({
      next: (res) => {
        this.applicationOffer = res.body
        if(this.applicationOffer?.comments)
        this.applicationOffer.comments = this.applicationOffer.comments?.sort((a , b) => (new Date(a.createdAt as string).getTime() - new Date(b.createdAt as string).getTime())) as OfferComment[];
        this.offerId = res.body.id;

        this.companyDocumentSize = this.calcFileSize(this.applicationOffer?.documentByCompany)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteOffer(offerId: string) {
    this.appOfferService.deleteOffer(offerId)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  sendOfferToEditFrom(objToEdit:any | OfferComment , form:OfferForms ){
      const data = {
        data : objToEdit,
        formType : form,
        offerId : this.offerId
      }
      this.editOfferEvent.emit(data)
  }


  http = inject(HttpClient)

  calcFileSize(url:any):any{
    let x = 0 ;
    let subscription = this.appOfferService.getFileSize(url).subscribe({
      next:(res) => {
        this.companyDocumentSize = res;
      },
      error(err) {
          console.log(err)
      },
      complete() {
          subscription.unsubscribe()
      },
    })
  }


}


