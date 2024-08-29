import { Component, OnInit, inject } from '@angular/core';
import { RecruiterManagementService } from '../recruiter-management.service';
import { RecruiterInvitationRequest } from '../../../../shared/models/recruiter/recruiter-invitation-request';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrl: './invite-form.component.scss'
})
export class InviteFormComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  router = inject(Router)

  errorMsg = ""

  recruiterData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  get email(){
    return this.recruiterData.controls.email
  }

  get jobTitle(){
    return this.recruiterData.controls.jobTitle
  }

  recruiterService = inject(RecruiterManagementService)


  sendInvitation() {
    let requestData: RecruiterInvitationRequest = {
      recruiterEmail: this.email.value as string,
      recruiterJobTitle: this.jobTitle.value as string
    }
    console.log(requestData)
    this.recruiterService.sendInvitation(requestData)
      .subscribe({
        next: (res) => {
          if(res.ok){
            console.log(res)
            this.backToTeamPage()
          }else {
            console.log(res)
            this.errorMsg = res.message
          }          
        },
        error: (err) => {
          console.log(err)
          this.errorMsg = err.message
        }
      })
  }

  backToTeamPage() {
    this.router.navigate(["/"])
  }

}
