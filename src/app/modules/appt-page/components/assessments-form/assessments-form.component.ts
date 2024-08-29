import { TechnicalType } from './../../../../shared/models/app/TechnicalType';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Assessment } from '../../../../shared/models/app/assessment';
import { AssessmentStatus } from '../../../../shared/models/app/AssessmentStatus';
import { AppEvaluationService } from '../../services/app-evaluation.service';

@Component({
  selector: 'app-assessments-form',
  templateUrl: './assessments-form.component.html',
  styleUrls: ['./assessments-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AssessmentsFormComponent implements OnInit, OnChanges {
  @Output() hideFromEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() applicationId: string = '';
  @Input() oldAssessment!: Assessment | null;

  TechnicalType = TechnicalType;
  AssessmentStatus = AssessmentStatus;
  fb = inject(FormBuilder);
  employerAppsService = inject(AppEvaluationService);

  assessmentFrom = this.fb.group({
    assessmentTitle: ['', [Validators.required]],
    assessmentDeadline: ['', [Validators.required]],
    assessmentDuration: ['', [Validators.required]],
    assessmentLink: ['', [Validators.required]],
    assessmentTechnicalType: ['', [Validators.required]],
  });

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oldAssessment']) {
      if (this.oldAssessment?.id) {
        this.setAssessmentOldData(this.oldAssessment);
      }
    }
  }

  get assessmentTitle() {
    return this.assessmentFrom.controls.assessmentTitle;
  }
  get assessmentDeadline() {
    return this.assessmentFrom.controls.assessmentDeadline;
  }
  get assessmentDuration() {
    return this.assessmentFrom.controls.assessmentDuration;
  }
  get assessmentLink() {
    return this.assessmentFrom.controls.assessmentLink;
  }
  get assessmentTechnicalType() {
    return this.assessmentFrom.controls.assessmentTechnicalType;
  }

  setAssessmentOldData(assessmentOldData: Assessment) {
    const deadLine = new Date(assessmentOldData.availableTill);
    this.assessmentFrom.setValue({
      assessmentTitle: assessmentOldData.title,
      assessmentDeadline: `${deadLine.getFullYear()}-${this.addPaddingForDate(
        deadLine.getMonth() + 1
      )}-${this.addPaddingForDate(deadLine.getDate())}`,
      assessmentDuration: assessmentOldData.duration,
      assessmentLink: assessmentOldData.link,
      assessmentTechnicalType: assessmentOldData.technicalType,
    });
  }

  addPaddingForDate(value: number): string {
    return value.toString().padStart(2, '0');
  }

  submitFrom() {
    const assessment: Assessment = {
      title: this.assessmentTitle.value as string,
      availableTill: new Date(
        this.assessmentDeadline.value as string
      ).toISOString(),
      duration: this.assessmentDuration.value as string,
      link: this.assessmentLink.value as string,
      applicationId: this.applicationId,
      technicalType: this.assessmentTechnicalType.value as TechnicalType,
      status: this.oldAssessment?.status || AssessmentStatus.Delivered,
      result: '',
    };
    if (this.oldAssessment?.id) {
      this.editAssessmentInfo(this.oldAssessment.id, assessment);
    } else {
      this.addAssessmentToApplication(assessment);
    }
  }

  addAssessmentToApplication(assessment: Assessment) {
    this.employerAppsService.addAssessment(assessment).subscribe({
      next: (res) => {
        console.log('assessment ', res);
        if (res.status < 400) {
          this.assessmentFrom.reset();
          this.hideForm();
        }
      },
      error: (err) => {
        console.log('Error on Saving Assessment', err);
      },
    });
  }

  editAssessmentInfo(assessmentId: string, asses: Assessment) {
    this.employerAppsService.editAssessment(assessmentId, asses).subscribe({
      next: (res) => {
        console.log('Edit  ', res);
        if (res.status < 400) {
          this.assessmentFrom.reset();
          this.hideForm();
        }
      },
      error: (err) => {
        console.log('Error on editing Assessment ', err);
      },
    });
  }

  hideForm() {
    this.hideFromEvent.emit(true);
    this.oldAssessment = null;
  }
}
