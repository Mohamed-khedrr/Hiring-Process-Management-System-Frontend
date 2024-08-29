import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Token } from '@angular/compiler';
import { RecruiterRegisterRequest } from '../../../../shared/models/recruiter/recruiter-register-request';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CountryCode } from '../../../../shared/models/common/CountryCode';
import { CompleteProfileService } from '../../../job-seeker/complete-profile/complete-profile.service';
import { RetrieveJobSeekerDataService } from '../../../job-seeker/retrieve-job-seeker-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recruiter-register',
  templateUrl: './recruiter-register.component.html',
  styleUrl: './recruiter-register.component.scss'
})
export class RecruiterRegisterComponent {

  formBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService: AuthService = inject(AuthService);
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService)
  destoryRef = inject(DestroyRef);

  token = '';
  recruiterPhoto = new File([],'')
  recruiterPhotoUrl = ''
  countriesCode: any[] = [];
  selectedCountyCode: CountryCode | undefined;
  errorMsg = ''
  photoErrorMsg = '';
  passwordType = 'password';
  
  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.getCountriesCode()
  }
  

  recruiterInfo = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    countryCode: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
    confirmPass: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  })

  get firstName() {
    return this.recruiterInfo.controls.firstName
  }

  get lastName() {
    return this.recruiterInfo.controls.lastName
  }

  get countryCode() {
    return this.recruiterInfo.controls.countryCode
  }

  get phoneNumber() {
    return this.recruiterInfo.controls.phoneNumber
  }

  get password() {
    return this.recruiterInfo.controls.password
  }

  get confirmPass() {
    return this.recruiterInfo.controls.confirmPass
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
    this.recruiterPhoto = imageFile;
    const reader = new FileReader();
    reader.onload = (event) => {
      this.recruiterPhotoUrl = event.target?.result as string;
    };
    reader.readAsDataURL(this.recruiterPhoto as Blob);  
  }

  getFirstFormInput(formElment: string): AbstractControl | null {
    return this.recruiterInfo.get(formElment);
  }

  updateCountryCode(){
    this.recruiterInfo.controls.countryCode.patchValue(this.selectedCountyCode?.phoneCode || null)    
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

  registerRecruiter(){
        
    const recruiterData: RecruiterRegisterRequest = {
      firstName: this.firstName.value as string,
      lastName: this.lastName.value as string,
      countryCode: this.selectedCountyCode?.phoneCode as string,
      phoneNumber: this.phoneNumber.value as string,
      password: this.password.value as string,
      token: this.token
    }
    console.log(this.recruiterPhoto)
    return this.authService.registerRecruiter(this.recruiterPhoto, recruiterData)
    .subscribe({
      next: (res) => {
        if(res.status == '200'){
          console.log(res);
          this.router.navigate(['/auth/login/employer'])
        }
        else {
          console.log(res);
          this.errorMsg = res.message
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = err.message
      },
    })
  }

  getCountriesCode() {
    this.retrieveJobSeekerData.getCountryCodes().subscribe({
      next: (res) => {
        this.countriesCode = res;
      },
      error: (err) => {
        console.log('Error in Loading Countries Code');
      },
    });
  }


}
