import { Component, inject } from '@angular/core';
import { AppEvaluationService } from '../../../../appt-page/services/app-evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { Assessment } from '../../../../../shared/models/app/assessment';
import { AssessmentStatus } from '../../../../../shared/models/app/AssessmentStatus';

@Component({
  selector: 'app-jobseeker-assessments',
  templateUrl: './jobseeker-assessments.component.html',
  styleUrl: './jobseeker-assessments.component.scss'
})
export class JobseekerAssessmentsComponent {

  route = inject(ActivatedRoute)
  employerAppsService = inject(AppEvaluationService);
  applicationId: any;
  assessments!: Array<Assessment>
  dateTimeNow = Date.now()
  dateTime = new Date()
  assessmentStatus = AssessmentStatus;
  

  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id'];
    this.getAllAssessmentsForApplication()
  }

  getAllAssessmentsForApplication() {
    this.employerAppsService.getAllAssessmentsForApplication(this.applicationId)
    .subscribe({
      next: (res) => {
        this.assessments = res.body
        console.log(res);        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  makeAssessmentVisitedOrCompleted(
    assessmentId: string,
    assessmentStatus: AssessmentStatus
  ) {
    this.employerAppsService
      .changeAssessmentStatus(assessmentId, assessmentStatus)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getAllAssessmentsForApplication()
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getDateTime(dateTimeString: string){
    return new Date(dateTimeString)
  }

  getDateTimeAndDay(dateTimeString: string) {
    let dateTime = new Date(dateTimeString)
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return  days[dateTime.getDay()] + ', ' + dateTime.toLocaleString();  
  }

}
