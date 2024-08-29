import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsFilterSearchPageComponent } from './jobs-filter-search-page.component';

describe('JobsFilterSearchPageComponent', () => {
  let component: JobsFilterSearchPageComponent;
  let fixture: ComponentFixture<JobsFilterSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsFilterSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsFilterSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
