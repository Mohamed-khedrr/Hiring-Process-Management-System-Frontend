import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHeaderLoaderComponent } from './company-header-loader.component';

describe('CompanyHeaderLoaderComponent', () => {
  let component: CompanyHeaderLoaderComponent;
  let fixture: ComponentFixture<CompanyHeaderLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyHeaderLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyHeaderLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
