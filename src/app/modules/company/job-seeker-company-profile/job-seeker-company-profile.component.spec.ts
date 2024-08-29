import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerCompanyProfileComponent } from './job-seeker-company-profile.component';

describe('JobSeekerCompanyProfileComponent', () => {
  let component: JobSeekerCompanyProfileComponent;
  let fixture: ComponentFixture<JobSeekerCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSeekerCompanyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobSeekerCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
