import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFilterSearchPageComponent } from './people-filter-search-page.component';

describe('PeopleFilterSearchPageComponent', () => {
  let component: PeopleFilterSearchPageComponent;
  let fixture: ComponentFixture<PeopleFilterSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleFilterSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleFilterSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
