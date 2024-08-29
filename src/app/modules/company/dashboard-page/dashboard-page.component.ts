import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CompanyStatistics } from '../../../shared/models/company/CompanyStatistics';
import { JobPostData } from '../../../shared/models/common/JobPostData';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicPipesSharedModuleModule } from '../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { GetDatePipeModule } from '../../../shared/pipes/public-pipes/get-date-pipe/get-date-pipe.module';
import { TokenService } from '../../../shared/services/token.service';
import { RecruiterStatistics } from '../../../shared/models/company/RecruiterStatistics';
import { recruiterStatisticsResolver } from '../resolvers/recruiter-statistics.resolver';
import { companyRecentJobsResolver } from '../resolvers/company-recent-jobs.resolver';
import { companyStatisticsResolver } from '../resolvers/company-statistics.resolver';
import { CompanyService } from '../company.service';
import { RecommendationService } from '../../../shared/services/recommendation.service';
import { JobSeekerBasicInfomation } from '../../../shared/models/job-seeker/complete-profile/job-seeker-basic-info-model';
import { RecommendedJobSeeker } from '../../../shared/models/job-seeker/recomended-job-seeker';
import { JobPostService } from '../job-posts/job-post.service';
import { JobPostsDashboardNumbers } from '../../../shared/models/job-post/job-posts-dashboard-numbers';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    GetDatePipeModule,
    PublicPipesSharedModuleModule,
    RouterModule,
  ],
})
export class DashboardPageComponent implements OnInit {
  companyStatistics!: CompanyStatistics | null;
  recruiterStatistics!: RecruiterStatistics | null;
  companyJobPosts!: Array<JobPostData>;
  shownCompanyJobPosts!: Array<JobPostData>;
  route = inject(ActivatedRoute);
  router = inject(Router);
  tokenService = inject(TokenService);
  companyService = inject(CompanyService);
  recommendationService = inject(RecommendationService)
  isCompany!: boolean;
  recommendCounter!: number;
  recommendedJobSeekers!: Array<RecommendedJobSeeker>;
  newRecommendedJobSeekers!: Array<RecommendedJobSeeker>;
  role!: any;
  career_levels = ['Junior', 'Senior', 'TechLead', 'Fresh', 'Intern', 'MidSenior', 
    'Director', 'Executive', 'Partner', 'Owner', 'Manager']
  selectedJobId: any;
  jobPostService = inject(JobPostService);
  isJobOpen!: boolean[];
  errorMsg = '';
  successMsg = '';
  jobSeekerLoaded = false;
  @ViewChild('overlay') overlay: any | undefined;
  @ViewChild('posts') posts: any | undefined;
  @ViewChild('closeJobDialog') closeJobDialog: any | undefined;
  @ViewChild('deleteJobDialog') deleteJobDialog: any | undefined;
  @ViewChild('successMessageDialog') successMessageDialog: any | undefined;
  @ViewChild('errorMessageDialog') errorMessageDialog: any | undefined;

  ngOnInit(): void {
    this.checkIsUserRecruiter();
    this.recommendCounter = 1
    console.log(this.isCompany);
    if (this.isCompany) {
      this.role = "ROLE_COMPANY"
      this.companyService.getCompanyStatistics().subscribe({
        next: (res) => {
          console.log(res);
          this.companyStatistics = res.body;
        },
      });
      console.log(this.companyStatistics);
      this.getRecommendedJobSeekers()
    } else {
      this.role = "ROLE_RECRUITER"
      this.companyService.getRecruiterStatistics().subscribe({
        next: (res) => {
          this.recruiterStatistics = res.body;
        },
      });
      console.log(this.recruiterStatistics);
      this.getRecommendedJobSeekers()
    }

    this.companyService.getCompanyJobs().subscribe({
      next: (res) => {
        console.log(res);
        this.companyJobPosts = res.body.content;
        this.companyJobPosts.sort((a, b) => a.updatedOn.localeCompare(b.updatedOn)).reverse()
        if (this.companyJobPosts.length > 4){
          this.shownCompanyJobPosts = this.companyJobPosts.slice(0, 4);          
        }else{
          this.shownCompanyJobPosts = this.companyJobPosts
        }        
        this.isJobOpen = new Array(this.companyJobPosts.length).fill(false);
      },
    });
    
    console.log('job Posts ', this.companyJobPosts);
  }

  checkIsUserRecruiter() {
    this.isCompany = this.tokenService.getUserRoles()!.includes('ROLE_COMPANY');
  }

  openDropDown(array: Array<any>, index: number) {
    array[index] = true;
  }

  closeDropDown(array: Array<any>, index: number) {
    array[index] = false;
  }

  closeJob(id: any) {
    this.selectedJobId = id;
    this.overlay.nativeElement.classList.add('show');
    this.closeJobDialog.nativeElement.classList.add('show');
  }

  deleteJob(id: any) {
    this.selectedJobId = id;
    this.overlay.nativeElement.classList.add('show');
    this.deleteJobDialog.nativeElement.classList.add('show');
  }

  confirmDelete() {
    this.jobPostService.deleteJob(this.selectedJobId).subscribe({
      next: (res) => {
        this.overlay.nativeElement.classList.add('show');
        if (res.ok) {
          this.successMsg = 'Job Deleted Successfully';
          this.closeDialog(this.deleteJobDialog.nativeElement);
          this.successMessageDialog.nativeElement.classList.add('show');
        } else {
          this.errorMsg = 'This Job Deleted Before.';
          this.closeDialog(this.deleteJobDialog.nativeElement);
          this.errorMessageDialog.nativeElement.classList.add('show');
        }
        window.location.reload();
      },
      error: (err) => {
        this.errorMsg = 'Internal Server Error';
        this.closeDialog(this.deleteJobDialog.nativeElement);
        this.errorMessageDialog.nativeElement.classList.add('show');
      },
    });
  }

  confirmClose() {
    this.jobPostService.closeJob(this.selectedJobId).subscribe({
      next: (res) => {
        this.overlay.nativeElement.classList.add('show');
        if (res.ok) {
          this.successMsg = 'Job Closed Successfully';
          this.closeDialog(this.closeJobDialog.nativeElement);
          this.successMessageDialog.nativeElement.classList.add('show');
        } else {
          this.errorMsg = 'There was an error Clossing the job.';
          this.closeDialog(this.closeJobDialog.nativeElement);
          this.errorMessageDialog.nativeElement.classList.add('show');
        }
        window.location.reload();
      },
      error: (err) => {
        this.closeDialog(this.closeJobDialog.nativeElement);
        this.errorMsg = 'Internal Server Error';
        this.errorMessageDialog.nativeElement.classList.add('show');
      },
    });
  }

  closeDialog(el: any) {
    el.classList.remove('show');
    this.overlay.nativeElement.classList.remove('show');
  }

  getRecommendedJobSeekers() {
    this.recommendationService.getRecommendedJobSeekers(this.role, this.recommendCounter, 6)
    .subscribe({
      next: (res) => {
        this.newRecommendedJobSeekers = res
        if(this.recommendedJobSeekers == undefined){
          this.recommendedJobSeekers = new Array<RecommendedJobSeeker>
        }
        for (let ele of res )
          this.recommendedJobSeekers.push(ele)
        console.log(res);
        this.jobSeekerLoaded = true;
      }
    })
  }

  getNextPage(){
    this.recommendCounter++
    this.getRecommendedJobSeekers()
  }

}
