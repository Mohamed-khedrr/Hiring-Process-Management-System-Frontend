import { Component, OnInit } from '@angular/core';
import { IndustryService } from '../../../../shared/services/industry.service';
import { Industry } from '../../../../shared/models/common/Industry';
import { RetrieveJobSeekerDataService } from '../../../job-seeker/retrieve-job-seeker-data.service';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from '../job-post.service';
import { TokenService } from '../../../../shared/services/token.service';

export function salaryRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minSalary = control.get('minSalary')?.value;
    const maxSalary = control.get('maxSalary')?.value;

    return maxSalary < minSalary ? { salaryRange: true } : null;
  };
}
export function experienceRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minExperienceYears = Number(control.get('minExperienceYears')?.value);
    const maxExperienceYears = Number(control.get('maxExperienceYears')?.value);

    console.log(`Min Experience Years: ${minExperienceYears}, Max Experience Years: ${maxExperienceYears}`);

    if (minExperienceYears !== null && maxExperienceYears !== null) {
      return maxExperienceYears < minExperienceYears ? { experienceRange: true } : null;
    }
    return null;
  };
}

@Component({
  selector: 'app-job-post-first-stage',
  templateUrl: './job-post-first-stage.component.html',
  styleUrl: './job-post-first-stage.component.scss'
})
export class JobPostFirstStageComponent implements OnInit {

  initJobPostForm !: FormGroup;
  id: any;
  industries !: Industry[];
  jobCatergories: any = [];
  currencies: Array<{ name: string; code: string; symbol: string }> = [];
  edit: boolean = false;
  isDraft = true;

  // Skills
  skillsList: Array<{ name: string }> = [];
  selectedSkills: string[] = [];

    
  constructor(private industryService: IndustryService,
    private jobPostService: JobPostService,
    private retrieveJobSeekerData: RetrieveJobSeekerDataService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private fb: FormBuilder, public router: Router) {

    this.initJobPostForm = this.fb.group({
      id: [''],
      jobTitle: ['', Validators.required],
      jobType: ['', Validators.required],
      employmentType: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      minExperienceYears: [0, [Validators.min(0)]],
      maxExperienceYears: [0, [Validators.min(0)]],
      jobName: ['', Validators.required],
      minSalary: [0, [Validators.min(0)]],
      maxSalary: [0, [Validators.min(0)]],
      industryId: ['', Validators.required],
      currency: [''],
      benefits: ['']
    }, {
      validators: [salaryRangeValidator(), experienceRangeValidator()]
    });
  }

  ngOnInit(): void {
    this.getAllIndustries();
    this.loadJobNames();
    this.getCurrencies();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        console.log(this.id);
        this.edit = true;
        this.getJobPost(this.id);
      }
    });
  }



  getJobPost(jobPostId: any) {
    this.jobPostService.getJobPostInitInfo(jobPostId).subscribe({
      next: res => {
        console.log(res)
        if (res.ok) {
          this.initJobPostForm.patchValue({
            id: res.body.id,
            jobTitle: res.body.jobTitle,
            jobType: res.body.jobType,
            employmentType: res.body.employmentType,
            description: res.body.description,
            requirements: res.body.requirements,
            minExperienceYears: res.body.minExperienceYears,
            maxExperienceYears: res.body.maxExperienceYears,
            jobName: res.body.jobName.name,
            minSalary: res.body.minSalary,
            maxSalary: res.body.maxSalary,
            industryId: res.body.industry.id,
            currency: res.body.currency,
            benefits: res.body.benefits
          });
          this.isDraft = res.body.draft;
          this.selectedSkills = res.body.skills;
        } else {
          this.router.navigate(['/error/404'])
        }
      },
      error: err => {
        this.router.navigate(['/error/404'])
      }
    });
  }

  saveAndContinue(): void {
    if (this.edit) {
      this.updateJobPost();
    } else {
      this.saveJobPost();
    }
  }

  goToAdvanced() {
    if (this.edit) {
      this.router.navigate(["/company/job-posts/setting/", this.id])
    }
  }



  cancel() {
    this.saveJobPost();
    this.router.navigate(['company/dashboard-page']);
  }

  updateJobPost() {
    console.log("Edit")
    console.log(this.initJobPostForm);
    this.logFormControlErrors(this.initJobPostForm);
    if (this.initJobPostForm.valid) {
      console.log(this.initJobPostForm.value);
      const formValue = {...this.initJobPostForm.value , skills : this.selectedSkills};
      this.jobPostService.updateInitInfo(formValue).subscribe({
        next: res => {
          console.log(res);
          const id = res.body?.id;
          console.log(id);
          if (res.ok) {
            this.router.navigate(['/company/job-posts/setting', id])
          } else {
            this.router.navigate(['/error/404'])
          }
        },
        error: err => {
          this.router.navigate(['/error/404'])
        }
      })
    } else {
      this.markAllInputsAsTouched();
    }
  }

  logFormControlErrors(form: FormGroup) {
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.controls[controlName];
        console.log(`Control: ${controlName}, Status: ${control.status}, Errors: `, control.errors);
      }
    }
  }

  saveJobPost() {
    console.log(this.initJobPostForm.valid);
    console.log(this.initJobPostForm);

    if (this.initJobPostForm.valid) { 
      const formValue = {...this.initJobPostForm.value , skills : this.selectedSkills};
      console.log(formValue);
      this.jobPostService.sendJobPost(formValue).subscribe({
        next: res => {
          console.log(res);
          const id = res.body?.id;
          console.log(id)
          if (res.ok) {
            this.router.navigate(['/company/job-posts/setting', id])
          }
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      this.markAllInputsAsTouched();
    }
  }

  markAllInputsAsTouched() {
    Object.keys(this.initJobPostForm.controls).forEach(key => {
      this.initJobPostForm.controls[key].markAsTouched();
    });
  }

  getCurrencies() {
    this.currencyService.getAllCurrencies().subscribe(res => {
      this.currencies = res;
    });
  }

  getAllIndustries() {
    this.industryService.getIndustries().subscribe(res => {
      console.log(res);
      this.industries = res.body;
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

  deleteJob() {
    this.jobPostService.deleteNewJob(this.id).subscribe(res => {
      if (res.ok) {
        this.router.navigate(['/company/job-posts'])
      }
    });
  }

  filterSkills(value: any) {
    if (!value) return;
    this.searchSkills(value);
  }

  handleSelectedSkills(e: string[]) {
    console.log(e);
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

}
