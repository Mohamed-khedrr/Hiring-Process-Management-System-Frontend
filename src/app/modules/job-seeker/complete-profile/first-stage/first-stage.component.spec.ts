import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStageComponent } from './first-stage.component';

describe('FirstStageComponent', () => {
  let component: FirstStageComponent;
  let fixture: ComponentFixture<FirstStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
