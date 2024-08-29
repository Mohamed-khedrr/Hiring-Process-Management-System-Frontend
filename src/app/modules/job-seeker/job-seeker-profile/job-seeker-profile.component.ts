import { OwlOptions } from 'ngx-owl-carousel-o';
import { EducationData } from '../../../shared/models/job-seeker/complete-profile/education-data';
import { ExperienceDataModel } from '../../../shared/models/job-seeker/complete-profile/experience-data-model';
import { LanguageData } from '../../../shared/models/job-seeker/complete-profile/language-data';
import { SampleDataModel } from '../../../shared/models/job-seeker/complete-profile/sampleDataModel';
import { LocationService } from './../../../shared/services/location.service';
import { RetrieveJobSeekerDataService } from './../retrieve-job-seeker-data.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateData } from '../../../shared/models/job-seeker/complete-profile/certificateData';
import { AllJobseekerProfileInfo } from '../../../shared/models/job-seeker/all-jobseeker-profile-info';
import { UserDataService } from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-job-seeker-profile',
  templateUrl: './job-seeker-profile.component.html',
  styleUrl: './job-seeker-profile.component.scss',
})
export class JobSeekerProfileComponent implements OnInit {
  dataRetriver = inject(RetrieveJobSeekerDataService);
  locationService = inject(LocationService);
  userDataService = inject(UserDataService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  @Input() profileData!: AllJobseekerProfileInfo | null;
  @Input() userId: string = '';

  selectedProfileImageUrl: string = '';
  userLanguages: Array<LanguageData> | undefined;
  userEducationList: Array<EducationData> | undefined;
  userExperienceList: Array<ExperienceDataModel> | undefined;
  userWorkSamples: Array<SampleDataModel> | undefined;
  certficatesList: Array<CertificateData> | undefined;

  minimizedExperienceList: Array<ExperienceDataModel> | undefined;
  CV: string | undefined;
  isProfileOwner: boolean = true;

  customOptions: OwlOptions = {
    loop: false,
    margin: 10,
    navText: ['&#8249', '&#8250;'],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.setProfileData();
    this.checkIfProfileOwner();
    this.controlExperienceNumber('min');
  }

  setProfileData() {
    if (!this.profileData) {
      this.profileData = this.route.snapshot.data['jobSeekerProfileInfo'].body;
      this.userId = this.route.snapshot.params['userId'];
    }
    this.userLanguages = this.profileData?.languages;

    this.userEducationList = this.profileData?.educations;
    this.userExperienceList = this.profileData?.jobExperiences;
    this.certficatesList = this.profileData?.certificates;

    this.selectedProfileImageUrl = this.profileData!.profilePhoto;
    this.CV = this.profileData?.cv;

    this.getWorkSamplesById(this.userId);
  }

  checkIfProfileOwner() {
    let profileId = this.userId;
    this.userDataService.checkIsProfileOwner(profileId).subscribe({
      next: (res) => {
        this.isProfileOwner = res.body;
      },
      error: (err) => {
        console.log('Error on checking  if user is owner of the profile ', err);
      },
    });
  }

  calculateAge(date: string) {
    if (!date) return;
    const birthDate = new Date(date);
    let ageDifMs = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getWorkSamplesById(userId: string) {
    this.dataRetriver.getWorkSamplesByUserId(userId).subscribe({
      next: (res) => {
        this.userWorkSamples = res.body;
      },
      error: (err) => console.log('error in getting work samples', err),
    });
  }

  controlExperienceNumber(minmization: string) {
    if (minmization == 'full' && this.userExperienceList) {
      this.minimizedExperienceList = [...this.userExperienceList];
    } else {
      this.minimizedExperienceList = this.userExperienceList?.slice(0, 2);
    }
  }

  //  =========== ROUTING TO EDIT DATA ===========
  editBasicInfo() {
    this.router.navigate(['/job-seeker/complete-profile/first'], {
      fragment: '',
    });
  }
  addEducation() {
    this.router.navigate(['/job-seeker/complete-profile/first'], {
      fragment: 'add-education-btn',
    });
  }

  editLanguages() {
    this.router.navigate(['/job-seeker/complete-profile/third'], {
      fragment: 'languages-list',
    });
  }

  editSalary() {
    this.router.navigate(['/job-seeker/complete-profile/second'], {
      fragment: 'salary-start',
    });
  }

  editExperience() {
    this.router.navigate(['/job-seeker/complete-profile/third'], {
      fragment: 'add-experience-btn',
    });
  }
  editWorkSamples() {
    this.router.navigate(['/job-seeker/complete-profile/third'], {
      fragment: 'work-sampels-list',
    });
  }

  editCertificates() {
    this.router.navigate(['/job-seeker/complete-profile/first'], {
      fragment: 'certificates-form',
    });
  }

  // ======================
}
