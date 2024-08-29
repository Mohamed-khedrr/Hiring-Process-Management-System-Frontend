import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from '../../../../shared/models/job-seeker/Change-password-request';
import { FormBuilder } from '@angular/forms';
import { SettingsService } from '../../../../shared/services/settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.notificationHeader = ''
    this.notificationMessege = ''
  }

  settingsService = inject(SettingsService)
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  notificationMessege = ''
  notificationHeader = ''
  isPrivate: boolean | undefined 
  receiveNotifications: boolean | undefined 
  receiveJobAlerts: boolean | undefined 

  privateForm = this.formBuilder.group({
    isPrivateOFform: [false],
    receiveJobAlertsOfForm: [false],
    receiveNotificationsOfForm: [false],
  })
  
  get isPrivateOfForm(){
    return this.privateForm.value?.isPrivateOFform
  }

  get receiveJobAlertsOfForm(){
    return this.privateForm.value?.receiveJobAlertsOfForm
  }

  get receiveNotificationsOfForm(){
    return this.privateForm.value?.receiveNotificationsOfForm
  }

  ngOnInit(): void {
    // this call is calling in it get subscription status methods
    this.getPrivateStatus()
  }

  fillPrivateForm(){
    this.privateForm.patchValue({
      isPrivateOFform: this.isPrivate || null,
      receiveJobAlertsOfForm: this.receiveJobAlerts || null,
      receiveNotificationsOfForm: this.receiveNotifications || null
    })
  }

  changePasswordForm = this.formBuilder.group({
    oldPassword: [''],
    newPassword: [''],
    confirmedNewPassword: ['']
  })

  subscriptionForm = this.formBuilder.group({
    isPrivateOfForm: [''],
    receiveJobAlertsOfForm: [''],
    receiveNotificationsOfForm: ['']
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
        this.notificationMessege = "Message Changed Successfully"
        this.changePasswordForm.reset()
      },
      error: (err) => console.error(err.message),
    })
  }

  getPrivateStatus(){
    this.settingsService
    .getJobSeekerPrivateAccountStatus()
    .subscribe({
      next: (res) => {
        this.isPrivate = res.body
        this.getReceiveJobAlertsStatus()
      }
    })
  }

  setPrivateStatus(){
    var value = false
    if (this.isPrivateOfForm){
      value = true
    }
    this.settingsService
    .setJobSeekerPrivateAccountStatus(value)
    .subscribe({
      next: (res) => {
        console.log(res.message)
        this.notificationHeader = "Change Private status"
        this.notificationMessege = res.message
      }
    })
  }

  setSubscriptionStatus(){
    this.setReceiveJobAlertsStatus()
    this.setReceiveNotificationsStatus()
  }

  getReceiveJobAlertsStatus(){
    this.settingsService
    .getJobSeekerReceiveJobAlertsStatus()
    .subscribe({
      next: (res) => {
        console.log(res.body)
        this.receiveJobAlerts = res.body
        this.getReceiveNotificationsStatus()
      }
    })
  }

  getReceiveNotificationsStatus(){
    this.settingsService
    .getJobSeekerReceiveNotificationsStatus()
    .subscribe({
      next: (res) => {
        console.log(res.body)
        this.receiveNotifications = res.body
        this.fillPrivateForm()
      }
    })
  }

  setReceiveJobAlertsStatus(){
    var value = false
    if (this.receiveJobAlertsOfForm){
      value = true
    }
    this.settingsService
    .setJobSeekerReceiveJobAlertsStatus(value)
    .subscribe({
      next: (res) => {
        console.log(res.body)
        // this.notificationHeader = "Change Subscription status"
        this.notificationMessege = res.message
      }
    })
  }

  setReceiveNotificationsStatus(){
    var value = false
    if (this.receiveNotificationsOfForm){
      value = true
    }
    this.settingsService
    .setJobSeekerReceiveNotificationsStatus(value)
    .subscribe({
      next: (res) => {
        console.log(res.body)
        // this.notificationHeader = "Change Subscription status"
        this.notificationMessege = res.message
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
