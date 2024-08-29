import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ChangePasswordRequest } from '../../../../shared/models/job-seeker/Change-password-request';
import { SettingsService } from '../../../../shared/services/settings.service';
import { CompanySubscriptionChoices } from '../../../../shared/models/company/CompanySubscriptionChoices';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.scss'
})
export class CompanySettingsComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.notificationHeader = ''
    this.notificationMessege = ''
  }

  settingsService = inject(SettingsService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  notificationMessege = ''
  notificationHeader = ''
  receiveNewApplicantsEmails: boolean | undefined 
  receiveTalentSuggestionsEmails: boolean | undefined 

  subscriptionForm = this.formBuilder.group({
    receiveNewApplicantsEmailsOfForm: [false],
    receiveTalentSuggestionsEmailsOfForm: [false],
  })

  get receiveNewApplicantsEmailsOfForm(){
    return this.subscriptionForm.value?.receiveNewApplicantsEmailsOfForm
  }

  get receiveTalentSuggestionsEmailsOfForm(){
    return this.subscriptionForm.value?.receiveTalentSuggestionsEmailsOfForm
  }


  ngOnInit(): void {
    this.getCompanySubscriptionChoices()
  }

  fillSubscriptionForm(){
    this.subscriptionForm.patchValue({
      receiveNewApplicantsEmailsOfForm: this.receiveNewApplicantsEmails || null,
      receiveTalentSuggestionsEmailsOfForm: this.receiveTalentSuggestionsEmails || null
    })
  }

  changePasswordForm = this.formBuilder.group({
    oldPassword: [''],
    newPassword: [''],
    confirmedNewPassword: ['']
  })

  get oldPassword() {
    return this.changePasswordForm.value?.oldPassword;
  }

  get newPassword() {
    return this.changePasswordForm.value?.newPassword;
  }

  get confirmedNewPassword() {
    return this.changePasswordForm.value?.confirmedNewPassword;
  }



  changePassword(){
    let request:ChangePasswordRequest = {
      oldPassword: this.oldPassword as string,
      newPassword: this.newPassword as string,
      confirmedNewPassword:this.confirmedNewPassword as string
    }
    this.settingsService
    .changePassword(request)
    .subscribe({
      next: (res) => {
        console.log('Password Changed Successfully')
        this.notificationHeader = "Change Password"
        this.notificationMessege = "Password Changed Successfully"
        setTimeout(() => {
          this.notificationHeader = ''
          this.notificationMessege = ''
        }, 2500);
        this.changePasswordForm.reset()
      },
      error: (err) => console.error(err.message),
    })
  }

  getCompanySubscriptionChoices(){
    this.settingsService
    .getCompanySubscriptionChoices()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.receiveNewApplicantsEmails = res.body?.receiveNewApplicantsEmails
        this.receiveTalentSuggestionsEmails = res.body?.receiveTalentSuggestionsEmails
        this.fillSubscriptionForm()
      }
    })
  }


  setSubscriptionStatus(){
    let companySubscriptionChoices: CompanySubscriptionChoices = {
      receiveNewApplicantsEmails: this.receiveNewApplicantsEmailsOfForm as boolean,
      receiveTalentSuggestionsEmails: this.receiveTalentSuggestionsEmailsOfForm as boolean
    }
    this.settingsService
    .setCompanySubscriptionChoices(companySubscriptionChoices)
    .subscribe({
      next: (res) => {
        this.notificationHeader = "Change Supscription"
        this.notificationMessege = "Subscription Options Changed Successfully"
        setTimeout(() => {
          this.notificationHeader = ''
          this.notificationMessege = ''
        }, 2500);    
        console.log(res);        
      },error: (err) => {
        console.log(err);        
      }
    })
  }


  deleteAccount() {
    this.settingsService
    .deleteAccount()
    .subscribe({
      next: (res) => {
        console.log(res.body)
        this.notificationHeader = "Account Deleted Successfully"
        this.notificationMessege = "Your data will be permanently deleted after 30 days"
        this.settingsService.signOut()   
      }
    })
  }

}
 