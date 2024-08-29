import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageCounterComponent } from './stage-counter.component';

describe('StageCounterComponent', () => {
  let component: StageCounterComponent;
  let fixture: ComponentFixture<StageCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StageCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StageCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
