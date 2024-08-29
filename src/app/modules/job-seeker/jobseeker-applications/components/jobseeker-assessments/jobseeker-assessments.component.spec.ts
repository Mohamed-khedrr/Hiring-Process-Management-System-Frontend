import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerAssessmentsComponent } from './jobseeker-assessments.component';

describe('JobseekerAssessmentsComponent', () => {
  let component: JobseekerAssessmentsComponent;
  let fixture: ComponentFixture<JobseekerAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobseekerAssessmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobseekerAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
