import { CommonModule } from '@angular/common';
import { UserRoles } from '../../shared/enum/user-roles.enum';
import { TokenService } from '../../shared/services/token.service';
import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CompanyNavComponent } from '../company/company-nav/company-nav.component';
import { CompanySidebarComponent } from '../company/company-sidebar/company-sidebar.component';
import { NavbarComponent } from '../../shared/layout/standalone-components/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CompanyNavComponent,
    CompanySidebarComponent,
    NavbarComponent,
  ],
})
export class MainAppComponent implements OnInit {
  tokenService = inject(TokenService);
  router = inject(Router);

  isSideVisible: boolean = false;
  recruiterCompanyId: string = '';

  isJobSeeker: boolean = false;
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.displayHeader;
    this.subscribeRoute();
  }

  subscribeRoute() {
    this.router.events.subscribe((event) => {
      event = event as NavigationEnd;
      this.displayHeader();
    });
  }

  displayHeader() {
    this.isLoggedIn = Boolean(this.tokenService._getToken());
    this.isJobSeeker =
      this.tokenService
        .getUserRoles()
        ?.includes(UserRoles[UserRoles.ROLE_JOBSEEKER]) || false;
  }

  closeSideBar() {
    this.isSideVisible = false;
  }
  openSideBar() {
    this.isSideVisible = true;
  }

  changeRecruiterCompanyId(companyId: any) {
    this.recruiterCompanyId = companyId;
  }
}
