import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';
import { catchError, map } from 'rxjs';
import { TokenService } from '../../../shared/services/token.service';
import { JobPostService } from '../../company/job-posts/job-post.service';

@Component({
  selector: 'app-initial-search-page',
  templateUrl: './initial-search-page.component.html',
  styleUrl: './initial-search-page.component.scss'
})
export class InitialSearchPageComponent implements OnInit {

  keyword !: string;
  isLoading = true;
  searchPage: any;
  isLogin : any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private jobPostService : JobPostService,
    private tokenService : TokenService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.isLogin = this.tokenService.isLoggedIn();
    // get data form resolver
    this.route.data.subscribe((res: any) => {
      this.searchPage = res.searchData.body;
      this.isLoading = false;
    });
    // intilize keyword
    this.route.queryParams.subscribe(prams => {
      this.keyword = prams['keyword'];
    });
    // if keyword Changed keyword change 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.keyword = this.router.routerState.snapshot.root.queryParams['keyword'];
        this.search(this.keyword);
      }
    });
  }

  // search 
  search(keyword: any) {
    this.isLoading = true;
    this.searchService.search(keyword).pipe(
      map((res: any) => {
        if (res) {
          setTimeout(() => {
            this.isLoading = false;
          }, 900);
          this.searchPage = res.body;
        }
      }),
      catchError(err => {
        console.error(err);
        this.isLoading = true;
        return err;
      })
    ).subscribe();
  }

  navigateToJobs() {
    this.router.navigate(['/search/jobs'], { queryParams: { keyword: this.getKeyword() } }); 
  }

  navigateToCompanies() {
    this.router.navigate(['/search/company'], { queryParams: { keyword: this.getKeyword() } });  
  }

  navigateToPeople() {
    this.router.navigate(['search/people'], { queryParams: { keyword: this.getKeyword() } }); 
  }

  getKeyword() {
    return this.route.snapshot.queryParams['keyword'] || '';  
  }

  viewDetails(id: any) {
    this.router.navigate([`job-details/${id}`]);
  }


  saveJobs(jobPostId: any){
    if(this.tokenService.isLoggedIn()){
      this.jobPostService.saveJob(jobPostId).subscribe(res=>{
        if(res.ok){
          this.searchPage.jobPosts.content.forEach((el:any) => {  
            if(jobPostId == el.id){
              el.saved = !el.saved;
            }
          }) 
        }
      });
    }else {
      this.router.navigate([`/auth/login/job-seeker`]);
    }
  }

  viewProfile(userId : any){
    if(this.tokenService.isLoggedIn()){
      this.router.navigate([`/job-seeker/profile/${userId}`])
    }else {
      this.router.navigate([`/auth/login/job-seeker`]);
    }
  }

  viewCompanyProfile(userId : any){
    if(this.tokenService.isLoggedIn()){
      this.router.navigate([`/company/profile/${userId}`])
    }else {
      this.router.navigate([`/auth/login/job-seeker`]);
    }
  }

}
