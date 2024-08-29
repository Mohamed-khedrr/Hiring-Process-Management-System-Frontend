import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  inject,
} from '@angular/core';
import { CompanyStatistics } from '../../../../shared/models/company/CompanyStatistics';
import { JobPostData } from '../../../../shared/models/common/JobPostData';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from '../job-post.service';
import { JobSettingRequest } from '../../../../shared/models/company/JobSettingRequest';
import { Question } from '../../../../shared/models/company/Question';
import { RecruiterStatistics } from '../../../../shared/models/company/RecruiterStatistics';
import { recruiterStatisticsResolver } from '../../resolvers/recruiter-statistics.resolver';
import { companyRecentJobsResolver } from '../../resolvers/company-recent-jobs.resolver';
import { companyStatisticsResolver } from '../../resolvers/company-statistics.resolver';
import { CompanyService } from '../../company.service';
import { TokenService } from '../../../../shared/services/token.service';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrl: './job-posts.component.scss',
})
export class JobPostsComponent implements OnInit {
  @ViewChild('overlay') overlay: any | undefined;
  @ViewChild('posts') posts: any | undefined;
  @ViewChild('closeJobDialog') closeJobDialog: any | undefined;
  @ViewChild('deleteJobDialog') deleteJobDialog: any | undefined;
  @ViewChild('publishJobDialog') publishJobDialog: any | undefined;
  @ViewChild('successMessageDialog') successMessageDialog: any | undefined;
  @ViewChild('errorMessageDialog') errorMessageDialog: any | undefined;

  router = inject(Router);
  selectedJobId: any;
  companyStatistics!: CompanyStatistics | null;
  recruiterStatistics!: RecruiterStatistics;
  companyJobPosts!: Array<JobPostData>;
  jobToPublish: any;
  isJobOpen!: boolean[];
  errorMsg = '';
  successMsg = '';
  route = inject(ActivatedRoute);
  jobPostService = inject(JobPostService);
  companyService = inject(CompanyService);
  tokenService = inject(TokenService);
  isCompany!: boolean;

  constructor() {}
  ngOnInit(): void {
    console.log('Hi');
    this.checkIsUserRecruiter();
    if (this.isCompany) {
      this.companyService.getCompanyStatistics().subscribe({
        next: (res) => {
          this.companyStatistics = res.body;
        },
      });
      console.log(this.companyStatistics);
    } else {
      this.companyService.getRecruiterStatistics().subscribe({
        next: (res) => {
          this.recruiterStatistics = res.body;
        },
      });
      console.log(this.recruiterStatistics);
    }
    this.companyService.getCompanyJobs().subscribe({
      next: (res) => {
        console.log(res);
        this.companyJobPosts = res.body.content;
        this.companyJobPosts = this.companyJobPosts.filter(
          (post) => post.open && !post.deleted
        );
        this.isJobOpen = new Array(this.companyJobPosts.length).fill(false);
      },
    });
  }

  checkIsUserRecruiter() {
    this.isCompany = this.tokenService.getUserRoles()!.includes('ROLE_COMPANY');
  }

  confirmPublishDraft() {
    const jobSetting: JobSettingRequest = {
      jobPostId: this.jobToPublish.id as string,
      publish: true,
      questionDtos: this.jobToPublish.questions as Array<Question>,
      maxApplication: this.jobToPublish.maxApplication,
      gender: this.jobToPublish.gender as string,
      educationLevel: this.jobToPublish.educationLevel as string,
      selectedTeamMembers: this.jobToPublish.recruitersTeam as Array<any>,
    };
    this.jobPostService.publishOrSaveJob(jobSetting).subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  publishDraft(post: JobPostData) {
    this.jobToPublish = post;
    this.overlay.nativeElement.classList.add('show');
    this.publishJobDialog.nativeElement.classList.add('show');
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
}
