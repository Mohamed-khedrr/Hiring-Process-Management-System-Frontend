import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesFilterSearchPageComponent } from './companies-filter-search-page.component';

describe('CompaniesFilterSearchPageComponent', () => {
  let component: CompaniesFilterSearchPageComponent;
  let fixture: ComponentFixture<CompaniesFilterSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniesFilterSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaniesFilterSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
