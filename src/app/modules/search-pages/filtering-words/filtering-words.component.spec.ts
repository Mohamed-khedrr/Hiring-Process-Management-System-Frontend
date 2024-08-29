import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringWordsComponent } from './filtering-words.component';

describe('FilteringWordsComponent', () => {
  let component: FilteringWordsComponent;
  let fixture: ComponentFixture<FilteringWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteringWordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteringWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
