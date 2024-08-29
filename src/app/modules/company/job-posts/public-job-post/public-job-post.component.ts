import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-public-job-post',
  templateUrl: './public-job-post.component.html',
  styleUrl: './public-job-post.component.scss'
})
export class PublicJobPostComponent implements OnInit {

  jobPosts : Array<any> = new Array() ;
  jobPostsPage : any;

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (res : any)  => { 
        if(res && res.data && res.data.ok){
          console.log(res.data.body)
          this.jobPostsPage = res.data.body
        }else { 
          this.router.navigate(['error/404']);
        }
      },
      error : err => {
        this.router.navigate(['error/404']);
      }
    });
  } 

  constructor(private compnayService : CompanyService,
              private route : ActivatedRoute,
              private router : Router){}

}
