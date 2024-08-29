import { Component, inject } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data.service';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrl: './employer-home.component.scss',
})
export class EmployerHomeComponent {

  userService = inject(UserDataService)
  tokenService = inject(TokenService)
  router = inject(Router)

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
