import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostSecondStageComponent } from './job-post-second-stage.component';

describe('JobPostSecondStageComponent', () => {
  let component: JobPostSecondStageComponent;
  let fixture: ComponentFixture<JobPostSecondStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostSecondStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostSecondStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
