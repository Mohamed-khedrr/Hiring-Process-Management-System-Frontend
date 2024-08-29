import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompleteProfileService } from '../../complete-profile.service';
import { RetrieveJobSeekerDataService } from '../../../retrieve-job-seeker-data.service';
import { EducationData } from '../../../../../shared/models/job-seeker/complete-profile/education-data';
import { ApiResponse } from '../../../../../shared/models/Api-response';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-job-seeker-education-form',
  templateUrl: './job-seeker-education-form.component.html',
  styleUrl: './job-seeker-education-form.component.scss',
})
export class JobSeekerEducationFormComponent implements OnInit {
  ngOnInit(): void {
    this.getEducationInfo();
    this.yearsList = this.jobSeekerProfileService.yearsList;
  }
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  formBuilder = inject(FormBuilder);
  yearsList: number[] = [];

  isFormVisible: boolean = false;
  isSaveChangesVisible: boolean = false;
  isEducationListLoading: boolean = false;
  educationList: Array<EducationData> | undefined;
  educationLevelValue: string = '';
  editItemId: string = '';

  educationLevelsList: string[] = [
    'Bachelor’s Degree',
    'Master’s Degree',
    'Doctorate Degree',
    'High School',
    'Vocational',
    'Diploma',
  ];
  gradesList: Array<{
    grade: string;
    description: string;
    percentageRange: string;
  }> = [
    { grade: 'A', description: 'Excellent', percentageRange: '85-100%' },
    { grade: 'B', description: 'Very Good', percentageRange: '75-85%' },
    { grade: 'C', description: 'Good', percentageRange: '65-75%' },
    { grade: 'D', description: 'Fair', percentageRange: '50-65%' },
    { grade: '  ', description: 'Not Specified', percentageRange: '' },
  ];

  get studyFieldValue(): string {
    return this.educationForm.value?.studyField as string;
  }

  get institutionValue(): string {
    return this.educationForm.value?.institution as string;
  }

  get startYearValue(): number {
    return this.educationForm.value?.startYear as number;
  }

  get endYearValue(): number {
    return this.educationForm.value?.endYear as number;
  }

  get gradeValue(): string {
    return this.educationForm.value?.grade as string;
  }

  get educationStartDate() {
    return this.jobSeekerProfileService.dataToIso(this.startYearValue, 0, 1);
  }

  get educationEndDate() {
    return this.jobSeekerProfileService.dataToIso(this.endYearValue, 0, 1);
  }

  saveEducationInfo() {
    if (this.educationForm.invalid) return;
    this.isEducationListLoading = true;
    const data: EducationData = {
      degree: this.educationLevelValue,
      institution: this.institutionValue,
      grade: this.gradeValue,
      fieldOfStudy: this.studyFieldValue,
      start: this.educationStartDate,
      end: this.educationEndDate,
    };
    this.jobSeekerProfileService.saveEducationInfo(data).subscribe({
      next: (res: ApiResponse<any>) => {
        this.educationList?.push(res.body);
        this.clearForm();
      },
      error: (err) => console.log('error on saving educcation', err),
      complete: () => {
        this.isEducationListLoading = false;
      },
    });
  }

  // Edcucation Information
  educationForm = this.formBuilder.group({
    // educationLevel: ['', Validators.required],
    studyField: ['', Validators.required],
    institution: ['', Validators.required],
    startYear: [
      0,
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ],
    ],
    endYear: [0, Validators.required],
    grade: ['', Validators.required],
  });

  displayEducationForm() {
    this.isFormVisible = true;
  }

  saveEducationButton() {
    this.saveEducationInfo();
    this.isFormVisible = false;
  }

  saveEducationAndMoreButton() {
    this.saveEducationInfo();
  }

  getEducationInfo() {
    this.isEducationListLoading = true;
    this.retrieveJobSeekerData.getEducationInfo().subscribe({
      next: (res: ApiResponse<any>) => {
        this.educationList = res.body;
        setTimeout(() => {
          this.isEducationListLoading = false;
        }, 500);
      },
      error: (err) => console.log('error on loading education info ', err),
    });
  }
  handleSelectedEducationLevel(option: string) {
    this.educationLevelValue = option;
  }

  deleteEducation(id: string) {
    if (!id) return;
    this.jobSeekerProfileService.deleteEducation(id).subscribe({
      next: (res) => {
        this.educationList = this.educationList?.filter(
          (item) => item.id != id
        );
      },
      error: (err) => console.log('Error in deleting education', err),
    });
  }

  updateEducation() {
    if (this.educationForm.invalid || !this.editItemId) return;
    this.isSaveChangesVisible = false;
    const data: EducationData = {
      id: this.editItemId,
      degree: this.educationLevelValue,
      institution: this.institutionValue,
      grade: this.gradeValue,
      fieldOfStudy: this.studyFieldValue,
      start: this.educationStartDate,
      end: this.educationEndDate,
    };
    this.jobSeekerProfileService.updateEducation(data).subscribe({
      next: (res: ApiResponse<any>) => {
        this.educationList = this.educationList?.filter(
          (item) => item.id != data.id
        );
        this.isFormVisible = false;
        this.clearForm();
        this.getEducationInfo();
      },
      error: (err) => console.log('error on saving education', err),
    });
  }

  scrollToElementById(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  clearForm() {
    this.educationForm.reset();
  }

  scrollToEditForm(element: EducationData) {
    if (!element.id) return;
    this.editItemId = element.id;
    this.educationForm.patchValue({
      endYear: new Date(element.end).getFullYear(),
      startYear: new Date(element.start).getFullYear(),
      grade: element.grade,
      institution: element.institution,
      studyField: element.fieldOfStudy,
    });
    this.educationLevelValue = element.degree;
    this.displayEducationForm();
    this.isSaveChangesVisible = true;

    this.scrollToElementById('education-form-start');
  }
}
