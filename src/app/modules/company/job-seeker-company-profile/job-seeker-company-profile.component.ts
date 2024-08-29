import { RequestService } from './../../../shared/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { TokenService } from '../../../shared/services/token.service'; 
import { AllCompanyInfoDto } from '../../../shared/models/company/AllCompanyInfoDto';
import { ApiResponse } from '../../../shared/models/Api-response';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-job-seeker-company-profile',
  templateUrl: './job-seeker-company-profile.component.html',
  styleUrl: './job-seeker-company-profile.component.scss'
})
export class JobSeekerCompanyProfileComponent {

  isLoaded = true;
  @ViewChild('overlay') overlay: any | undefined;
  company !: AllCompanyInfoDto;
  response !: ApiResponse<AllCompanyInfoDto>;
  constructor(private companyService: CompanyService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (res: any) => {
        console.log("ngOnInit res", res)
        if (res && res.ApiResponse && res.ApiResponse.ok) {
          this.company = res.ApiResponse.body;
        }
      },
      error: err => {
        console.log("ngOnInit err", err)
      }
    })
  } 
    getCompnayData(companyId: number) {
      this.companyService.getAllCompanyData(companyId).subscribe(res => {
        if (res.ok) {
          this.company = res.body;
          this.isLoaded = true;
        }
      }, (err) => {
        console.log(err);
      })
    }  
  /*
    getCompnayData() {
      this.companyService.getAllCompanyData().subscribe({
        next: res => {
          if (res.ok) {
            this.company = res.body;
            this.isLoaded = true;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    } */
}
