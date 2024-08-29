import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { AllJobseekerProfileInfo } from '../../../../shared/models/job-seeker/all-jobseeker-profile-info';
import { PublicPipesSharedModuleModule } from '../../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GeneralAppService } from '../../services/general-app.service';
import { ApplicationAnswerDTO } from '../../../../shared/models/app/ApplicationAnswerDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone : true ,
  imports:[CommonModule , PublicPipesSharedModuleModule, PdfViewerModule]
})
export class ProfileComponent implements OnInit {

  generalAppService = inject(GeneralAppService)

  answers!: Array<ApplicationAnswerDTO>

  @Input() profileData !: AllJobseekerProfileInfo | null ;
  @Input() applicationId : string = '' ;

  ngOnInit(): void {
      console.log(this.profileData) ;
      this.getApplicationAnswers()
  }

  getApplicationAnswers() {
    this.generalAppService.getApplicationAnswers(this.applicationId)
    .subscribe({
      next: (res) => {
        this.answers = res.body
        console.log(res);        
      }
    })
  }

}
