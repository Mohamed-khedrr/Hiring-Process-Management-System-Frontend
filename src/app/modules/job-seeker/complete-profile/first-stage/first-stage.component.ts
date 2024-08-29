import { CountryCode } from './../../../../shared/models/common/CountryCode';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompleteProfileService } from '../complete-profile.service';
import { LocationService } from '../../../../shared/services/location.service';
import { JobSeekerBasicInfomation } from '../../../../shared/models/job-seeker/complete-profile/job-seeker-basic-info-model';
import { RetrieveJobSeekerDataService } from '../../retrieve-job-seeker-data.service';

@Component({
  selector: 'app-first-stage',
  templateUrl: './first-stage.component.html',
  styleUrl: './first-stage.component.scss',
})
export class FirstStageComponent implements OnInit {
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);

  locationService = inject(LocationService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  countriesCode: any[] = [];

  // Loaction
  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];
  yearsList: number[] = [];

  // Profile image
  selectedPofileImage: any | undefined;
  selectedPofileImageURL: string | undefined;
  firstStageBasicInfo: JobSeekerBasicInfomation | undefined;
  selectedCountyCode: CountryCode | undefined;
  photoErrorMsg = '';

  // Form
  firstStageForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    day: [0, Validators.required],
    month: [0, Validators.required],
    year: [0, Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: '',
    gender: ['', Validators.required],
    about: [''],
    facebookLink: [''],
    linkedinLink: [''],
    githubLink: [''],
    nationality: ['', Validators.required],
    readyToLocate: [false, Validators.required],
  });

  constructor() {}

  ngOnInit(): void {
    this.loadCountries();
    this.getProfileImageUrl();
    this.getBasicInfo();
    this.yearsList = this.jobSeekerProfileService.yearsList;
    this.getCountriesCode();
  }

  loadStates() {
    // let countryIso2: string = this.country as string;
    let countryIso2: string = this.locationService.getLocationIso(
      this.country as string,
      this.countries
    );
    this.locationService.loadStates(countryIso2).subscribe({
      next: (states) => {
        this.states = states;
        if (this.city) this.loadCities();
      },
      error: (err) => console.error('Error in Getting States', err),
    });
  }

  loadCities() {
    let countryIso2: string = this.locationService.getLocationIso(
      this.country as string,
      this.countries
    );
    // let stateIso2: string = this.state as string;
    let stateIso2: string = this.locationService.getLocationIso(
      this.state as string,
      this.states
    );

    this.locationService.loadCities(countryIso2, stateIso2).subscribe({
      next: (cities: any) => (this.cities = cities),
      error: (err) => console.error('Error in Getting Cities'),
    });
  }

  get firstName() {
    return this.firstStageForm.value?.firstName;
  }

  get lastName() {
    return this.firstStageForm.value?.lastName;
  }
  get birthDay() {
    return this.firstStageForm.value?.day as number;
  }
  get birthMonth() {
    return this.firstStageForm.value?.month as number;
  }
  get birthYear() {
    return this.firstStageForm.value?.year as number;
  }

  get mobileNumber() {
    return this.firstStageForm.value?.mobileNumber;
  }

  get birthDate() {
    const date = new Date(this.birthYear, this.birthMonth - 1, this.birthDay);
    return date.toISOString();
  }

  get country() {
    return this.firstStageForm.controls.country.value;
  }
  get city() {
    return this.firstStageForm.controls.city.value;
  }
  get state() {
    return this.firstStageForm.controls.state.value;
  }

  get gender() {
    return this.firstStageForm.value?.gender;
  }

  get about() {
    return this.firstStageForm.value?.about;
  }

  get facebookLink() {
    return this.firstStageForm.value?.facebookLink;
  }

  get linkedinLink() {
    return this.firstStageForm.value?.linkedinLink;
  }

  get githubLink() {
    return this.firstStageForm.value?.githubLink;
  }

  get nationality() {
    return this.firstStageForm.controls.nationality.value;
  }

  get readyToLocate(): boolean {
    return this.firstStageForm.value?.readyToLocate as boolean;
  }

  getFirstFormInput(formElement: string): AbstractControl | null {
    return this.firstStageForm.get(formElement);
  }

  printLocation() {
    console.log(
      "( ,'" + this.country + "', '" + this.state + "', '" + this.city + "')"
    );
  }

  // Upload Image to Backend
  uploadProfileImage(e: any) {
    const imageFile = <File>e.target.files[0];
    const imageExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!imageExtensions.test(imageFile.name)) {
      this.photoErrorMsg = 'Invalid file type. Please upload an image file.';
      e.target.value = null;
      return;
    } else if (imageFile.size > 2 * 1024 * 1024) {
      this.photoErrorMsg = 'Photo exceeds 2MB Limit.';
      e.target.value = null;
      return;
    }
    this.photoErrorMsg = '';
    this.selectedPofileImage = imageFile;
    this.jobSeekerProfileService
      .uploadPorfileImage(this.selectedPofileImage)
      .subscribe({
        next: (res) => {
          this.getProfileImageUrl();
        },
        error: (err) => console.error('Error on Uploading profile image'),
      });

    // Conver Image to base 64
  }

  savePersonalInfo() {
    let data: JobSeekerBasicInfomation = {
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      // FIX
      mobileNumberCountryCode: this.selectedCountyCode?.phoneCode as string,
      mobileNumber: this.mobileNumber as string,
      birthDate: this.birthDate, // Assuming it's a string formatted as "2024-01-25T19:02:47.098Z"
      livesIn: {
        country: this.country as string,
        state: this.state as string,
        city: this.city as string,
      },
      gender: this.gender as string,
      about: this.about as string,
      facebookLink: this.facebookLink as string,
      linkedinLink: this.facebookLink as string,
      githubLink: this.facebookLink as string,
      readyToRelocate: this.readyToLocate as boolean,
      nationality: this.nationality as string,
    };
    console.log(data);
    this.jobSeekerProfileService.saveBasicInfo(data).subscribe({
      next: (res) => {
        this.router.navigate(['/job-seeker/complete-profile/second']);
      },
      error: (err) => console.log('Error on Saving First Stage', err),
    });
  }

  loadCountries() {
    this.locationService.loadCountries().subscribe({
      next: (res) => {
        this.countries = res;
        if (this.state) this.loadStates();
      },
      error: (err) => console.error('Error in Getting Countries'),
    });
  }

  // Retrieve Profile Image
  getProfileImageUrl() {
    this.retrieveJobSeekerData.getProfileImageUrl().subscribe({
      next: (res) => {
        this.selectedPofileImageURL = res.body as string;
        console.log(this.selectedPofileImageURL);
      },
      error: (err) => {
        console.log('Error on Getting Profile Image ', err);
      },
    });
  }

  // Get First Stage Form data
  getBasicInfo() {
    this.retrieveJobSeekerData.getFirstStageData().subscribe({
      next: (res: any) => {
        this.firstStageBasicInfo = res.body as JobSeekerBasicInfomation;
        console.log(this.firstStageBasicInfo);

        this.fillFormData();
      },
    });
  }

  fillFormData() {
    const birthDate: Date = new Date(
      this.firstStageBasicInfo?.birthDate as string
    );

    this.firstStageForm.patchValue({
      firstName: this.firstStageBasicInfo?.firstName || '',
      lastName: this.firstStageBasicInfo?.lastName || '',
      mobileNumber: this.firstStageBasicInfo?.mobileNumber || '',
      day: birthDate.getDate() || null,
      month: birthDate.getMonth() + 1 || null,
      year: birthDate.getFullYear() || null,
      country: this.firstStageBasicInfo?.livesIn?.country || '',
      state: this.firstStageBasicInfo?.livesIn?.state || '',
      city: this.firstStageBasicInfo?.livesIn?.city || '',
      gender: this.firstStageBasicInfo?.gender || '',
      about: this.firstStageBasicInfo?.about || '',
      facebookLink: this.firstStageBasicInfo?.facebookLink || '',
      linkedinLink: this.firstStageBasicInfo?.linkedinLink || '',
      githubLink: this.firstStageBasicInfo?.githubLink || '',
      nationality: this.firstStageBasicInfo?.nationality || '',
      readyToLocate: this.firstStageBasicInfo?.readyToRelocate || false,
    });
    this.retriveSelectedCountryCode();
    console.log('Form: ', this.firstStageForm);
  }

  saveFirstStage() {
    this.savePersonalInfo();
  }

  getCountriesCode() {
    this.retrieveJobSeekerData.getCountryCodes().subscribe({
      next: (res) => {
        this.countriesCode = res;
        this.retriveSelectedCountryCode();
      },
      error: (err) => {
        console.log('Error in Loading Countries Code');
      },
    });
  }

  retriveSelectedCountryCode() {
    if (
      this.countriesCode.length != 0 &&
      this.firstStageBasicInfo?.mobileNumberCountryCode
    ) {
      this.selectedCountyCode = this.countriesCode.filter(
        (item: CountryCode) =>
          item.phoneCode == this.firstStageBasicInfo?.mobileNumberCountryCode
      )[0];
    }
  }
}
