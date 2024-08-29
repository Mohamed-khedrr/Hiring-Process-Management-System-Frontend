import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringTeamComponent } from './hiring-team.component';

describe('HiringTeamComponent', () => {
  let component: HiringTeamComponent;
  let fixture: ComponentFixture<HiringTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiringTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HiringTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
