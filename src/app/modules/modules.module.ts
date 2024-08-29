import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringTeamComponent } from './hiring-team/hiring-team.component';
import { NavbarComponent } from '../shared/layout/standalone-components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetDatePipeModule } from '../shared/pipes/public-pipes/get-date-pipe/get-date-pipe.module';
import { ApptPageComponent } from './appt-page/appt-page.component';
import { ProfileComponent } from './appt-page/components/profile/profile.component';
import { TimelineComponent } from './appt-page/components/timeline/timeline.component';
import { CommentsComponent } from './appt-page/components/comments/comments.component';
import { AssessmentsComponent } from './appt-page/components/assessments/assessments.component';
import { OfferComponent } from './appt-page/components/offer/offer.component';
import { InterviewComponent } from './appt-page/components/interview/interview.component';
import { JobsFilterSearchPageComponent } from './search-pages/jobs-filter-search-page/jobs-filter-search-page.component';
import { InitialSearchPageComponent } from './search-pages/initial-search-page/initial-search-page.component';
import { CompaniesFilterSearchPageComponent } from './search-pages/companies-filter-search-page/companies-filter-search-page.component';
import { PeopleFilterSearchPageComponent } from './search-pages/people-filter-search-page/people-filter-search-page.component';
import { ShortenStringPipeModule } from '../shared/pipes/public-pipes/shorten-string-pipe/shorten-string-pipe/shorten-string-pipe.module';
import { PublicPipesSharedModuleModule } from '../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { JobseekerHiringProcessComponent } from './job-seeker/jobseeker-applications/jobseeker-hiring-process.component';
import { QuestionComponent } from './job-seeker/jobseeker-applications/components/jobseeker-answers/question.component';
import { JobseekerAssessmentsComponent } from './job-seeker/jobseeker-applications/components/jobseeker-assessments/jobseeker-assessments.component';
import { FirstPageComponent } from './job-seeker/jobseeker-applications/components/jobseeker-interview/first-page.component';
import { SecondPageComponent } from './job-seeker/jobseeker-applications/components/jobseeker-offer/second-page.component';
import { HandleFileUrlPipe } from '../shared/pipes/public-pipes/handle-file-url.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    // ApptPageComponent,
    ProfileComponent,
    TimelineComponent,
    // CommentsComponent,
    // AssessmentsComponent,
    // OfferComponent,
    // InterviewComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    GetDatePipeModule,
    ShortenStringPipeModule,
    PublicPipesSharedModuleModule,
    NavbarComponent
  ],
})
export class ModulesModule {}
