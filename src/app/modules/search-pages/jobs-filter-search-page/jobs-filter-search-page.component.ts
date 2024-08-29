import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { SearchService } from '../../../shared/services/search.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '../../../shared/services/location.service';
import { IndustryService } from '../../../shared/services/industry.service';
import { UserDataService } from '../../../shared/services/user-data.service';
import { TokenService } from '../../../shared/services/token.service';
import { JobPostService } from '../../company/job-posts/job-post.service';

@Component({
  selector: 'app-jobs-filter-search-page',
  templateUrl: './jobs-filter-search-page.component.html',
  styleUrl: './jobs-filter-search-page.component.scss'
})
export class JobsFilterSearchPageComponent implements OnInit {
  keyword !: string;
  isLoading = false;
  searchPage: any;
  jobsList: Array<any> = [];
  industries !: any;
  page = 0;
  size = 5;
  jobsFilterForm !: FormGroup;
  // form controls 
  employmentTypeControl = new FormControl('');
  experienceControl = new FormControl('');
  educationLevelControl = new FormControl('');
  locationControl = new FormControl('');
  currencyControl = new FormControl('');
  jobTypeControl = new FormControl('');
  isLogin: any;
  salary: number = 0;

  jobTypes: string[] = [
    "On Site", "Hybrid", "Remote"
  ]

  employmentTypes: string[] = [
    "Part Time",
    "Full Time",
    "Casual",
    "Contract",
    "Commission",
    "Self Employed",
    "Temporary",
    "Freelance",
    "Internship"
  ];

  experienceItems: string[] = [
    "0-2 years",
    "3-4 years",
    "5-7 years",
    "8-10 years",
    "11-12 years",
    "13-15 years",
    "+15 years"
  ];

  educationLevels: string[] = [
    'Not Specified',
    'High School',
    'Vocational',
    'Diploma',
    'Bachelor’s Degree',
    'Master’s Degree',
    'Doctorate Degree'
  ];

  currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "CNY",
    "SEK",
    "NZD"
  ];

  countriesList: string[] = [
    'Saudi Arabia',
    'United Arab Emirates',
    'Egypt',
    'United States',
    'United Kingdom',
    'China',
    'France',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'Mexico',
    'Russia',
    'Morocco',
    'Algeria',
    'Qatar',
    'Kuwait',
    'Jordan',
    'Lebanon',
    'Oman'
  ];


  constructor(private locationService: LocationService, private jobPostService: JobPostService,
    private route: ActivatedRoute, private fb: FormBuilder, private tokenService: TokenService,
    private router: Router, private industryService: IndustryService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.isLogin = this.tokenService.isLoggedIn();
    // intilize keyword
    this.route.queryParams.subscribe(prams => {
      this.keyword = prams['keyword'];
    });

    // init
    this.createSearchForm();
    this.getAllIndustries();

    // get data form resolver
    this.route.data.subscribe((res: any) => {
      this.searchPage = res.searchData.body;
      this.jobsList = res.searchData.body.content;
    });

    // if keyword Changed keyword change 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.keyword = this.router.routerState.snapshot.root.queryParams['keyword'];
        this.search();
      }
    });

    // recive form emit 
    this.jobsFilterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        console.log(value)
        this.search();
      });
  }

  createSearchForm() {
    this.jobsFilterForm = this.fb.group({
      keyword: this.keyword,
      jobType: this.jobTypeControl,
      industry: [''],
      employmentType: this.employmentTypeControl,
      experience: this.experienceControl,
      educationLevel: this.educationLevelControl,
      location: this.locationControl,
      currency: this.currencyControl,
      minSalary: [this.salary == 0 ? null : this.salary],
    });
  }

  getAllIndustries() {
    this.industryService.getIndustries().subscribe(res => {
      this.industries = res.body;
    });
  }

  search() {
    this.isLoading = true;
    this.searchService.jobsSearch(this.colectData()).pipe(
      map((res: any) => {
        if (res.ok) {
          setTimeout(() => {
            this.isLoading = false;
          }, 900);
          this.searchPage = res.body;
          this.jobsList = res.body.content;
        }
      }),
    ).subscribe();
  }

  viewMore() {
    this.page += 1;
    this.searchService.jobsSearch(this.colectData()).pipe(
      map((res: any) => {
        if (res.ok) {
          this.jobsList = [...this.jobsList, ...res.body.content];
          this.searchPage = res.body;
        }
      }),
    ).subscribe();
  }

  private colectData() {
    const min = this.getMinAndMaxExperience(this.experienceControl.value).min;
    const max = this.getMinAndMaxExperience(this.experienceControl.value).max;
    return {
      ... this.jobsFilterForm.value,
      keyword: this.keyword,
      minExperienceYears: min,
      maxExperienceYears: max,
      size: this.size,
      page: this.page
    }
  }

  private getMinAndMaxExperience(item: any): any {
    if (item == null) return null;
    const cleanedItem = item.replace('years', '').trim();
    const [minYears, maxYears] = cleanedItem.split('-').map(Number);
    console.log({ min: minYears, max: maxYears })
    return { min: minYears, max: maxYears };
  }

  viewDetails(id: any) {
    this.router.navigate([`job-details/${id}`]);
  }

  saveJobs(jobPostId: any) {
    if (this.tokenService.isLoggedIn()) {
      if (this.tokenService.isLoggedIn()) {
        this.jobPostService.saveJob(jobPostId).subscribe(res => {
          if (res.ok) {
            this.jobsList.forEach((el: any) => {
              if (jobPostId == el.id) {
                el.saved = !el.saved;
              }
            })
          }
        });
      } else {
        this.router.navigate([`/auth/login/job-seeker`]);
      }
    }

  }
}
