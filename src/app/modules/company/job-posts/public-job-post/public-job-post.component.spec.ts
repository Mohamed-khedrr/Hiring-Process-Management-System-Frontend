import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJobPostComponent } from './public-job-post.component';

describe('PublicJobPostComponent', () => {
  let component: PublicJobPostComponent;
  let fixture: ComponentFixture<PublicJobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicJobPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
