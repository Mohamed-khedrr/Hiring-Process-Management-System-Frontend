import { Component, OnInit, inject } from '@angular/core';
import { ExperienceDataModel } from '../../../../../shared/models/job-seeker/complete-profile/experience-data-model';
import { RetrieveJobSeekerDataService } from '../../../retrieve-job-seeker-data.service';
import { CompleteProfileService } from '../../complete-profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from '../../../../../shared/models/Api-response';

@Component({
  selector: 'app-job-seeker-experience-form',
  templateUrl: './job-seeker-experience-form.component.html',
  styleUrl: './job-seeker-experience-form.component.scss',
})
export class JobSeekerExperienceFormComponent implements OnInit {
  ngOnInit(): void {
    this.isSaveChangesVisible = false;
    this.getExperienceInfo();
    this.yearsList = this.jobSeekerProfileService.yearsList;
    this.monthsList = this.jobSeekerProfileService.monthsList;
  }
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  formBuilder = inject(FormBuilder);
  experienceList: Array<ExperienceDataModel> | undefined;
  isFormVisible = false;
  isExperienceFormLoading: boolean = false;
  isSaveChangesVisible!: boolean;
  editItemId: string = '';
  yearsList: number[] = [];
  monthsList: Array<number> = [];
  experienceTypeValue: string = '';

  experienceTypeList: string[] = [
    'Full Time',
    'Part Time',
    'Freelance',
    'Internship',
    'Volunteering',
    'Student Activity',
  ];

  jobCategoryList: Array<{ name: string }> = [
    { name: 'Software Development' },
    { name: 'Data Science' },
    { name: 'Web Development' },
    { name: 'UI/UX Design' },
    { name: 'Digital Marketing' },
    { name: 'Cybersecurity' },
    { name: 'Cloud Computing' },
    { name: 'Mobile App Development' },
    { name: 'Project Management' },
    { name: 'Business Analysis' },
  ];

  // Experience Information
  experienceForm = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    companyName: ['', Validators.required],
    jobCategory: ['', Validators.required],
    startYear: [
      '0',
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ],
    ],
    startMonth: [
      '0',
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    endYear: ['0', [Validators.max(new Date().getFullYear())]],
    endMonth: ['0', [Validators.max(12)]],
    aboutExperience: ['', Validators.required],
    stillWorkThere: false,
  });
  get jobTitleValue(): string {
    return this.experienceForm.value?.jobTitle as string;
  }
  get stillWorkThereValue(): boolean {
    return this.experienceForm.value?.stillWorkThere as boolean;
  }

  get companyNameValue(): string {
    return this.experienceForm.value?.companyName as string;
  }

  get jobCategoryValue(): string {
    return this.experienceForm.value?.jobCategory as string;
  }

  get startYearValue(): string {
    return this.experienceForm.value?.startYear as string;
  }

  get startMonthValue(): string {
    return this.experienceForm.value?.startMonth as string;
  }

  get endYearValue(): string {
    return this.experienceForm.value?.endYear as string;
  }

  get endMonthValue(): string {
    return this.experienceForm.value?.endMonth as string;
  }

  get aboutExperience(): string {
    return this.experienceForm.value?.aboutExperience as string;
  }

  saveExperiencenInfo() {
    // Don't Save if Form is invalid
    if (this.experienceForm.invalid) return;
    this.isExperienceFormLoading = true;
    const data: ExperienceDataModel = {
      name: this.jobTitleValue,
      place: this.companyNameValue,
      about: this.aboutExperience,
      jobCategory: this.jobCategoryValue,
      jobType: this.experienceTypeValue,
      startMonth: this.startMonthValue,
      startYear: this.startYearValue,
      endMonth: this.endMonthValue,
      endYear: this.endYearValue,
    };
    console.log(data);
    this.jobSeekerProfileService.saveExperience(data).subscribe({
      next: (res: ApiResponse<any>) => {
        console.log('education saved');
        this.experienceList?.push(res.body);
      },
      error: (err) => console.log('error on saving educcation', err),
      complete: () => {
        this.isExperienceFormLoading = false;
      },
    });
  }

  getExperienceInfo() {
    this.isExperienceFormLoading = true;
    this.retrieveJobSeekerData.getExperience().subscribe({
      next: (res: ApiResponse<any>) => {
        console.log('Experience Loaded');
        this.experienceList = res.body;
        setTimeout(() => {
          this.isExperienceFormLoading = false;
        }, 500);
      },
      error: (err) => console.log('error on loading Experience info ', err),
    });
  }

  saveExperienceAndMoreButton() {
    this.saveExperiencenInfo();
    this.experienceForm.reset();
  }
  saveExperienceButton() {
    this.saveExperienceAndMoreButton();
    this.isFormVisible = false;
  }
  calcNumberOfYears(
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string
  ) {
    const years = Math.floor(
      Number(endYear) -
        Number(startYear) +
        (Number(endMonth) - Number(startMonth)) / 12
    );

    return years > 0 ? `${years} years` : `less than a year`;
  }

  displayExperienceForm() {
    this.isFormVisible = true;
  }
  handelSelectedExperienceValue(option: string) {
    this.experienceTypeValue = option;
  }

  deleteExperience(id: string) {
    this.jobSeekerProfileService.deleteExperience(id).subscribe({
      next: (res) => {
        this.experienceList = this.experienceList?.filter(
          (item) => item.id != id
        );
        console.log('experience deleted', res);
      },
      error(err) {
        console.log('error in deleting experience', err);
      },
    });
  }

  updateExperience() {
    if (this.experienceForm.invalid || !this.editItemId) return;
    this.isSaveChangesVisible = false;
    const data: ExperienceDataModel = {
      id: this.editItemId,
      name: this.jobTitleValue,
      place: this.companyNameValue,
      about: this.aboutExperience,
      jobCategory: this.jobCategoryValue,
      jobType: this.experienceTypeValue,
      startMonth: this.startMonthValue,
      startYear: this.startYearValue,
      endMonth: this.endMonthValue,
      endYear: this.endYearValue,
    };
    console.log('Updating', data);
    this.jobSeekerProfileService.updateExperience(data).subscribe({
      next: (res: ApiResponse<any>) => {
        this.experienceList = this.experienceList?.filter(
          (item) => item.id != data.id
        );
        this.isFormVisible = false;
        this.clearForm();
        this.getExperienceInfo();
      },
      error: (err) => console.log('error on saving educcation', err),
    });
  }

  clearForm() {
    this.experienceForm.reset();
  }

  scrollToElementById(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToEditForm(element: ExperienceDataModel) {
    if (!element.id) return;
    this.editItemId = element.id;
    this.experienceForm.patchValue({
      aboutExperience: element.about,
      companyName: element.place,
      endMonth: element.endMonth,
      endYear: element.endYear,
      jobCategory: element.jobCategory,
      jobTitle: element.name,
      startMonth: element.startMonth,
      startYear: element.startYear,
      stillWorkThere:
        element.endMonth != '0' || element.endYear != '0' ? false : true,
    });

    this.experienceTypeValue = element.jobType;
    this.displayExperienceForm();
    this.isSaveChangesVisible = true;

    this.scrollToElementById('experience-form-start');
  }
}
