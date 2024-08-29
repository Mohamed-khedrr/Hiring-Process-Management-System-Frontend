import { Component, Input, Output, inject } from '@angular/core';
import { GeneralAppService } from '../../../../appt-page/services/general-app.service';
import { ApplicationAnswerDTO } from '../../../../../shared/models/app/ApplicationAnswerDTO';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {

  route = inject(ActivatedRoute)
  generalAppService = inject(GeneralAppService)
  answers!: Array<ApplicationAnswerDTO>
  @Output() applicationId!: string

  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id']
    this.getApplicationAnswers()
  }


  getApplicationAnswers() {
    this.generalAppService.getApplicationAnswers(this.applicationId)
    .subscribe({
      next: (res) => {
        this.answers = res.body
        console.log(this.answers);        
      }
    })
  }

}
