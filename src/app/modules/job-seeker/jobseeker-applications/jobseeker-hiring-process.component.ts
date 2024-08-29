import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { GeneralAppService } from '../../appt-page/services/general-app.service';
import { JobPostForApplication } from '../../../shared/models/app/JobPostForApplication';
import { PublicPipesSharedModuleModule } from '../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { CommonModule } from '@angular/common';
import { GetDatePipeModule } from '../../../shared/pipes/public-pipes/get-date-pipe/get-date-pipe.module';
import { PublicDirectivesModule } from '../../../shared/directives/public-directives.module';
import { BrowserModule } from '@angular/platform-browser';
import { InterviewStatus } from '../../../shared/models/app/InterviewStatus';
import { TechnicalType } from '../../../shared/models/app/TechnicalType';
import { AppEvaluationService } from '../../appt-page/services/app-evaluation.service';
import { Interview } from '../../../shared/models/app/interview';
import { ParentChildService } from './services/parent-child.service';
import { OfferComment } from '../../../shared/models/app/offerComment';
import { AppOfferService } from '../../appt-page/services/app-offer.service';
import { FormsModule } from '@angular/forms';
import { OfferStatus } from '../../../shared/models/app/OfferStatus';

@Component({
  selector: 'app-jobseeker-hiring-process',
  templateUrl: './jobseeker-hiring-process.component.html',
  styleUrl: './jobseeker-hiring-process.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    GetDatePipeModule,
    PublicPipesSharedModuleModule,
    RouterModule,
    PublicDirectivesModule,
    FormsModule,
  ],
})
export class JobseekerHiringProcessComponent {

  isDropDownVisible = false;
  route = inject(ActivatedRoute)
  router = inject (Router)
  appService = inject(GeneralAppService)
  userId!: string;
  appsJobs!: Array<JobPostForApplication>
  postInfoWithNumbers!: JobPostForApplication
  showInfo!: boolean;
  showApps: boolean = true;
  selectedButton: string = "questions";
  showRouterOutlet: boolean = true;
  applicationId!: string;
  appEvaluationService = inject(AppEvaluationService);
  appOfferService = inject(AppOfferService)
  commentContent: string = '';
  signedFile!: any;
  showAddOfferComment = false;
  showAddOfferSignedDoc = false;
  offerId!: string;
  parentChildService = inject(ParentChildService)
  @ViewChild(RouterOutlet) outlet!: any;


  onLoadOutlet() {
    // Access the activated component
    if (this.outlet && this.outlet.isActivated) {
      const childComponent = this.outlet.component;
      console.log(childComponent.applicationId);      
      this.applicationId = childComponent.applicationId
      console.log(childComponent);     
      if(childComponent.offer) {
        this.offerId = childComponent.offer.id
      }
    }
  }

  

  ngOnInit(){
    // this.applicationId = 'c3ee34c8-9cd4-41d0-bb5e-e74a9fc87c60'
    // this.addInterviewToApplication(this.exampleInterview)
    this.getJobSeekerJobsForApplications()
    this.parentChildService.showAddCommentProperty.subscribe(property => {
      this.showAddOfferComment = property;
    });

    this.parentChildService.showAddDocProperty.subscribe(property => {
      this.showAddOfferSignedDoc = property;
    });

    // this.parentChildService.offerIdProperty.subscribe(property => {
    //   this.offerId = property;
    // });
  }

  getJobSeekerJobsForApplications() {
    this.appService.getJobSeekerJobsForApplications()
    .subscribe({
      next: (res) => {
        this.appsJobs = res.body
        this.appsJobs = this.appsJobs.sort((a, b) => {
          return new Date(b.appUpdatedAt).getTime() - new Date(a.appUpdatedAt).getTime()
        })
        console.log(this.appsJobs)
        // this.fillNumbersAndQuestions(0)
      }
    })
  }

  toggleDropDownVisibilty() {
    this.isDropDownVisible = !this.isDropDownVisible;
    console.log(this.isDropDownVisible);
  }
  closeDropDown() {
    this.isDropDownVisible = false;
  }

  fillNumbersAndQuestions(index: number) {
    if(!this.showInfo){
      this.showInfo = true;
    }
    this.postInfoWithNumbers = this.appsJobs[index]
    this.showApps = false
    this.selectedButton = 'questions'
    this.showRouterOutlet = false
    this.router.navigate(['questions/'+this.postInfoWithNumbers.applicationId], {relativeTo: this.route, onSameUrlNavigation:"reload"})
    setTimeout(()=> {
      this.showRouterOutlet = true
    }, 200)
  }

  changeSelectedButton(selected: string) {
    this.selectedButton = selected
    this.onLoadOutlet()
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.onLoadOutlet()    
      }
    });
    
    if(selected === "assessments") {
      this.markAssesmentsViewed()
    }else if (selected === "interviews") {
      this.markInterviewsViewed()
    }else if (selected === "offer") {
      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
          const childComponent = this.outlet.component;   
          console.log(childComponent, childComponent.offer);          
          this.offerId = childComponent.offer.id
        }
      });
      this.markOfferAndItsCommentsViewed()
    }

  }


  hideInfo() {
    this.showInfo = false;
    this.showApps = true;
  }

  markAssesmentsViewed() {
    this.appService.markAssesmentsViewed(this.applicationId)
    .subscribe({
      next: (res) => {
        console.log(res);        
      },
      error: (err) => {
        console.log(err);        
      }
    })
  }

  markInterviewsViewed(){
    this.appService.markInterviewsViewed(this.applicationId)
    .subscribe({
      next: (res) => {
        console.log(res);        
      },
      error: (err) => {
        console.log(err);        
      }
    })
  }

  markOfferAndItsCommentsViewed() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        const childComponent = this.outlet.component;   
        this.offerId = childComponent.offer.id
      }
    });
    console.log(this.offerId);    
    this.appService.markOfferAndItsCommentsViewed(this.applicationId)
    .subscribe({
      next: (res) => {
        console.log(res);        
      },
      error: (err) => {
        console.log(err);        
      }
    })
  }

  
  addOfferComment() {
    this.onLoadOutlet()
    console.log(this.offerId);    
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        const childComponent = this.outlet.component;   
        this.offerId = childComponent.offer.id
      }
    });
    const offerComment: OfferComment = {
      offerId: this.offerId,
      content: this.commentContent
    }
    console.log(offerComment);    
    this.appOfferService.addOfferComment(offerComment)
    .subscribe({
      next: (res) => {
        console.log(res); 
        this.showAddOfferComment = false    
        this.toggleDropDownVisibilty()
        this.showRouterOutlet = false
        setTimeout(()=> {
          this.showRouterOutlet = true
        }, 50)
        
        // this.router.navigate(['/job-seeker/job-applications/offer/'+this.applicationId])   
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editOfferStatus(offerStatus: OfferStatus) {
    this.appOfferService.changeOfferStatus(this.offerId, offerStatus)
    .subscribe({
      next: (res) => {
        console.log(res);   
        this.showRouterOutlet = false
        setTimeout(()=> {
          this.showRouterOutlet = true
        }, 50)
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addFileToSubmit(e: any) {
    this.signedFile =  <File>e.target.files[0];
  }

  addOfferSignedFile() {
    this.onLoadOutlet()    
    const formData = new FormData()
    formData.append('file', this.signedFile, this.signedFile.name);
    this.appOfferService.addOfferSignedFile(formData, this.offerId)
    .subscribe({
      next: (res) => {
        console.log(res);     
        this.showAddOfferSignedDoc = false  
        this.editOfferStatus(OfferStatus.Accepted) 
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeAddComment() {
    this.showAddOfferComment = false;
  }

  closeAddDoc() {
    this.showAddOfferSignedDoc = false;
  }

  // exampleInterview: Interview = {
  //   title: 'Design Interview',
  //   link: 'http://example.com/interview',
  //   technicalType: TechnicalType.Technical,
  //   result: '',
  //   applicationId: '074bdd73-1ffb-423c-bdf9-4b6416cbee72', // Example UUID
  //   startTime: '2023-06-15T14:00:00Z', // ISO 8601 date string
  //   endTime: '2023-06-15T15:00:00Z', // ISO 8601 date string
  //   status: InterviewStatus.Delivered
  // };

  // addInterviewToApplication(interview : Interview) {
  //   this.appEvaluationService.addInterview(interview)
  //   .subscribe({
  //     next: (res) => {
  //       console.log("Added Success",res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

}
