import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerLoaderComponent } from './job-seeker-loader.component';

describe('JobSeekerLoaderComponent', () => {
  let component: JobSeekerLoaderComponent;
  let fixture: ComponentFixture<JobSeekerLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSeekerLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobSeekerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
