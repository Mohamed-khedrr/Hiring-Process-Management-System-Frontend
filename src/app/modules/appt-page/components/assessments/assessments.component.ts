import { AssessmentStatus } from './../../../../shared/models/app/AssessmentStatus';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AppEvaluationService } from '../../services/app-evaluation.service';
import { Assessment } from '../../../../shared/models/app/assessment';
import { TechnicalType } from '../../../../shared/models/app/TechnicalType';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss',
  standalone: true,
  imports: [DatePipe, CommonModule],
})
export class AssessmentsComponent implements OnChanges {
  @Output() editAssessment = new EventEmitter<Assessment>();
  @Input() applicationId: any;
  @Input() isFormDestroyed: any;

  employerAppsService = inject(AppEvaluationService);
  route = inject(ActivatedRoute);
  assessmentId!: any;
  allAssessments: Assessment[] | null = null;
  AssessmentStatus = AssessmentStatus;
  ngOnInit() {
    // this.assessmentId = 'c10b68f2-127e-4589-af32-c0a63d72af38';
    this.getAllAssessmentsForApplication();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicationId']) {
      this.getAllAssessmentsForApplication();
    }
    if (changes['isFormDestroyed']) {
      this.getAllAssessmentsForApplication();
    }
  }

  SendAssessmentToEditFrom(asses: Assessment) {
    this.editAssessment.emit(asses);
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
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  makeAssessmentMissed(assessmentId: string) {
    this.employerAppsService
      .changeAssessmentStatus(assessmentId, AssessmentStatus.Missed)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteAssessment(assessmentId: any) {
    this.employerAppsService.deleteAssessment(assessmentId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAssessment(assessmentId: string) {
    this.employerAppsService.getAssessment(assessmentId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllAssessmentsForApplication() {
    if (!this.applicationId) return;
    this.employerAppsService
      .getAllAssessmentsForApplication(this.applicationId)
      .subscribe({
        next: (res) => {
          this.allAssessments = res.body;
          console.log(res.body);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getDate(date: string) {
    return new Date(date);
  }
}
