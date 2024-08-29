import { Component, OnInit, inject } from '@angular/core';
import { LocationService } from '../../../../shared/services/location.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompleteProfileService } from '../complete-profile.service';
import { ApiResponse } from '../../../../shared/models/Api-response';
import { SampleDataModel } from '../../../../shared/models/job-seeker/complete-profile/sampleDataModel';
import { RetrieveJobSeekerDataService } from '../../retrieve-job-seeker-data.service';

@Component({
  selector: 'app-third-stage',
  templateUrl: './third-stage.component.html',
  styleUrl: './third-stage.component.scss',
})
export class ThirdStageComponent implements OnInit {
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  locationService = inject(LocationService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  SampleFormVisible = false;

  selectedCvFile: any = null;
  selectedWorkSample: File | undefined;
  isFormVisible = false;
  isCvUploded = false;
  sampleErrorMessage = '';
  cvErrorMessage = '';

  workSamplesList: Array<SampleDataModel> = [];

  yearsOfExperinceList: Array<{ value: string; name: string }> = [
    { value: '0', name: 'No Experience' },
    { value: '1', name: '1 year' },
    { value: '2', name: '2 year' },
    { value: '3', name: '3 year' },
    { value: '4', name: '4 year' },
    { value: '5', name: '5 year' },
    { value: 'more than 5', name: 'More than 5 years' },
  ];

  // Skills
  skillsList: Array<{ name: string }> = [];
  selectedSkills: string[] = [];

  // Professional Information
  professionalInformationForm = this.formBuilder.group({
    yearsOfExperince: ['0', Validators.required],
  });

  // Professional Information
  workSampleForm = this.formBuilder.group({
    samplePhoto: '',
    sampleLink: '',
    sampleTitle: '',
    sampleDescription: '',
  });

  ngOnInit(): void {
    this.getProfessionalInfo();
    this.getCv();
    this.getWrokSamples();
    this.getSkillsList();
  }

  get yearsOfExperinceValue(): string {
    return this.professionalInformationForm.value?.yearsOfExperince as string;
  }

  get sampleLinkValue() {
    return this.workSampleForm.value?.sampleLink as string;
  }
  get sampleTitleValue() {
    return this.workSampleForm.value?.sampleTitle as string;
  }
  get sampleDescriptionValue() {
    return this.workSampleForm.value?.sampleDescription as string;
  }

  // Uploading Files
  uploadCV(e: any) {
    this.selectedCvFile = <File>e.target.files[0];
    if (!this.selectedCvFile.name.endsWith('.pdf')) {
      this.cvErrorMessage = 'Only PDF Files are allowed';
      this.selectedCvFile = null;
      return;
    } else if (this.selectedCvFile.size > 5 * 1024 * 1024) {
      this.cvErrorMessage = 'File exceeds 5MB limit';
      this.selectedCvFile = null;
      return;
    }

    this.jobSeekerProfileService.uploadCV(this.selectedCvFile).subscribe({
      next: (res: ApiResponse<any>) => {
        this.isCvUploded = true;
      },
      error: (err) => console.error('Error on Uploading CV'),
    });
  }

  getSampleFile(e: any) {
    let selectedSampleFile = <File>e.target.files[0];
    const imageExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!imageExtensions.test(selectedSampleFile.name)) {
      this.sampleErrorMessage =
        'Invalid file type. Please upload an image file.';
      e.target.value = null;
      return;
    } else if (selectedSampleFile.size > 5 * 1024 * 1024) {
      this.sampleErrorMessage = 'Photo exceeds 5MB limit.';
      this.workSampleForm.controls.samplePhoto.reset();
      return;
    }
    if (selectedSampleFile) {
      this.sampleErrorMessage = '';
      this.selectedWorkSample = selectedSampleFile;
    }
  }

  saveWorkSample() {
    const data: SampleDataModel = {
      description: this.sampleDescriptionValue || '',
      link: this.sampleLinkValue || '',
      title: this.sampleTitleValue || '',
      photo: this.selectedWorkSample as File,
    };
    this.jobSeekerProfileService.uploadWrokSample(data).subscribe({
      next: (res: ApiResponse<any>) => {
        this.getWrokSamples();
      },
      error: (err) => console.error('Error on Uploading Work', err),
    });
  }

  saveProfessionalInfo() {
    this.jobSeekerProfileService
      .saveProfessionalInfo({
        yearsOfExperience: this.yearsOfExperinceValue,
        skills: this.selectedSkills,
      })
      .subscribe({
        next: (res: ApiResponse<any>) => {
          this.router.navigate(['/job-seeker/jobs/explore'])
        },
        error: (err) => console.error('error on saving professional info', err),
      });

  }

  saveThirdStageData() {
    this.saveProfessionalInfo();
  }

  getProfessionalInfo() {
    this.retrieveJobSeekerData.getProfessionalInfo().subscribe({
      next: (res: ApiResponse<any>) => {
        this.professionalInformationForm.patchValue({
          yearsOfExperince: res.body?.yearsOfExperience || '0',
        });

        this.selectedSkills = res.body?.skills;
      },
      error: (err) => console.error('error on getting professional info', err),
    });
  }

  getCv() {
    this.retrieveJobSeekerData.getCv().subscribe({
      next: (res: ApiResponse<any>) => {
        if (!res.body) return;
        this.isCvUploded = true;
      },
      error: (err) => console.log('error on loading CV info ', err),
    });
  }

  getWrokSamples() {
    this.retrieveJobSeekerData.getWorkSamples().subscribe({
      next: (res: ApiResponse<any>) => {
        this.workSamplesList = res.body as Array<SampleDataModel>;
      },
      error: (err) => console.log('error on loading Samples info ', err),
    });
  }

  getSkillsList() {
    this.retrieveJobSeekerData.getSkillsListLimit(5).subscribe({
      next: (res: { name: string }[]) => {
        this.skillsList = res;
      },
      error(err) {
        console.log('error in getting skills list ', err);
      },
    });
  }

  displayExperienceForm() {
    this.isFormVisible = true;
  }

  removeCv() {
    this.jobSeekerProfileService.removeCV().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.isCvUploded = false;
  }

  goBackPrivStage() {
    this.router.navigate(['/job-seeker/complete-profile/second']);
  }

  showDialog() {
    this.SampleFormVisible = !this.SampleFormVisible;
  }
  closeDialog() {
    this.SampleFormVisible = false;
  }

  saveSample() {
    this.closeDialog();
    this.saveWorkSample();
    this.workSampleForm.reset();
  }

  handleSelectedSkills(e: string[]) {
    this.selectedSkills = e;
  }

  searchSkills(element: any) {
    this.retrieveJobSeekerData.getskillsBySearch(element).subscribe({
      next: (res: { name: string }[]) => {
        this.skillsList = res;
      },
      error: (err) => console.error('wrong in loading skills by search', err),
    });
  }

  filterSkills(value: any) {
    if (!value) return;
    this.searchSkills(value);
  }

  deleteSample(sampleId: any) {
    this.jobSeekerProfileService.deleteWorkSample(sampleId).subscribe({
      next: (res) => {
        this.workSamplesList = this.workSamplesList.filter(
          (item) => item?.id != sampleId
        );
      },
      error(err) {
        console.log('Error in deleting work sample');
      },
    });
  }
}
