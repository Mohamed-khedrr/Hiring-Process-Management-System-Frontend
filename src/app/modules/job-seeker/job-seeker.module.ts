import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSeekerProfileComponent } from './job-seeker-profile/job-seeker-profile.component';
import { JobSeekerRoutingModule } from './job-seeker-routing.module';

import { SettingComponent } from './setting/job-seeker-setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationMessageComponent } from '../../shared/standalone-components/notification-message/notification-message.component';
import { PublicPipesSharedModuleModule } from '../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GetDatePipeModule } from '../../shared/pipes/public-pipes/get-date-pipe/get-date-pipe.module';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { JobApplicationComponent } from './job-application/job-application.component';
import { HttpClientModule } from '@angular/common/http';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionComponent } from './jobseeker-applications/components/jobseeker-answers/question.component';
import { JobseekerAssessmentsComponent } from './jobseeker-applications/components/jobseeker-assessments/jobseeker-assessments.component';
import { FirstPageComponent } from './jobseeker-applications/components/jobseeker-interview/first-page.component';
import { SecondPageComponent } from './jobseeker-applications/components/jobseeker-offer/second-page.component';
import { CustomRouteReuseStrategy } from '../../shared/CustomRouteReuseStrategy';

@NgModule({
  declarations: [
    JobSeekerProfileComponent,
    SettingComponent,
    SavedJobsComponent,
    JobApplicationComponent,
    SavedJobsComponent,
    ExplorePageComponent,
    QuestionComponent,
    JobseekerAssessmentsComponent,
    FirstPageComponent,
    SecondPageComponent,
  ],
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    ReactiveFormsModule,
    NotificationMessageComponent,
    CarouselModule,
    PdfViewerModule,
    GetDatePipeModule,
    RouterModule,
    PublicPipesSharedModuleModule,
  ],
  exports: [JobSeekerProfileComponent],
})
export class JobSeekerModule {}
