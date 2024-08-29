import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerHiringProcessComponent } from './jobseeker-hiring-process.component';

describe('JobseekerHiringProcessComponent', () => {
  let component: JobseekerHiringProcessComponent;
  let fixture: ComponentFixture<JobseekerHiringProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobseekerHiringProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobseekerHiringProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
