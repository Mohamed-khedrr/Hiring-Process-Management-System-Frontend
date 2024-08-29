import { CertificateData } from './../../../../../shared/models/job-seeker/complete-profile/certificateData';
import { Component, inject } from '@angular/core';
import { RetrieveJobSeekerDataService } from '../../../retrieve-job-seeker-data.service';
import { CompleteProfileService } from '../../complete-profile.service';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { ApiResponse } from '../../../../../shared/models/Api-response';
import { PublicPipesSharedModuleModule } from "../../../../../shared/pipes/public-pipes/public-pipes-shared-module.module";

@Component({
    selector: 'app-job-seeker-certificate-form',
    standalone: true,
    templateUrl: './job-seeker-certificate-form.component.html',
    styleUrl: './job-seeker-certificate-form.component.scss',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, PublicPipesSharedModuleModule]
})
export class JobSeekerCertificateFormComponent {
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  formBuilder = inject(FormBuilder);

  yearsList: number[] = this.jobSeekerProfileService.yearsList;
  monthsList: Array<number> = this.jobSeekerProfileService.monthsList;
  certificateList: Array<CertificateData> | undefined;
  editItemId: string = '';
  isFormVisible: boolean = false;
  isSaveChangesVisible: boolean = false;
  isCertificateListLoading: boolean = false;

  certificateForm = this.formBuilder.group({
    title: ['', Validators.required],
    org: ['', Validators.required],
    month: [
      0,
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    year: [
      0,
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ],
    ],
  });

  constructor() {
    this.getCertifactesData();
  }

  get certificateTitleValue(): string {
    return this.certificateForm.value.title || '';
  }
  get certificateOrgValue(): string {
    return this.certificateForm.value.org || '';
  }
  get certificateMonthValue(): number {
    return this.certificateForm.value.month || 0;
  }
  get certificateYearValue(): number {
    return this.certificateForm.value.year || 0;
  }

  clearForm() {
    this.certificateForm.reset();
  }

  displayCertificateForm() {
    this.isFormVisible = true;
  }

  saveCertificateButton() {
    this.saveCertificate();
    this.isFormVisible = false;
  }

  saveCertificateAndMoreButton() {
    this.saveCertificate();
  }

  scrollToElementById(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToEditForm(element: CertificateData) {
    if (!element.id) return;
    this.editItemId = element.id;
    this.certificateForm.patchValue({
      title: element.title,
      org: element.organization,
      month: Number.parseInt(element.month),
      year: Number.parseInt(element.year),
    });
    this.displayCertificateForm();
    this.isSaveChangesVisible = true;

    this.scrollToElementById('certificate-form-start');
  }

  saveCertificate() {
    const data: CertificateData = {
      title: this.certificateTitleValue,
      organization: this.certificateOrgValue,
      month: this.certificateMonthValue.toString(),
      year: this.certificateYearValue.toString(),
    };

    this.jobSeekerProfileService.saveCertificate(data)
    .subscribe({
      next: (res) => {
        this.certificateList?.push(res.body);
        this.clearForm();
      }, 
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.isCertificateListLoading = false;
      },
    })
  }

  updateCertificate() {
    if (this.certificateForm.invalid || !this.editItemId) return;
    this.isSaveChangesVisible = false;
    const data: CertificateData = {
      id: this.editItemId,
      title: this.certificateTitleValue,
      organization: this.certificateOrgValue,
      month: this.certificateMonthValue.toString(),
      year: this.certificateYearValue.toString(),
    };
    this.jobSeekerProfileService.updateCertificate(data).subscribe({
      next: (res: ApiResponse<any>) => {
        this.certificateList = this.certificateList?.filter(
          (item) => item.id != data.id
        );
        this.isFormVisible = false;
        this.clearForm();
        this.getCertifactesData();
      },
      error: (err) => console.log('error on saving certificate', err),
    });
  }

  getCertifactesData() {
    this.retrieveJobSeekerData.getCertficates().subscribe({
      next: (res: ApiResponse<any>) => {
        this.certificateList = res.body;        
        setTimeout(() => {
          this.isCertificateListLoading = false;
        }, 500);
      },
      error: (err) => {
        console.log('error in getting certificates ', err);
      },
    });
  }

  deleteCertificate(id: string) {
    if (!id) return;
    this.jobSeekerProfileService.deleteCertificate(id).subscribe({
      next: (res) => {
        this.certificateList = this.certificateList?.filter(
          (item) => item.id != id
        );
      },
      error: (err) => console.log('Error in deleting certificate', err),
    });
  }
}
