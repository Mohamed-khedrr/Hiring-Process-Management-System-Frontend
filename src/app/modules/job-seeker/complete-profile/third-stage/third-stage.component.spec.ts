import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdStageComponent } from './third-stage.component';

describe('ThirdStageComponent', () => {
  let component: ThirdStageComponent;
  let fixture: ComponentFixture<ThirdStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
