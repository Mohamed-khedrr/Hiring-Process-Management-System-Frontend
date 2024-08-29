import { AppComment } from './../../shared/models/app/appComment';
import { Offer } from './../../shared/models/app/offer';
import { Assessment } from './../../shared/models/app/assessment';
import { ApplicationStatus } from './../../shared/models/app/ApplicationStatus';
import { PublicPipesSharedModuleModule } from './../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { GeneralAppService } from './services/general-app.service';
import { JobApplication } from '../../shared/models/app/job-application';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { JobSeekerModule } from '../job-seeker/job-seeker.module';
import { JobSeekerProfileComponent } from '../job-seeker/job-seeker-profile/job-seeker-profile.component';
import { AllJobseekerProfileInfo } from '../../shared/models/job-seeker/all-jobseeker-profile-info';
import { ApiResponse } from '../../shared/models/Api-response';
import { EducationData } from '../../shared/models/job-seeker/complete-profile/education-data';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AssessmentsFormComponent } from './components/assessments-form/assessments-form.component';
import { InterviewComponent } from './components/interview/interview.component';
import { InterviewFormComponent } from './components/interview-form/interview-form.component';
import { Interview } from '../../shared/models/app/interview';
import { OfferComponent } from './components/offer/offer.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OfferForms } from '../../shared/models/app/offer-forms.enum';
import { OfferComment } from '../../shared/models/app/offerComment';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { FormCommentType } from '../../shared/models/app/form-comment-type.enum';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AppCommentType } from '../../shared/models/app/AppCommentType';
import { ProfileComponent } from './components/profile/profile.component';
import { JobPostData } from '../../shared/models/common/JobPostData';
import { JobPostService } from '../company/job-posts/job-post.service';

enum ApplicationPages {
  PROFILE,
  TIME_LINE,
  COMMENTS,
  ASSESSMENTS,
  INTERVIEWS,
  OFFER,
}

@Component({
  selector: 'app-appt-page',
  templateUrl: './appt-page.component.html',
  styleUrl: './appt-page.component.scss',
  standalone: true,
  imports: [
    PublicPipesSharedModuleModule,
    RouterModule,
    CarouselModule,
    CommonModule,
    JobSeekerModule,
    AssessmentsComponent,
    AssessmentsFormComponent,
    InterviewComponent,
    InterviewFormComponent,
    OfferComponent,
    OfferFormComponent,
    CommentFormComponent,
    ProfileComponent,
    TimelineComponent,
    CommentsComponent
  ],
})
export class ApptPageComponent {

  @ViewChild("moveDropDownList") moveDropDownList !:ElementRef ;
  @ViewChild("applicantDialog") applicantDialog !:ElementRef ;
  generalAppsService = inject(GeneralAppService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  elRef = inject(ElementRef);
  jobPostService = inject(JobPostService)
  isLoading = true; 
  ApplicationStatus = ApplicationStatus;
  ApplicationPages = ApplicationPages;
  OfferForms = OfferForms ;
  FormCommentType = FormCommentType ;
  AppCommentType = AppCommentType

  appId: any;
  jobId: any;
  applicantId: string = '';
  applicantProfile: AllJobseekerProfileInfo | null = null;
  isDropDownVisible = false;
  jobApplicationsArray!: JobApplication[] ;
  displayedJobApplication  : JobApplication[] = [] ;
  jobData!: JobPostData
  currentPage: ApplicationPages | null = this.ApplicationPages.PROFILE;
  assessmentToEdit !:Assessment ;
  interviewToEdit !:Interview ;
  appCommentToEdit!:AppComment ;
  // offerToEdit !: Offer ;
  offerDataToEdit: { data: Offer | OfferComment | null; formType: OfferForms ; offerId ?:string } = { data: null, formType: OfferForms.OFFER, offerId:'' };
  sideFromContainerVisible = false ;
  offerCommentToEdit !: OfferComment ;
  isFormDestroyed = false
  showCandidateCard = true;
  showSmallLeftScrollbar =  true;
  
  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('postId');
    this.appId = this.route.snapshot.paramMap.get('appId');
    this.getJobInfoForApp()
    this.getAppsForJob();
  }


  subscribeActivatedRoute(){
    this.route.params.subscribe((params) => {
      this.appId = params['appId'];
    })
  }

  searchForApplicantId(arr: any) {
    const routeApplicationId = this.appId
    if (!routeApplicationId) return;

    this.applicantId = arr.find(
      (app: any) => app.id == routeApplicationId
    ).applicantId;
    this.setApplicationId(routeApplicationId, this.applicantId);
  }

  getAppsForJob() {
    this.generalAppsService.getApplicationsOfJob(this.jobId).subscribe({
      next: (res: ApiResponse<any>) => {
        console.log(res);        
        this.jobApplicationsArray = res.body;
        this.displayedJobApplication = res.body;
        if (res.body?.length) {
          this.searchForApplicantId(this.jobApplicationsArray);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getApplicantProfile() {
    this.generalAppsService.getApplicantProfile(this.appId).subscribe({
      next: (res) => {
        this.applicantProfile = res.body.jobSeekerInfo;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getJobInfoForApp() {
    this.jobPostService.getJobPostInfoForApp(this.jobId).subscribe({
      next: (res) => {
        this.jobData = res.body;
        this.isLoading = false;
        console.log(res);        
        console.log(this.jobData);        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  moveApplicationTo(applicationStatus: ApplicationStatus) {
    this.generalAppsService
      .moveApplication(this.appId, applicationStatus)
      .subscribe({
        next: (res) => {
          console.log('Moved Success To ', applicationStatus);
          this.closeDropDown() ;
          this.getJobInfoForApp()
          this.getAppsForJob()
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  setApplicationId(appId: string, applicantId: string) {
    this.showSmallLeftScrollbar = false;
    this.appId = appId;
    this.applicantId = applicantId;
    this.applicantProfile = null;
    this.getApplicantProfile();
  }

  makeShowSmallLeftScrollbarTrue() {
    this.showSmallLeftScrollbar = true;
  }

  toggleDropDownVisibilty() {
    this.isDropDownVisible = !this.isDropDownVisible;
  }

  closeDropDown() {
    this.isDropDownVisible = false;
  }

  getDate(date: any) {
    if (!date) return;
    return new Date(date);
  }

  displayApplicationPage(page: ApplicationPages) {
    this.currentPage = page;
  }

  setAssessmentToEdit(e : any){
    this.currentPage = this.ApplicationPages.ASSESSMENTS
    this.assessmentToEdit = e as Assessment ;
    this.isFormDestroyed = false ;
    this.sideFromContainerVisible = true ;
  }
  setInterviewToEdit(e : any){
    this.currentPage = this.ApplicationPages.INTERVIEWS
    this.interviewToEdit = e as Interview ;
    this.isFormDestroyed = false ;
    this.sideFromContainerVisible = true ;
  }
  setCommentToEdit(e : any){
    this.currentPage = this.ApplicationPages.COMMENTS
    this.appCommentToEdit = e as AppComment ;
    this.isFormDestroyed = false ;
    this.sideFromContainerVisible = true ;
  }

  setOfferToEdit(e : any){
    this.currentPage = this.ApplicationPages.OFFER
    // if(!e.offerId)return ;
    this.offerDataToEdit = e  ;
    this.isFormDestroyed = false ;
    this.sideFromContainerVisible = true ;
  }

  closeSideFromContainer(){
    this.sideFromContainerVisible = false ;
    setTimeout(() => {
      this.isFormDestroyed = true ;
    }, 100);
  }

  // @HostListener('document:click', ['$event'])
  // handleClickOutside(event: Event) {
  //   if (this.moveDropDownList) { 
  //     const clickedInside = this.moveDropDownList.nativeElement.contains(event.target);
  //     if (!clickedInside) {
  //       this.closeDropDown();
  //     }
  //   }  
  // }

  showMoveToSmallList() {
    
    this.toggleDropDownVisibilty()
  }

  showDialog(icon : any){ 
    this.applicantDialog.nativeElement.classList.toggle("show");
    icon.classList.toggle("reverse");
  }

  changeStatus(event: any): void {
    const buttons = document.querySelectorAll('.containing-job-type button');
    buttons.forEach(button => button.classList.remove('active')); 
    if (event.target.tagName === 'BUTTON') {
      event.target.classList.add('active');
      const statusType = event.target.getAttribute('data-type');
      this.displayedJobApplication =  this.jobApplicationsArray?.filter(el => el.status == statusType);
    }
  }

  changeStatusForSelect(event: any): void {
    console.log(event);    
    const statusType = event.target.value;
    this.showSmallLeftScrollbar = true
    if(statusType === 'APPLIED') {
      this.getAppsForJob()
      return
    }
    this.displayedJobApplication =  this.jobApplicationsArray?.filter(el => el.status == statusType);
  }


}


