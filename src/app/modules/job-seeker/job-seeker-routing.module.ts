import { jobSeekerCareerInterestResolver } from './resolvers/job-seeker-career-interest.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerProfileComponent } from './job-seeker-profile/job-seeker-profile.component';
import { SettingComponent } from './setting/job-seeker-setting/setting.component';
import { jobSeekerBasicInfoResolver } from './resolvers/job-seeker-basic-info.resolver';
import { jobSeekerProfessionalInfoResolver } from './resolvers/job-seeker-professional-info.resolver';
import { jobSeekerLanguagesInfoResolver } from './resolvers/job-seeker-languages-info.resolver';
import { jobSeekerEducationInfoResolver } from './resolvers/job-seeker-education-info.resolver';
import { jobSeekerExperienceInfoResolver } from './resolvers/job-seeker-experience-info.resolver';
import { jobSeekerCertificateInfoResolver } from './resolvers/job-seeker-certificate-info.resolver';
import { allJobSeekerProfileInfoResolver } from './resolvers/allJobSeekerProfileInfo.resolver';
import { JobSeekerCompanyProfileComponent } from '../company/job-seeker-company-profile/job-seeker-company-profile.component';
import { companyProfileResolver } from '../company/resolvers/company-profile.resolver';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { savedJobsResolver } from './resolvers/saved-jobs.resolver';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobseekerHiringProcessComponent } from './jobseeker-applications/jobseeker-hiring-process.component';
import { QuestionComponent } from './jobseeker-applications/components/jobseeker-answers/question.component';
import { FirstPageComponent } from './jobseeker-applications/components/jobseeker-interview/first-page.component';
import { SecondPageComponent } from './jobseeker-applications/components/jobseeker-offer/second-page.component';
import { JobseekerAssessmentsComponent } from './jobseeker-applications/components/jobseeker-assessments/jobseeker-assessments.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { jobSeekerGuard } from '../../shared/guard/jobSeeker.guard';

const routes: Routes = [
  { path: 'settings', component: SettingComponent },
  // {
  //   path: 'profile',
  //   component: JobSeekerProfileComponent,
  //   resolve: {
  //     jobSeekerCareerIntrest: jobSeekerCareerInterestResolver,
  //     jobSeekerBasicInfo: jobSeekerBasicInfoResolver,
  //     jobSeekerProfessionalInfo: jobSeekerProfessionalInfoResolver,
  //     jobSeekerLanguages: jobSeekerLanguagesInfoResolver,
  //     jobSeekerEducationList: jobSeekerEducationInfoResolver,
  //     jobSeekerExperienceList: jobSeekerExperienceInfoResolver,
  //     jobSeekerCertificateList: jobSeekerCertificateInfoResolver,
  //   },
  // },
  {
    path: 'profile/:userId',
    component: JobSeekerProfileComponent,
    resolve: {
      jobSeekerProfileInfo: allJobSeekerProfileInfoResolver,
    },
  },

  {
    path: 'company-profile/:id',
    component: JobSeekerCompanyProfileComponent,
    resolve: {
      ApiResponse: companyProfileResolver,
    },
    canActivate:[jobSeekerGuard]
  },
  {
    path: 'jobs/saved',
    component: SavedJobsComponent,
    resolve: { data: savedJobsResolver },
    canActivate:[jobSeekerGuard]
  },
  {
    path: 'jobs/explore',
    component: ExplorePageComponent,
    
  },
  {
    // Lazy Loading Job Interest Module
    path: 'complete-profile',
    loadChildren: () =>
      import('./complete-profile/complete-profile.module').then(
        (m) => m.CompleteProfileModule
      ),
      canActivate:[jobSeekerGuard]
  },
  {
    path: 'job-applications',
    component: JobseekerHiringProcessComponent,
    children: [
      { path: 'questions/:id', component: QuestionComponent, data: { refreshComponent: true },},
      { path: 'interviews/:id', component: FirstPageComponent },
      { path: 'assessments/:id', component: JobseekerAssessmentsComponent },
      { path: 'offer/:id', component: SecondPageComponent }
    ],
    data: { refreshComponent: true },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSeekerRoutingModule {}
