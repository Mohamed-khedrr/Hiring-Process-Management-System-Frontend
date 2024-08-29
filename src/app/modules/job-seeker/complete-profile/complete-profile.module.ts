import { MultiSelectionSquaresComponent } from './../../../shared/layout/standalone-components/multi-selection-squares/multi-selection-squares.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { FirstStageComponent } from './first-stage/first-stage.component';
import { SecondStageComponent } from './second-stage/second-stage.component';
import { ThirdStageComponent } from './third-stage/third-stage.component';
import { StageCounterComponent } from './stage-counter/stage-counter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/layout/standalone-components/navbar/navbar.component';
import { HandleFileUrlPipe } from '../../../shared/pipes/public-pipes/handle-file-url.pipe';
import { AppModule } from '../../../app.module';
import { PublicPipesSharedModuleModule } from '../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { JobSeekerEducationFormComponent } from './layouts/job-seeker-education-form/job-seeker-education-form.component';
import { SingleSelectionSquaresComponent } from '../../../shared/layout/standalone-components/single-selection-squares/single-selection-squares.component';
import { JobSeekerExperienceFormComponent } from './layouts/job-seeker-experience-form/job-seeker-experience-form.component';
import { JobSeekerLanguageFormComponent } from './layouts/job-seeker-language-form/job-seeker-language-form.component';
import { MultiSelectSearchBoxComponent } from '../../../shared/layout/standalone-components/multi-select-search-box/multi-select-search-box.component';
import { DropdownModule } from 'primeng/dropdown';
import { JobSeekerCertificateFormComponent } from "./layouts/job-seeker-certificate-form/job-seeker-certificate-form.component";

@NgModule({
    declarations: [
        FirstStageComponent,
        SecondStageComponent,
        ThirdStageComponent,
        StageCounterComponent,
        JobSeekerEducationFormComponent,
        JobSeekerExperienceFormComponent,
        JobSeekerLanguageFormComponent,
    ],
    imports: [
        CommonModule,
        CompleteProfileRoutingModule,
        ReactiveFormsModule,
        MultiSelectModule,
        FormsModule,
        NavbarComponent,
        PublicPipesSharedModuleModule,
        SingleSelectionSquaresComponent,
        MultiSelectionSquaresComponent,
        MultiSelectSearchBoxComponent,
        DropdownModule,
        JobSeekerCertificateFormComponent
    ]
})
export class CompleteProfileModule {}
