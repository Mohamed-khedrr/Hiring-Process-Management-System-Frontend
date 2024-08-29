import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostAdvancedSetting } from '../../../shared/models/job-post/job-post-advanced-setting';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ApplicationService } from '../../company/application/application.service';
import { JobPostAppForm } from '../../../shared/models/job-post/job-post-app-form';

type FromQuestion = FormGroup<{
  questionId: FormControl<string>;
  questionAnswer: FormControl;
}>;

type From = FormGroup<{
  questions: FormArray<FromQuestion>;
}>;

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.scss',
})
export class JobApplicationComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router)
  fb = inject(NonNullableFormBuilder);
  applicationService = inject(ApplicationService);

  postAppForm!: JobPostAppForm;

  applicationForm: From = this.fb.group({
    questions: this.fb.array<FromQuestion>([]),
  });

  ngOnInit(): void {
    this.postAppForm = this.route.snapshot.data['jobPostAppFormResolver'].body;
    console.log(this.postAppForm);
    this.addQuestionsToForm();
  }

  addQuestionsToForm() {
    const formQuestions = this.postAppForm.questionDtosList;
    formQuestions.forEach((q) => {
      let newQuestion: FromQuestion = this.fb.group({
        questionId: q.id as string,
        questionAnswer: this.fb.control(null, [Validators.required]),
      });
      this.applicationForm.controls.questions.push(newQuestion);
    });
  }

  submitFrom() {
    const data = this.applicationForm.getRawValue().questions;
    console.log('is valid: ', this.applicationForm.valid);
    console.log(data);
    this.applicationService
      .submitQuestionsApplication(this.postAppForm.jobPostId, data)
      .subscribe({
        next: (res) => {
          console.log('submitted', res);
          setTimeout(() => this.router.navigate(['/job-seeker/jobs/explore']), 3000)
        },
        error: (err) => {
          console.log('error on saving application', err);
        },
      });
  }
}
