import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '../../../shared/services/location.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IndustryService } from '../../../shared/services/industry.service';
import { SearchService } from '../../../shared/services/search.service';
import { debounceTime, map, min } from 'rxjs';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-people-filter-search-page',
  templateUrl: './people-filter-search-page.component.html',
  styleUrl: './people-filter-search-page.component.scss'
})
export class PeopleFilterSearchPageComponent implements OnInit{
  keyword ! :string;
  isLoading = false;
  searchPage : any; 
  jobSeekerList : Array<any> = []; 
  page = 0 ;
  size = 5;
  salary : number = 0;

  peopleFilterForm !: FormGroup;
  nationalityControl = new FormControl();
  LocationControl = new FormControl();
  genderControl = new FormControl();
  jobStatusControl = new FormControl();
  educationLevelControl = new FormControl();
  experienceControl = new FormControl();
  careerLevelControl = new FormControl();
  isLogin : any ;

  jobTypes : string[]  =  [
    "On Site", "Hybrid", "Remote"
  ]

  employmentTypes : string[]  = [
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

  experienceItems : string[]  = [
    "0-2 years",
    "3-4 years",
    "5-7 years",
    "8-10 years",
    "11-12 years",
    "13-15 years",
    "+15 years"
  ];

  educationLevels : string[] = [
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
   nationalitiesList: string[] = [
    'Egyptian',
    'Saudi',
    'American',
    'British',
    'Chinese',
    'French',
    'German',
    'Indian',
    'Italian',
    'Japanese',
    'Mexican',
    'Russian',
    'Spanish',
    'Brazilian',
    'Emirati',
    'Lebanese',
    'Jordanian',
    'Moroccan'
  ];
  
  
  jobStatusList: string[] = [
    'Available Now', // Open for immediate hiring
    'Casually Looking', // Has work but looking for good opportunities only
    'Selective', // Interested in very specific opportunities
    'Not Looking' // Not looking for a job
  ];

  careerLevel: string[] = [
    "Junior",
    "Senior",
    "TechLead",
    "Fresh",
    "Intern",
    "MidSenior",
    "Director",
    "Executive",
    "Partner",
    "Owner",
    "Manager"
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



  constructor( private locationService: LocationService,private tokenService : TokenService,
    private route : ActivatedRoute,private fb : FormBuilder ,
              private router : Router,private industryService: IndustryService,
              private searchService : SearchService){}

  ngOnInit(): void {
    this.isLogin = this.tokenService.isLoggedIn();
    // intilize keyword
    this.route.queryParams.subscribe(prams=>{
      this.keyword = prams['keyword'];
    });

    // init
    this.createSearchForm(); 

    // get data form resolver
    this.route.data.subscribe((res : any) =>{
      this.searchPage = res.searchData.body; 
      this.jobSeekerList = res.searchData.body.content;
    });

    // if keyword Changed keyword change 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.keyword = this.router.routerState.snapshot.root.queryParams['keyword'];
        this.search();
      }
    });

    // recive form emit 
    this.peopleFilterForm.valueChanges
    .pipe(debounceTime(400))
    .subscribe(value => { 
      console.log(value)
      this.search();
    }); 
  } 

  createSearchForm(){
    this.peopleFilterForm = this.fb.group({
     keyword : this.keyword ,
     nationality : this.nationalityControl ,
     location : this.LocationControl ,
     gender : this.genderControl ,
     jobStatus :   this.jobStatusControl,
     educationLevel : this.educationLevelControl ,
     yearsOfExperience : this.experienceControl ,
     careerLevel : this.careerLevelControl ,
     minSalary : [this.salary == 0 ? null :this.salary],
     readyToAllocate : ['']
    })
  }

  search(){
    this.isLoading = true;
    console.log(this.keyword)
    this.searchService.jobSeekerSearch(this.colectData()).pipe(
      map((res:any) => {
        if(res.ok){
          setTimeout(() => {
            this.isLoading = false;
          }, 900);
          this.searchPage = res.body;
          this.jobSeekerList = res.body.content;
        }
      }), 
    ).subscribe();
  }

  viewMore(){
    this.page +=1 ; 
    console.log(this.keyword)
    this.searchService.jobSeekerSearch(this.colectData()).pipe(
      map((res:any) => {
        if(res.ok){ 
          this.searchPage = res.body
          this.jobSeekerList =[ ...this.jobSeekerList, ...res.body.content];
        }
      }), 
    ).subscribe();
  }

  private colectData(){
    return {
      ... this.peopleFilterForm.value,
      yearsOfExperience : this.getMinAndMaxExperience(this.experienceControl.value),
      keyword : this.keyword, 
      size : this.size,
      page : this.page
    }
  }

  private getMinAndMaxExperience(item: any): any {
    if (item == null) return null;
    const cleanedItem = item.replace('years', '').trim();
    const [minYears, maxYears] = cleanedItem.split('-').map(Number);
    return minYears;
  }

  viewProfile(userId : any){
    if(this.tokenService.isLoggedIn()){
      this.router.navigate([`/job-seeker/profile/${userId}`])
    }else {
      this.router.navigate([`/auth/login/job-seeker`]);
    }
  }

}
