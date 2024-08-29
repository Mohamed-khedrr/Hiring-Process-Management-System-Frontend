import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSettingsComponent } from './recruiter-settings.component';

describe('RecruiterSettingsComponent', () => {
  let component: RecruiterSettingsComponent;
  let fixture: ComponentFixture<RecruiterSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
