import { Component, inject } from '@angular/core';
import { RecommendationService } from '../../../shared/services/recommendation.service';
import { JobPostService } from '../../company/job-posts/job-post.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss'
})
export class ExplorePageComponent {

  jobPosts : Array<any> = new Array() ;
  jobPostsPage : any;
  recommendationService = inject(RecommendationService);
  recommendCounter!: number;

  constructor(private jobPostService : JobPostService){}

  ngOnInit(): void {
    this.recommendCounter = 1
    this.getRecommendedJobPosts()
  }
  
  getRecommendedJobPosts() {
    this.recommendationService.getRecommendedJobPosts(this.recommendCounter, 5)
    .subscribe({
      next: (res) => {
        this.jobPostsPage = res
        console.log(res)
        for (let job of res)
          this.jobPosts.push(job)
      }
    })
  }

  getNext() {
    this.recommendCounter++
    this.getRecommendedJobPosts()
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
