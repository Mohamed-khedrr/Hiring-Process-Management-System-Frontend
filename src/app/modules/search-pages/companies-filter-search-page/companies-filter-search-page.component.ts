import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';
import { IndustryService } from '../../../shared/services/industry.service';
import { LocationService } from '../../../shared/services/location.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, map } from 'rxjs';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-companies-filter-search-page',
  templateUrl: './companies-filter-search-page.component.html',
  styleUrl: './companies-filter-search-page.component.scss'
})
export class CompaniesFilterSearchPageComponent implements OnInit {
  keyword !: string;
  isLoading = false;
  searchPage: any;
  companyList: Array<any> = [];
  industries !: any;
  page = 0;
  size = 5;
  companyFilterForm !: FormGroup;
  companySizeControl = new FormControl('');
  locationControl = new FormControl('');
  isLogin :any ;
  companySizeList = [
    { value: 'E1to10', text: '1-10 Employees' },
    { value: 'E11to50', text: '11-50 Employees' },
    { value: 'E51to100', text: '51-100 Employees' },
    { value: 'E101to250', text: '101-250 Employees' },
    { value: 'E251to500', text: '251-500 Employees' },
    { value: 'E501to750', text: '501-750 Employees' },
    { value: 'E751to1000', text: '751-1k Employees' },
    { value: 'E1001to2000', text: '1k-2k Employees' },
    { value: 'E2001to5000', text: '2k-5k Employees' },
    { value: 'E5001to10000', text: '5k-10k Employees' },
    { value: 'Egt10000', text: 'More than 10k Employees' }
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

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,private tokenService :TokenService,
    private industryService: IndustryService,
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
      this.companyList = res.searchData.body.content;
    });

    // if keyword Changed keyword change 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.keyword = this.router.routerState.snapshot.root.queryParams['keyword'];
        this.search();
      }
    });

    // recive form emit 
    this.companyFilterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => { 
        this.search();
    });
  }

  createSearchForm() {
    this.companyFilterForm = this.fb.group({
      keyword: this.keyword,
      industry: [''],
      companySize: this.companySizeControl,
      location: this.locationControl,
    })
  }

  getAllIndustries() {
    this.industryService.getIndustries().subscribe(res => {
      this.industries = res.body;
    });
  }

  search() {
    this.isLoading = true;
    console.log(this.colectData())
    this.searchService.companySearch(this.colectData()).pipe(
      map((res: any) => {
        if (res.ok) {
          setTimeout(() => {
            this.isLoading = false;
          }, 900);
          this.searchPage = res.body;
          this.companyList = res.body.content;
        }
      }),
    ).subscribe();
  }

  viewMore() {
    this.page += 1;
    this.searchService.companySearch({ keyword: this.keyword, page: this.page, size: this.size }).pipe(
      map((res: any) => {
        if (res.ok) {
          this.companyList = [...this.companyList, ...res.body.content];
          this.searchPage = res.body;
        }
      }),
    ).subscribe();
  }

  private colectData(){
    return {
      ... this.companyFilterForm.value,
      keyword : this.keyword,
      size : this.size,
      page : this.page
    }
  }

}
