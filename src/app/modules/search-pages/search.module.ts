import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsFilterSearchPageComponent } from './jobs-filter-search-page/jobs-filter-search-page.component';
import { InitialSearchPageComponent } from './initial-search-page/initial-search-page.component';
import { CompaniesFilterSearchPageComponent } from './companies-filter-search-page/companies-filter-search-page.component';
import { PeopleFilterSearchPageComponent } from './people-filter-search-page/people-filter-search-page.component';
import { NavbarComponent } from '../../shared/layout/standalone-components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import { HandleFileUrlPipe } from '../../shared/pipes/public-pipes/handle-file-url.pipe';
import { ExpandableListComponent } from '../../shared/standalone-components/expandable-list/expandable-list.component';
import { FilteringWordsComponent } from './filtering-words/filtering-words.component';
import { UserRoleDirective } from '../../shared/directives/user-role.directive';



@NgModule({
  declarations: [
    JobsFilterSearchPageComponent,
    InitialSearchPageComponent,
    CompaniesFilterSearchPageComponent,
    PeopleFilterSearchPageComponent,
    FilteringWordsComponent
  ],
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule, 
    SearchRoutingModule, 
    ExpandableListComponent, 
  ]
})
export class SearchModule { }
