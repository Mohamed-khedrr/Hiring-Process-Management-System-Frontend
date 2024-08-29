import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerLoaderComponent } from './modules/job-seeker/job-seeker-loader/job-seeker-loader.component';
import { SingleSelectionSquaresComponent } from './shared/layout/standalone-components/single-selection-squares/single-selection-squares.component';
import { JobPostsComponent } from './modules/company/job-posts/job-posts/job-posts.component';
import { CompanyProfileComponent } from './modules/company/company-profile/company-profile.component';
import { JobDetailsComponent } from './modules/company/job-posts/job-details/job-details.component';
import { JobApplicationComponent } from './modules/job-seeker/job-application/job-application.component';
import { SavedJobsComponent } from './modules/job-seeker/saved-jobs/saved-jobs.component';
import { JobSeekerProfileComponent } from './modules/job-seeker/job-seeker-profile/job-seeker-profile.component';
import { ApptPageComponent } from './modules/appt-page/appt-page.component';
import { ProfileComponent } from './modules/appt-page/components/profile/profile.component';
import { AssessmentsComponent } from './modules/appt-page/components/assessments/assessments.component';
import { CommentsComponent } from './modules/appt-page/components/comments/comments.component';
import { TimelineComponent } from './modules/appt-page/components/timeline/timeline.component';
import { OfferComponent } from './modules/appt-page/components/offer/offer.component';
import { CompanyRoutingModule } from './modules/company/company-routing.module';
import { CompanyModule } from './modules/company/company.module';
import { ThirdStageComponent } from './modules/job-seeker/complete-profile/third-stage/third-stage.component';
import { EmployerHomeComponent } from './modules/home-module/employer-home/employer-home.component';
import { HiringTeamComponent } from './modules/hiring-team/hiring-team.component';
import { JobPostSecondStageComponent } from './modules/company/job-posts/job-post-second-stage/job-post-second-stage.component';
import { HomeAppComponent } from './modules/home-module/home-app/home-app.component';
import { jobPostAdvancedResolver } from './modules/job-seeker/resolvers/job-post-advanced.resolver';
import { InterviewComponent } from './modules/appt-page/components/interview/interview.component';
import { InitialSearchPageComponent } from './modules/search-pages/initial-search-page/initial-search-page.component';
import { JobsFilterSearchPageComponent } from './modules/search-pages/jobs-filter-search-page/jobs-filter-search-page.component';
import { CompaniesFilterSearchPageComponent } from './modules/search-pages/companies-filter-search-page/companies-filter-search-page.component';
import { PeopleFilterSearchPageComponent } from './modules/search-pages/people-filter-search-page/people-filter-search-page.component';
import { CompanyNavComponent } from './modules/company/company-nav/company-nav.component';
import { CompanyHeaderComponent } from './modules/company/company-header/company-header.component';
import { MainAppComponent } from './modules/main-app/main-app.component';
import { jobPostAppFormResolver } from './modules/job-seeker/resolvers/job-post-app-form.resolver';
import { NavbarComponent } from './shared/layout/standalone-components/navbar/navbar.component';
import { JobPostFirstStageComponent } from './modules/company/job-posts/job-post-first-stage/job-post-first-stage.component';
import { PublicJobPostComponent } from './modules/company/job-posts/public-job-post/public-job-post.component';
import { JobseekerHiringProcessComponent } from './modules/job-seeker/jobseeker-applications/jobseeker-hiring-process.component';
import { QuestionComponent } from './modules/job-seeker/jobseeker-applications/components/jobseeker-answers/question.component';
import { FirstPageComponent } from './modules/job-seeker/jobseeker-applications/components/jobseeker-interview/first-page.component';
import { SecondPageComponent } from './modules/job-seeker/jobseeker-applications/components/jobseeker-offer/second-page.component';
import { JobseekerAssessmentsComponent } from './modules/job-seeker/jobseeker-applications/components/jobseeker-assessments/jobseeker-assessments.component';
import { allJobSeekerProfileInfoResolver } from './modules/job-seeker/resolvers/allJobSeekerProfileInfo.resolver';
import { notAuthGuard } from './shared/guard/not-auth.guard';
import { jobSeekerGuard } from './shared/guard/jobSeeker.guard';
import { companyGuard } from './shared/guard/company.guard';

const childRouts: Routes = [
  {
    // Lazy Loading Home Module if the path is empty
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home-module/home.module').then((m) => m.HomeModule),
    
  },
  {
    // Lazy Loading Home Module
    path: 'home',
    loadChildren: () =>
      import('./modules/home-module/home.module').then((m) => m.HomeModule), 
  },

  // Lazy Loading Job Auth Module
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth-module/auth.module').then(
        (m) => m.AuthModuleModule
      ), 
  },

  // Lazy Loading Job Seeker Module
  {
    path: 'job-seeker',
    loadChildren: () =>
      import('./modules/job-seeker/job-seeker.module').then(
        (m) => m.JobSeekerModule
      ),
      
  },

  {
    path: 'job-details/:id',
    component: JobDetailsComponent,
  },
  {
    path: 'job-application/:postId',
    component: JobApplicationComponent,
    resolve: {
      jobPostAppFormResolver: jobPostAppFormResolver,
    },
  },
  {
    path: 'company-profile',
    component: CompanyProfileComponent,
  },
  {
    path: 'js-profile',
    component: JobSeekerProfileComponent,
  },
  {
    path: 'app-page/:postId',
    component: ApptPageComponent,
  },
  {
    path: 'app-page/:postId/application/:appId',
    component: ApptPageComponent,
  },
  {
    path: 'app-profile',
    component: ProfileComponent,
  },

  {
    path: 'app-interview',
    component: InterviewComponent,
  },
  {
    path: 'app-comments',
    component: CommentsComponent,
  },
  {
    path: 'app-timelines',
    component: TimelineComponent,
  },
  {
    path: 'app-assessments',
    component: AssessmentsComponent,
  },
  {
    path: 'app-offer',
    component: OfferComponent,
  },
  {
    path: 'saved-job',
    component: SavedJobsComponent,
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule), 
  },
  {
    path:"search",
    loadChildren : () => 
      import('./modules/search-pages/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'job-posts',
    component: JobPostsComponent,
  },
  {
    path: 'hiring-process',
    component: JobseekerHiringProcessComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: childRouts,
  },

  // Lazy loading Error pages
  {
    path: 'error/:err',
    loadComponent: () =>
      import(
        './shared/standalone-components/error-page/error-page.component'
      ).then((c) => c.ErrorPageComponent),
  },
  {
    path: 'comp-nav',
    component: CompanyHeaderComponent,
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/standalone-components/error-page/error-page.component'
      ).then((c) => c.ErrorPageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
