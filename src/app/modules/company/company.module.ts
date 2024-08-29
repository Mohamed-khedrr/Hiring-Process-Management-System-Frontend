import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { JobSeekerCompanyProfileComponent } from './job-seeker-company-profile/job-seeker-company-profile.component';
import { CompanyRoutingModule } from './company-routing.module';
import { InviteFormComponent } from './recruiter-management/invite-form/invite-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicDirectivesModule } from '../../shared/directives/public-directives.module';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CompanyNavComponent } from './company-nav/company-nav.component';
import { CompanySidebarComponent } from './company-sidebar/company-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicPipesSharedModuleModule } from '../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationMessageComponent } from '../../shared/standalone-components/notification-message/notification-message.component';
import { GetDatePipeModule } from '../../shared/pipes/public-pipes/get-date-pipe/get-date-pipe.module';
import { RecruiterSettingsComponent } from './settings/recruiter-settings/recruiter-settings.component';
import { CompanySettingsComponent } from './settings/company-settings/company-settings.component';
import { ShortenStringPipeModule } from '../../shared/pipes/public-pipes/shorten-string-pipe/shorten-string-pipe/shorten-string-pipe.module';
import { JobPostsComponent } from './job-posts/job-posts/job-posts.component';
import { JobPostFirstStageComponent } from './job-posts/job-post-first-stage/job-post-first-stage.component';
import { JobPostSecondStageComponent } from './job-posts/job-post-second-stage/job-post-second-stage.component';
import { SingleSelectionSquaresComponent } from '../../shared/layout/standalone-components/single-selection-squares/single-selection-squares.component';
import { DropdownModule } from 'primeng/dropdown';
import { JobDetailsComponent } from './job-posts/job-details/job-details.component';
import { PublicJobPostComponent } from './job-posts/public-job-post/public-job-post.component';
import { HiringTeamComponent } from '../hiring-team/hiring-team.component';
import { MultiSelectSearchBoxComponent } from '../../shared/layout/standalone-components/multi-select-search-box/multi-select-search-box.component';
@NgModule({
  declarations: [
    CompanyProfileComponent,
    JobSeekerCompanyProfileComponent,
    InviteFormComponent, 
    RecruiterSettingsComponent,
    CompanySettingsComponent,
    JobPostsComponent,
    JobPostFirstStageComponent,
    JobPostSecondStageComponent,
    JobDetailsComponent,
    PublicJobPostComponent,
    HiringTeamComponent,
  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PublicDirectivesModule,
    NotificationMessageComponent,
    IonicModule,
    ToastModule,
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    GetDatePipeModule,
    PublicPipesSharedModuleModule,
    ShortenStringPipeModule,
    DropdownModule,
    SingleSelectionSquaresComponent,
    MultiSelectSearchBoxComponent
  ],
})
export class CompanyModule {}
