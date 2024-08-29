import { OfferForms } from './../../../../shared/models/app/offer-forms.enum';
import { Offer } from './../../../../shared/models/app/offer';
import { OfferStatus } from './../../../../shared/models/app/OfferStatus';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppEvaluationService } from '../../services/app-evaluation.service';
import { AppOfferService } from '../../services/app-offer.service';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './offer-form.component.html',
  styleUrl: './offer-form.component.scss'
})
export class OfferFormComponent implements OnInit , OnChanges {

  @Output() hideFromEvent:EventEmitter<boolean> = new EventEmitter() ;
  @Input() applicationId : string = '' ;
  @Input() oldOffer !: Offer | any   ;

  fb = inject(FormBuilder);
  employerAppsService = inject(AppEvaluationService);
  appOfferService = inject(AppOfferService);

  OfferStatus = OfferStatus
  selectedOfferDoc : File | null = null ;

  offerForm = this.fb.group({
    offerDeadline :['' , Validators.required],
    offerDocument: [ '' , Validators.required]
  })

  get offerDeadline(){
    return this.offerForm.controls.offerDeadline ;
  }

  get offerDocument(){
    return this.offerForm.controls.offerDocument ;
  }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['oldOffer']){
      if(this.oldOffer?.id){
        this.setOfferOldData(this.oldOffer)
      }
    }
  }


  submitFrom() {
    const offer :Offer = {
      deadlineAt: new Date(this.offerDeadline.value as string).toISOString(),
      status: OfferStatus.Delivered,
      applicationId: this.applicationId,
    }

    if(this.oldOffer?.id){
      this.editOffer(this.oldOffer?.id , offer)
    }else{
      this.addOfferToApplication(offer) ;
    }
  }


  addOfferToApplication(offer: Offer) {
    this.appOfferService.addOffer(offer)
    .subscribe({
      next: (res) => {
        console.log(res)
        if(!this.selectedOfferDoc)return;
        if(!res.body?.id) return ;
        console.log("Offer Uploaded");
        this.addOfferEmployerFile(res.body.id , this.selectedOfferDoc)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addOfferEmployerFile(offerId: string, file:File) {
    const formData = new FormData()
    formData.append('file', file, file.name);
    this.appOfferService.addOfferEmployerFile(formData, offerId)
    .subscribe({
      next: (res) => {
        console.log("Employer file " , res);
        if(res.status < 400){
          this.offerForm.reset()
          this.hideForm()
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editOffer(offerId: string, offer: Offer) {
    this.appOfferService.editOffer(offerId, offer)
    .subscribe({
      next: (res) => {
        console.log(res);
        if(!this.selectedOfferDoc)return;
        if(!this.oldOffer?.id) return ;
        this.addOfferEmployerFile(this.oldOffer?.id, this.selectedOfferDoc)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setOfferOldData(oldOffer:Offer){
    if(oldOffer?.id){
      this.offerForm.setValue({
        offerDeadline : this.formatDateForInput(new Date(oldOffer.deadlineAt))  ,
        offerDocument: this.appOfferService.getFileName(oldOffer?.documentByCompany as string) ,
      })
    }
  }



  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }




  handleFileInput(e:Event){
    const input = e.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.offerForm.controls.offerDocument.setValue(file.name);
      this.selectedOfferDoc= file ;
  }
}





hideForm(){
  this.hideFromEvent.emit(true)
  this.oldOffer = null ;
}





}
