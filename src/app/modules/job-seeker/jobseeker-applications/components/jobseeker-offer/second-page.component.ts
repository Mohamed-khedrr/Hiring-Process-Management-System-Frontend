import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppEvaluationService } from '../../../../appt-page/services/app-evaluation.service';
import { Offer } from '../../../../../shared/models/app/offer';
import { AppOfferService } from '../../../../appt-page/services/app-offer.service';
import { OfferStatus } from '../../../../../shared/models/app/OfferStatus';
import { OfferComment } from '../../../../../shared/models/app/offerComment';
import { OfferResponse } from '../../../../../shared/models/app/offerResponse';
import { ParentChildService } from '../../services/parent-child.service';
import { Role } from '../../../../../shared/models/auth/Role';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.scss'
})
export class SecondPageComponent {

  route = inject(ActivatedRoute)
  router = inject(Router)
  appOfferService = inject(AppOfferService);
  applicationId: any;
  offer!: OfferResponse
  dateTime = new Date()
  offerStatus = OfferStatus
  roleEnum = Role
  parentChildService = inject(ParentChildService)
  

  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id'];
    this.getOfferForApplication()
    
  }

  getOfferForApplication() {
    this.appOfferService.getOfferForApplication(this.applicationId)
    .subscribe({
      next: (res) => {
        this.offer = res.body
        let offerComments = this.offer.comments.sort((a,b)=>{
          return new Date(b.createdAt).getTime() -  new Date(a.createdAt).getTime()
        })
        console.log(res);        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isDropDownVisible = false;
  toggleDropDownVisibilty() {
    this.isDropDownVisible = !this.isDropDownVisible;
    console.log(this.isDropDownVisible);
  }
  closeDropDown() {
    this.isDropDownVisible = false;
  }

  getDateTimeAndDay(dateTimeString: string) {
    let dateTime = new Date(dateTimeString)
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return  days[dateTime.getDay()] + ', ' + dateTime.toLocaleString();  
  }

  editOfferStatus(offerStatus: OfferStatus) {
    this.appOfferService.changeOfferStatus(this.offer.id, offerStatus)
    .subscribe({
      next: (res) => {
        console.log(res);   
        this.toggleDropDownVisibilty()
        this.router.navigate(['/job-seeker/job-applications/offer/'+this.applicationId])   
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  OpenRequestUpdate() {
    this.editOfferStatus(this.offerStatus.UpdateRequested)
    this.showAddCommentFromParent()
  }

  

  showAddCommentFromParent() {
   this.parentChildService.changeShowAddCommentProperty(true) 
  }

  showAddDocumentFromParent() {
    this.parentChildService.changeShowAddDocProperty(true)
  }

  sendOfferIdToParent() {
    this.parentChildService.changeOfferId(this.offer.id)
  }

}
