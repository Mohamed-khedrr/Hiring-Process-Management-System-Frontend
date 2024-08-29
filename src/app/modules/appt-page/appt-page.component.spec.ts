import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptPageComponent } from './appt-page.component';

describe('ApptPageComponent', () => {
  let component: ApptPageComponent;
  let fixture: ComponentFixture<ApptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApptPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
