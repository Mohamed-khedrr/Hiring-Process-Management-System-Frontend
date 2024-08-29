import { InterviewStatus } from './../../../../shared/models/app/InterviewStatus';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AppEvaluationService } from '../../services/app-evaluation.service';
import { Interview } from '../../../../shared/models/app/interview';
import { TechnicalType } from '../../../../shared/models/app/TechnicalType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class InterviewComponent implements OnInit, OnChanges {
  @Output() editInterview = new EventEmitter<Interview>();
  @Input() isFormDestroyed: any;

  @Input() applicationId!: string;
  appEvaluationService = inject(AppEvaluationService);
  interviewId!: any;

  allInterviews!: Interview[] | null;

  InterviewStatus = InterviewStatus;

  ngOnInit() {
    // this.applicationId = '074bdd73-1ffb-423c-bdf9-4b6416cbee72';
    this.interviewId = 'cd572197-fb05-48a7-824d-d920e937bdae';
    // this.addInterviewToApplication()
    this.getAllInterviewsForApplication();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicationId']) {
      this.getAllInterviewsForApplication();
    }
    if (changes['isFormDestroyed']) {
      this.getAllInterviewsForApplication();
    }
  }

  makeInterviewVisited(interviewId: string) {
    this.appEvaluationService
      .changeInterviewStatus(interviewId, InterviewStatus.Visited)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  makeInterviewAttendedOrMissed(
    interviewId: string,
    interviewStatus: InterviewStatus
  ) {
    this.appEvaluationService
      .changeInterviewStatus(interviewId, interviewStatus)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteInterview(interviewId: string) {
    this.appEvaluationService.deleteInterview(interviewId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getInterview(interviewId: string) {
    this.appEvaluationService.getInterview(interviewId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllInterviewsForApplication() {
    this.appEvaluationService
      .getAllInterviewsForApplication(this.applicationId)
      .subscribe({
        next: (res) => {
          this.allInterviews = res.body;
          console.log('all INterviews ', res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  sendInterviewToEditFrom(interview: Interview) {
    this.editInterview.emit(interview);
  }

  changeStatus(inviewId: any, target: any) {
    const inviewStatus = target.value as InterviewStatus;
    this.makeInterviewAttendedOrMissed(inviewId, inviewStatus);
  }
}
