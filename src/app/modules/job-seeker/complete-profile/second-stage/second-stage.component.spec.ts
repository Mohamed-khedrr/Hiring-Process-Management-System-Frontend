import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStageComponent } from './second-stage.component';

describe('SecondStageComponent', () => {
  let component: SecondStageComponent;
  let fixture: ComponentFixture<SecondStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// 









