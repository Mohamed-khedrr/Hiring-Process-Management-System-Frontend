import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteFormComponent } from './recruiter-management/invite-form/invite-form.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component'; 
import { CompanyProfileLoaderComponent } from '../../loaders/company-profile-loader-page/company-profile-loader.component';
import { HiringTeamComponent } from '../hiring-team/hiring-team.component';
import { JobPostFirstStageComponent } from './job-posts/job-post-first-stage/job-post-first-stage.component';
import { JobPostSecondStageComponent } from './job-posts/job-post-second-stage/job-post-second-stage.component';
import { JobPostsComponent } from './job-posts/job-posts/job-posts.component';
import { CompanySettingsComponent } from './settings/company-settings/company-settings.component';
import { RecruiterSettingsComponent } from './settings/recruiter-settings/recruiter-settings.component';
import { PublicJobPostComponent } from './job-posts/public-job-post/public-job-post.component';
import { publicJobPostsResolver } from './resolvers/public-job-posts.resolver';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

// Child Routes For companyApp
const routes: Routes = [
  {
    path: 'profile/loader',
    component: CompanyProfileLoaderComponent,
  },
  {
    path: 'hiring-team',
    component: HiringTeamComponent,
  },
  /*
  // Just For Testing
  {
    path: 'dashboard-page/test',
    component: DashboardPageComponent,
  },
*/
  // Original One
  {
    path: 'dashboard-page',
    component: DashboardPageComponent,
  },

  {
    path: 'recruiter/invite',
    component: InviteFormComponent,
  },
  {
    path: 'profile',
    component: CompanyProfileComponent,
  },
  {
    path: 'profile/:id',
    component: CompanyProfileComponent,
  },
  {
    path: 'job-posts',
    component: JobPostsComponent,
  },
  {
    path: 'job-posts/add',
    component: JobPostFirstStageComponent,
  },
  {
    path: 'job-posts/edit/:id',
    component: JobPostFirstStageComponent,
  },
  {
    path: 'job-posts/setting/:id',
    component: JobPostSecondStageComponent,
  },
  {
    path: 'company-settings',
    component: CompanySettingsComponent,
  },
  {
    path: 'recruiter-settings',
    component: RecruiterSettingsComponent,
  },

  {
    path: ':id/job-posts',
    component: PublicJobPostComponent,
    resolve: { data: publicJobPostsResolver },
  },
];

// main routes
// const routes: Routes = [
//   {
//     path: '',
//     component: CompanyAppComponent,
//     children: companyChildRoutes,
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
