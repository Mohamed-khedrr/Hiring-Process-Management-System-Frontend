import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialSearchPageComponent } from './initial-search-page/initial-search-page.component';
import { JobsFilterSearchPageComponent } from './jobs-filter-search-page/jobs-filter-search-page.component';
import { CompaniesFilterSearchPageComponent } from './companies-filter-search-page/companies-filter-search-page.component';
import { PeopleFilterSearchPageComponent } from './people-filter-search-page/people-filter-search-page.component';
import { searchResolver } from './resolver/search.resolver';
import { companyFilterResolver } from './resolver/company-filter.resolver';
import { jobsFilterResolver } from './resolver/jobs-filter.resolver';
import { jobSeekerFilterResolver } from './resolver/job-seeker-filter.resolver';

const routes: Routes = [
  {
    path: '',
    component: InitialSearchPageComponent,
    resolve: { searchData: searchResolver }
  },
  {
    path: 'jobs',
    component: JobsFilterSearchPageComponent,
    resolve : {
      searchData : jobsFilterResolver
    }
  },
  {
    path: 'company',
    component: CompaniesFilterSearchPageComponent,
    resolve : {
      searchData : companyFilterResolver
    }
  },
  {
    path: 'people',
    component: PeopleFilterSearchPageComponent,
    resolve : {
      searchData : jobSeekerFilterResolver
    }
  },
];

 
@NgModule({ 
  imports: [
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule],
})
export class SearchRoutingModule { }
