import { Component, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { RecommendationService } from '../../../shared/services/recommendation.service';
import { JobPostService } from '../../company/job-posts/job-post.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.scss'
})
export class SavedJobsComponent {
  jobPosts : Array<any> = new Array() ;
  jobPostsPage : any;
  recommendationService = inject(RecommendationService)
  recommendCounter: any;

  constructor(private jobPostService : JobPostService,
    private route : ActivatedRoute,
    private router : Router){}

  ngOnInit(): void {
    this.recommendCounter = 1
    this.route.data.subscribe({
      next: (res : any)  => { 
        if(res && res.data && res.data.ok){
          this.jobPostsPage = res.data.body
          console.log(res.data.body)
          this.jobPostsPage = res.data.body
        }else { 
          this.router.navigate(['error/404']);
          console.log(res);
          
        }
      },
      error : err => {
        this.router.navigate(['error/404']);
      }
    });
  }
  
  getNext() {
    this.recommendCounter++
  }

  viewJob(id : any){
    this.router.navigate([`/job-details/${id}`])
  }
  
  toggleJobs(jobPostId : any){
    this.jobPostService.saveJob(jobPostId).subscribe(res=>{
      if(res.ok){
        this.jobPosts.forEach(el => {  
          if(jobPostId == el.id){
            if(el.saved == 1 ) el.saved = 0;
            else el.saved = 1;
          }
        }) 
      }
    });
  }

  
}
