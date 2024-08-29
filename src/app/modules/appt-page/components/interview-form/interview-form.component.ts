import { InterviewStatus } from './../../../../shared/models/app/InterviewStatus';
import { CalendarModule } from 'primeng/calendar';
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
import { TechnicalType } from '../../../../shared/models/app/TechnicalType';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppEvaluationService } from '../../services/app-evaluation.service';
import { Interview } from '../../../../shared/models/app/interview';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './interview-form.component.html',
  styleUrl: './interview-form.component.scss',
})
export class InterviewFormComponent implements OnInit, OnChanges {
  @Output() hideFromEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() applicationId: string = '';
  @Input() oldInterview!: Interview | null;

  TechnicalType = TechnicalType;
  fb = inject(FormBuilder);
  employerAppsService = inject(AppEvaluationService);
  InterviewStatus = InterviewStatus;

  // Calender variables

  interviewFrom = this.fb.group({
    interviewTitle: ['', [Validators.required]],
    interviewStart: ['', [Validators.required]],
    interviewEnd: ['', [Validators.required]],
    interviewLink: ['', [Validators.required]],
    interviewTechnicalType: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // const formattedDate = this.formatDateForInput(new Date('2000-10-26'));
    // this.interviewFrom.patchValue({ interviewStart: formattedDate });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oldInterview']) {
      if (this.oldInterview?.id) {
        this.setInterviewOldData(this.oldInterview);
      }
    }
  }

  get interviewTitle() {
    return this.interviewFrom.controls.interviewTitle;
  }
  get interviewStart() {
    return this.interviewFrom.controls.interviewStart;
  }
  get interviewEnd() {
    return this.interviewFrom.controls.interviewEnd;
  }
  get interviewLink() {
    return this.interviewFrom.controls.interviewLink;
  }
  get interviewTechnicalType() {
    return this.interviewFrom.controls.interviewTechnicalType;
  }

  submitFrom() {
    const interview: Interview = {
      title: this.interviewTitle.value as string,
      link: this.interviewLink.value as string,
      technicalType: this.interviewTechnicalType.value as TechnicalType,
      status: this.oldInterview?.status || InterviewStatus.Delivered,
      result: '',
      applicationId: this.applicationId,
      startTime: new Date(this.interviewStart.value as string).toISOString(),
      endTime: new Date(this.interviewEnd.value as string).toISOString(),
    };

    if (this.oldInterview?.id) {
      this.editInterviewInfo(this.oldInterview.id, interview);
    } else {
      this.addInterviewToApplication(interview);
    }

    console.log(this.interviewStart.value);
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  addInterviewToApplication(interview: Interview) {
    this.employerAppsService.addInterview(interview).subscribe({
      next: (res) => {
        console.log('Added ', res);
        if (res.status < 400) {
          this.interviewFrom.reset();
          this.hideForm();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editInterviewInfo(interviewId: string, interview: Interview) {
    this.employerAppsService.editInterview(interviewId, interview).subscribe({
      next: (res) => {
        console.log('edit', res);
        if (res.status < 400) {
          this.interviewFrom.reset();
          this.hideForm();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setInterviewOldData(oldInterview: Interview) {
    if (this.oldInterview) {
      this.interviewFrom.setValue({
        interviewTitle: oldInterview?.title,
        interviewEnd: oldInterview.endTime,
        interviewStart: oldInterview.startTime,
        interviewTechnicalType: oldInterview.technicalType,
        interviewLink: oldInterview.link,
      });
    }
  }

  hideForm() {
    this.hideFromEvent.emit(true);
    this.oldInterview = null;
  }
}
