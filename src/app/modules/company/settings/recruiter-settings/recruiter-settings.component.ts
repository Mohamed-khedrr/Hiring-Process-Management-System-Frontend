import { Component, DestroyRef, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordRequest } from '../../../../shared/models/job-seeker/Change-password-request';
import { SettingsService } from '../../../../shared/services/settings.service';
import { CompanySubscriptionChoices } from '../../../../shared/models/company/CompanySubscriptionChoices';
import { CountryCode } from '../../../../shared/models/common/CountryCode';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth-module/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RetrieveJobSeekerDataService } from '../../../job-seeker/retrieve-job-seeker-data.service';
import { RecruiterManagementService } from '../../recruiter-management/recruiter-management.service';
import { RecruiterBasicInfo } from '../../../../shared/models/recruiter/recruiter-basic-info';
import { RecruiterUpdateBasicInfoRequest } from '../../../../shared/models/recruiter/recruiter-update-info-request';

@Component({
  selector: 'app-recruiter-settings',
  templateUrl: './recruiter-settings.component.html',
  styleUrl: './recruiter-settings.component.scss'
})
export class RecruiterSettingsComponent implements OnInit, OnDestroy{

  ngOnDestroy(): void {
    this.notificationHeader = ''
    this.notificationMessege = ''
  }

  settingsService = inject(SettingsService);
  authService = inject(AuthService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService)
  router = inject(Router);
  recruiterManagementService = inject(RecruiterManagementService)
  formBuilder = inject(FormBuilder);
  destoryRef = inject(DestroyRef);

  notificationMessege = ''
  notificationHeader = ''

  receiveNewApplicantsEmails: boolean | undefined 
  receiveTalentSuggestionsEmails: boolean | undefined 

  countriesCode: any[] = [];
  selectedCountyCode: CountryCode | undefined;
  selectedProfilePicture: string | undefined;
  profilePicture: File | undefined;
  errorMsg = ''
  photoErrorMsg = '';
  passwordType = 'password';
  recruiterSavedBasicInfo : RecruiterBasicInfo | undefined;
  newPhotoUploaded = false;

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
    this.getRecruiterSubscriptionChoices()
    this.getCountriesCode()
    this.getRecruiterBasicInfo()
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

  basicInfoForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    countryCode: ['', Validators.required],
    phoneNumber: ['', Validators.required]
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

  get firstName() {
    return this.basicInfoForm.controls.firstName
  }

  get lastName() {
    return this.basicInfoForm.controls.lastName
  }

  get countryCode() {
    return this.basicInfoForm.controls.countryCode
  }

  get phoneNumber() {
    return this.basicInfoForm.controls.phoneNumber
  }


  deletePhoto() {
   this.settingsService.removeProfilePhoto()
   .subscribe({
    next: (res) => {
      console.log(res);     
      this.selectedProfilePicture =  undefined
    }, error: (err) => {
      console.log(err);      
    }
   })
  }

  getCountriesCode() {
    this.retrieveJobSeekerData.getCountryCodes().subscribe({
      next: (res) => {
        this.countriesCode = res
      },
      error: (err) => {
        console.log('Error in Loading Countries Code', err);
      },
    });
  }

  updateCountryCode(){
    this.basicInfoForm.controls.countryCode.patchValue(this.selectedCountyCode?.phoneCode || null)    
    this.checkIfMobileUsed()
  }

  togglePassword() {
    console.log("toggle");    
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  checkIfMobileUsed() {    
    if (this.phoneNumber) {
      this.authService
        .checkCompnayMobile(this.countryCode.value as string, this.phoneNumber.value as string)
        .pipe(takeUntilDestroyed(this.destoryRef))
        .subscribe({
          // Success Response
          next: (response) => {
            if (response.body) {
              console.log('Mobile Exists');
              this.phoneNumber.setErrors({ exist: true });
            } else {
              console.log('Mobile not Exists');
              this.phoneNumber.setErrors(null);
            }
          },
          // Handle Error
          error: (error: HttpErrorResponse) => {
            // console.error('API Error:', error);
            console.error('API Error:');
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred.
              console.error('Client Side Error');
            } else {
              console.log('internal server error ');
              // this.router.navigate(['/error', '500']);
            }
          },
        });
    }
  }

  fillBasicInfo(data: RecruiterBasicInfo) {
    console.log(data);
    
    this.basicInfoForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      countryCode: data.phoneNumberCountryCode,
      phoneNumber: data.phoneNumber
    })
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

  getRecruiterSubscriptionChoices(){
    this.settingsService
    .getRecruiterSubscriptionChoices()
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
    .setRecruiterSubscriptionChoices(companySubscriptionChoices)
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

  getRecruiterBasicInfo() {
    this.recruiterManagementService.getRecruiterBasicInfo()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.recruiterSavedBasicInfo = res.body
        this.fillBasicInfo(res.body)
        this.retriveSelectedCountryCode()
        this.selectedProfilePicture = res.body?.profilePhoto
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  retriveSelectedCountryCode() {
    if (
      this.countriesCode.length != 0 &&
      this.countryCode
    ) {
      this.selectedCountyCode = this.countriesCode.filter(
        (item: CountryCode) =>
          item.phoneCode == this.countryCode.value
      )[0];
    }
  }

  updateRecruiterInfo() {
    let recruiterBasicInfo: RecruiterUpdateBasicInfoRequest = {
      firstName: this.firstName.value as string ,
      lastName: this.lastName.value as string,
      phoneNumberCountryCode: this.countryCode.value as string,
      phoneNumber: this.phoneNumber.value as string,
    }

    this.settingsService.updateRecruiterBasicInfo(recruiterBasicInfo)
    .subscribe({
      next: (res) => {
        console.log("Recruiter Info Updated");        
      }, error: (err) => {
        console.log(err);        
      }
    })
  }

  uploadProfileImage(e: any) {
    const imageFile = <File>e.target.files[0]
    const imageExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!imageExtensions.test(imageFile.name)) {
      this.photoErrorMsg = 'Invalid file type. Please upload an image file.';
      e.target.value = null;
      return;
    }else if(imageFile.size > 2*1024*1024){
      this.photoErrorMsg = 'Photo exceeds 2MB Limit.'
      e.target.value = null;
      return
    }
    this.photoErrorMsg = ''
    this.profilePicture = imageFile;
    const reader = new FileReader();
    this.settingsService.updateProfilePhoto(this.profilePicture)
    .subscribe({
      next: (res) => {
        console.log(res);
        reader.onload = (event) => {
          this.newPhotoUploaded = true;
          this.selectedProfilePicture = event.target?.result as string;
        };
        reader.readAsDataURL(this.profilePicture as Blob);               
      }, error: (err) => {
        console.log(err);        
      }
    })
    
  }


}
