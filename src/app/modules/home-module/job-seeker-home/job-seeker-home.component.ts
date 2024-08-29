import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from '../../../shared/services/user-data.service';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-job-seeker-home',
  templateUrl: './job-seeker-home.component.html',
  styleUrl: './job-seeker-home.component.scss',
})
export class JobSeekerHomeComponent {
  icon = faEye;
  userService = inject(UserDataService)
  tokenService = inject(TokenService)
  router = inject(Router)
  // form
  searchControl = new FormControl(); 

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search(this.searchControl.value);
    }
  }
  
  search(keyword: any = undefined){
    const value = keyword ?? this.searchControl.value;
      this.router.navigate(['/search/jobs'], {
        queryParams: { keyword: value }
      });  
  }

  ngOnInit() {
    console.log(this.userService.getAccessToken());
    if(this.userService.getAccessToken() != '' && !this.tokenService.isTokenExpired()){
      if(this.tokenService.getUserRoles()?.includes('ROLE_JOBSEEKER')) {
        this.router.navigate(['/job-seeker/jobs/explore'])
      }else {
        this.router.navigate(['/company/dashboard-page'])
      }
    }
  }

}
