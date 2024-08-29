import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileLoaderComponent } from './company-profile-loader.component';

describe('CompanyProfileLoaderPageComponent', () => {
  let component: CompanyProfileLoaderComponent;
  let fixture: ComponentFixture<CompanyProfileLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfileLoaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyProfileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
