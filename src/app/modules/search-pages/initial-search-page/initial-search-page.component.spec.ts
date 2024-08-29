import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSearchPageComponent } from './initial-search-page.component';

describe('InitialSearchPageComponent', () => {
  let component: InitialSearchPageComponent;
  let fixture: ComponentFixture<InitialSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
