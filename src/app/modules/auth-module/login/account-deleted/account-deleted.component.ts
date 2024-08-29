import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../../../shared/services/settings.service';

@Component({
  selector: 'app-account-deleted',
  templateUrl: './account-deleted.component.html',
  styleUrl: './account-deleted.component.scss'
})
export class AccountDeletedComponent {

  settingsService = inject(SettingsService);
  router = inject(Router)
  route = inject(ActivatedRoute)

  heading: string = 'Account Deleted!';
  message1: string = 'You deleted your account,';
  message2: string = 'either undelete it,';
  message3: string = "or Log out.";
  imgSrc: string = '';
  role:string = ''

  ngOnInit(): void {
    this.imgSrc = 'assets/imgs/Deleted account.png';
    this.route.queryParams.subscribe((params) => {
      this.role = params['role']
      console.log(this.role)
    });
    
  }

  undeleteAccount(){
    this.settingsService
    .undeleteAccount()
    .subscribe({
      next: (res) => {
        console.log(res.message)
        this.router.navigate(["/job-seeker/jobs/saved"])
      },
      error: (err) => {
        this.router.navigate(['error', '500'])
      }
    })
  }

  logout(){
    this.settingsService
    .signOut()
  }

}
