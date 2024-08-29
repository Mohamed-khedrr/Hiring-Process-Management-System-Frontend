import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostFirstStageComponent } from './job-post-first-stage.component';

describe('JobPostFirstStageComponent', () => {
  let component: JobPostFirstStageComponent;
  let fixture: ComponentFixture<JobPostFirstStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostFirstStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostFirstStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
