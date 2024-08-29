import { Component, OnInit, inject } from '@angular/core';
import { CompleteProfileService } from '../complete-profile.service';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { CareerInterestDataModel } from '../../../../shared/models/job-seeker/complete-profile/career-interest-data-model';
import { RetrieveJobSeekerDataService } from '../../retrieve-job-seeker-data.service';

@Component({
  selector: 'app-second-stage',
  templateUrl: './second-stage.component.html',
  styleUrl: './second-stage.component.scss',
})
export class SecondStageComponent implements OnInit {
  retrievedData!: CareerInterestDataModel | undefined;

  // Variables
  currencyService = inject(CurrencyService);
  formBuilder = inject(FormBuilder);
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  router = inject(Router);
  currencies: Array<{ name: string; code: string; symbol: string }> = [];
  selectedCategories!: string[];
  selectedJobTypes: string[] = [];
  careerLevel = '';
  jobStatus = '';
  selectedJobsTypes = [];
  carrerLevels: string[] = [
    'Intern',
    'Fresh',
    'Junior',
    'Senior',
    'MidSenior',
    'TechLead',
    'Director',
    'Executive',
    'Partner',
    'Owner',
    'Manager',
  ];

  jobCatergories: Array<{ name: string }> = [];

  jobStatusList: string[] = [
    'Open for immediate hiring',
    'Has work but looking for good opportunities only',
    'Interested in very specific opportunities',
    'Not looking for a job',
  ];

  jobTypes: string[] = [
    'Shift Based',
    'Volunteering',
    'Work From Home',
    'Student Activity',
    'Full Time',
    'Part Time',
    'Freelance/Project',
    'Internship',
  ];

  // ===================

  constructor() {}

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadJobNames();
    this.retrieveJobSeekerData.getSecondStageData().subscribe({
      next: (res) => {
        this.retrievedData = res.body;
        this.retrieveSelectedData();
      },
      error: (err) => console.log('error on retriveing second stage data', err),
    });
  }

  ngOnDestroy(): void {}

  loadCurrencies() {
    this.currencyService.getAllCurrencies().subscribe({
      next: (res: any) => {
        this.currencies = res;
        this.currencies.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => console.error('wrong in loading currincies', err),
    });
  }

  loadJobNames() {
    this.retrieveJobSeekerData.getJobNamesByLimit(100).subscribe({
      next: (res: any) => {
        this.jobCatergories = res.map((item: any) => {
          return { name: item.name };
        });
      },
      error: (err) => console.error('wrong in loading job catergories', err),
    });
  }

  searchJobs(element: any) {
    this.retrieveJobSeekerData.getJobNamesBySearch(element).subscribe({
      next: (res: any) => {
        this.jobCatergories = res.map((item: any) => {
          return { name: item.name };
        });
      },
      error: (err) =>
        console.error('wrong in loading job catergories by search', err),
    });
  }

  // FORM BULDER AND GIT METHODS
  secondStageForm = this.formBuilder.group({
    // string
    minimumSalaryValue: '',
    minimumSalaryCurrency: '',

    // Boolean values
    showMinimumSalary: new FormControl(false),
    openToSuggest: [true, Validators.required],
    searchable: [false, Validators.required],
  });

  get minimumSalaryValue() {
    return this.secondStageForm.value.minimumSalaryValue;
  }
  get minimumSalaryCurrency() {
    return this.secondStageForm.value.minimumSalaryCurrency;
  }
  get showMinimumSalary() {
    return !this.secondStageForm.value.showMinimumSalary;
  }

  get openToSuggest() {
    return this.secondStageForm.value.openToSuggest;
  }
  get searchable() {
    return this.secondStageForm.value.searchable;
  }

  getSecondFormInput(formElment: string): AbstractControl | null {
    return this.secondStageForm.get(formElment);
  }

  // ============================

  // Save Second Stage Data and go to the Third stage
  saveData() {
    let data: CareerInterestDataModel = {
      careerLevel: this.careerLevel as string,
      minimumSalaryValue: this.minimumSalaryValue as string,
      minimumSalaryCurrency: this.minimumSalaryCurrency as string,
      showMinimumSalary: this.showMinimumSalary as boolean,
      jobsTypesUserInterestedIn: this.selectedJobTypes,
      jobsUserInterestedIn: this.selectedCategories,
      jobStatus: this.jobStatus as string,
      openToSuggest: this.openToSuggest as boolean,
      searchable: this.searchable as boolean,
    };
    console.log(data.careerLevel);
    

    this.jobSeekerProfileService.saveCareerInterest(data).subscribe({
      next: (res) => {
        this.router.navigate(['/job-seeker/complete-profile/third']);
      },
      error: (err) => console.log('Error on saving second statge', err),
    });
  }

  retrieveSelectedData() {
    this.retriveFormValues();
    this.retriveSelectedJobTypes();
    this.retriveSelectedCategories();
  }

  handleSelectedCategories(e: string[]) {
    this.selectedCategories = e;
  }

  retriveFormValues() {
    this.secondStageForm.patchValue({
      minimumSalaryValue: this.retrievedData?.minimumSalaryValue || null,
      minimumSalaryCurrency: this.retrievedData?.minimumSalaryCurrency || null,
      showMinimumSalary: !this.retrievedData?.showMinimumSalary || false,
      openToSuggest: this.retrievedData?.openToSuggest || false,
      searchable: this.retrievedData?.searchable || false,
    });
    this.jobStatus = this.retrievedData?.jobStatus || '';
    this.careerLevel = this.retrievedData?.careerLevel || '';
  }

  goBackPrivStage() {
    this.router.navigate(['/job-seeker/complete-profile/first']);
  }

  handleSelectedCareerLevel(option: any) {
    this.careerLevel = option;
  }
  handleSelectedJobStatus(option: any) {
    this.jobStatus = option;
  }

  handleSelectedJobsTypes(e: any) {
    this.selectedJobTypes = e;
  }

  retriveSelectedJobTypes() {
    this.selectedJobTypes = this.retrievedData?.jobsTypesUserInterestedIn || [];
  }

  retriveSelectedCategories() {
    this.selectedCategories = this.retrievedData?.jobsUserInterestedIn || [];
    console.log(this.selectedCategories);
  }
}
