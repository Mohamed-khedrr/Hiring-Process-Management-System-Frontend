import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCartComponent } from './home-cart.component';

describe('HomeCartComponent', () => {
  let component: HomeCartComponent;
  let fixture: ComponentFixture<HomeCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
