import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppEvaluationService } from '../../../../appt-page/services/app-evaluation.service';
import { Interview } from '../../../../../shared/models/app/interview';
import { TechnicalType } from '../../../../../shared/models/app/TechnicalType';
import { InterviewStatus } from '../../../../../shared/models/app/InterviewStatus';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss'
})
export class FirstPageComponent {

  route = inject(ActivatedRoute)
  appEvaluationService = inject(AppEvaluationService);
  applicationId: any;
  interviews!: Array<Interview>
  dateTime = new Date()

  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id'];
    this.getAllInterviewsForApplication()
  }

  getAllInterviewsForApplication() {
    this.appEvaluationService.getAllInterviewsForApplication(this.applicationId)
    .subscribe({
      next: (res) => {
        this.interviews = res.body
        console.log(res);        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  makeInterviewVisited(interviewId: string) {
    this.appEvaluationService.changeInterviewStatus(interviewId, InterviewStatus.Visited)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getDateTimeAndDay(dateTimeString: string) {
    let dateTime = new Date(dateTimeString)
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return  days[dateTime.getDay()] + ', ' + dateTime.toLocaleString();  
  }

}
