import { ActivatedRoute } from '@angular/router';
import { JobPostData } from '../../../../shared/models/common/JobPostData';
import { JobPostService } from './../job-post.service';
import { Component, OnInit, inject } from '@angular/core';
import { JobPostDataForAnyUser } from '../../../../shared/models/common/JobPostDataForAnyUser';
import { TokenService } from '../../../../shared/services/token.service';
import { GeneralAppService } from '../../../appt-page/services/general-app.service';
import { Role } from '../../../../shared/models/auth/Role';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  jobPostService = inject(JobPostService);
  jobPostData !: JobPostDataForAnyUser;
  route = inject(ActivatedRoute);
  tokenService = inject(TokenService)
  generalAppService = inject(GeneralAppService)


  userRole!: string[]|null;
  today!: Date;
  postId!: string;
  isApplied!: boolean;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') as string;
    this.getJobPostInfo();
    this.today = new Date();
    this.userRole = this.tokenService.getUserRoles()
    if(this.userRole?.includes('ROLE_JOBSEEKER')){
      this.isJobSeekerAppliedToJobPost()
    }
    console.log(this.userRole);    
  }

  getJobPostInfo() {
    // const id = 'dc97c554-1dcc-4554-b823-bdaf8002c821';
    // const id = '9a004517-e273-4875-960f-a01c3f7b4110';
    this.jobPostService.getJobPostInfoForAnyUser(this.postId).subscribe({
      next: (res) => {
        console.log(res);        
        this.jobPostData = res.body;
        console.log(this.jobPostData);
      },
      error: (err) => {
        console.error(`Error in getting job init info ${err}`);
      },
    });
  }

  isJobSeekerAppliedToJobPost() {    
    this.generalAppService.isJobSeekerAppliedToJobPost(this.postId).subscribe({
      next: (res) => {
        this.isApplied = res.body
      },
      error: (err) => {
        console.error(`Error in getting job init info ${err}`);
      },
    });
  }

  calcDatePeriod(date: string | undefined): string {
    if (!date) return '';
    const today = new Date();
    const targetDate = new Date(date);
    const diffInMs = Math.abs(today.getTime() - targetDate.getTime());
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return (
      'posted ' +
      (diffInDays > 30
        ? `${Math.floor(diffInDays / 30)} months`
        : `${diffInDays} days`) +
      ' ago'
    );
  }

  toggleJobs(jobPostId : any){
    this.jobPostService.saveJob(jobPostId).subscribe(res => {
      if (res.ok) {
         if(this.jobPostData.saved){
          this.jobPostData.saved = false;
         }else {
          this.jobPostData.saved = true;
         }
      }
    });
  }
}
