import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterManagementService } from '../company/recruiter-management/recruiter-management.service';
import { RecruiterInvitationRequest } from '../../shared/models/recruiter/recruiter-invitation-request';
import { HiringTeamService } from './hiring-team.service';
import { RecruiterInvitationInfo } from '../../shared/models/recruiter/recruiter-invitation-info';
import { RecruiterBasicInfo } from '../../shared/models/recruiter/recruiter-basic-info';
import { RecruiterUpdateInfoByCompany } from '../../shared/models/recruiter/recruiter-update-into-by-company';

@Component({
  selector: 'app-hiring-team',
  templateUrl: './hiring-team.component.html',
  styleUrl: './hiring-team.component.scss'
})
export class HiringTeamComponent {

  @ViewChild('overlay') overlay: any | undefined;

  formBuilder = inject(FormBuilder);
  router = inject(Router)
  hiringTeamService = inject(HiringTeamService)

  pendingInvitations:Array<RecruiterInvitationInfo> = [];
  companyRecruiters:Array<RecruiterBasicInfo> = [];
  isUpdateRecruiterOpen: boolean[] = new Array(this.companyRecruiters.length).fill(false);
  deleteRecruiterPopUp = false
  deleteInvitationPopUp = false
  recruiterToDelete: RecruiterBasicInfo | undefined;
  invitationToDelete: RecruiterInvitationInfo | undefined;

  errorMsg = ""
  inviteMemberError = ''

  recruiterData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', [Validators.required]],
  });

  recruiterInfo = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getCompanyInvitations()
    this.getCompanyRecruiters()
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
      recruiterJobTitle: this.jobTitle.value as string,
    }
    console.log(requestData)
    this.recruiterService.sendInvitation(requestData)
      .subscribe({
        next: (res) => {
          if(res.ok){
            console.log(res)
          }else {
            console.log(res)
            this.inviteMemberError = res.message
            setTimeout( () => {
              this.clearInviteForm()
            }, 6000)
          }          
        },
        error: (err) => {
          console.log(err)
          this.inviteMemberError = err.message
          setTimeout( () => {
            this.clearInviteForm()
          }, 6000)
        }
      })
  }

  getCompanyInvitations() {
    this.hiringTeamService.getCompanyPendingInvitiations()
    .subscribe({
      next: (res) => {
        this.pendingInvitations = res.body
        console.log(this.pendingInvitations);        
      }, error: (err) => {
        console.log(err);        
      }
    })
  }

  getCompanyRecruiters() {
    this.hiringTeamService.getCompanyRecruiters()
    .subscribe({
      next: (res) => {
        this.companyRecruiters = res.body
        console.log(this.companyRecruiters);        
      }, error: (err) => {
        console.log(err);        
      }
    })
  }

  toggleRecruiterData(array:Array<any>, index: number, member: RecruiterBasicInfo) {
    if(array[index]) {
      array.fill(false)
    } else {
      array.fill(false)
      array[index] = true
      this.recruiterInfo.patchValue({
        email: member.username,
        jobTitle: member.jobTitle
      })
    }
    
  }

  updateRecruiter(recruiterInfoFromView: RecruiterBasicInfo){
    const recuiterEmailAndTitle: RecruiterUpdateInfoByCompany = {
      email: this.recruiterInfo.controls.email.value as string,
      jobTitle: this.recruiterInfo.controls.jobTitle.value as string
    }
    this.hiringTeamService.updateRecruiter(recruiterInfoFromView.id, recuiterEmailAndTitle)
    .subscribe({
      next: (res) => {
        console.log(recuiterEmailAndTitle, res);  
        window.location.reload()      
      }, 
      error: (err) => {
        console.log(err);        
      }
    })
  }

  deleteRecruiter() {
    this.hiringTeamService.deleteRecruiter(this.recruiterToDelete?.username as string)
    .subscribe({
      next: (res) => {
        console.log(res);  
        this.deleteRecruiterPopUp = false
        window.location.reload()      
      }, 
      error: (err) => {
        console.log(err);        
      }
    })
  }

  popUpDeleteRecruiter(member: RecruiterBasicInfo) {
    this.deleteRecruiterPopUp = true
    this.overlay.nativeElement.classList.remove('hide');
    this.recruiterToDelete = member    
  }

  cancelPopUpForDeleteRecruiter() {
    this.deleteRecruiterPopUp = false
    this.overlay.nativeElement.classList.add('hide');
    this.recruiterToDelete = undefined
  }

  popUpDeleteInvitation(invitation: RecruiterInvitationInfo) {
    this.deleteInvitationPopUp = true
    this.overlay.nativeElement.classList.remove('hide');
    this.invitationToDelete = invitation
  }

  cancelPopUpForDeleteInvitation() {
    this.deleteInvitationPopUp = false
    this.overlay.nativeElement.classList.add('hide');
    this.invitationToDelete = undefined
  }

  deleteInvitation() {
    this.hiringTeamService.deleteInvitation(this.invitationToDelete?.recruiterEmail as string)
    .subscribe({
      next: (res) => {
        console.log(res);  
        window.location.reload()      
      }, 
      error: (err) => {
        console.log(err);        
      }
    })
  }

  clearInviteForm() {
    this.inviteMemberError = ''
    this.recruiterData.reset()
  }

}
