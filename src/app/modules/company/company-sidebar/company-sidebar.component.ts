import { HandleFileUrlPipe } from './../../../shared/pipes/public-pipes/handle-file-url.pipe';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { RecruiterBasicInfo } from '../../../shared/models/recruiter/recruiter-basic-info';
import { ApiResponse } from '../../../shared/models/Api-response';
import { TokenService } from '../../../shared/services/token.service';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicPipesSharedModuleModule } from '../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { ShortenStringPipeModule } from '../../../shared/pipes/public-pipes/shorten-string-pipe/shorten-string-pipe/shorten-string-pipe.module';

@Component({
  selector: 'app-company-sidebar',
  templateUrl: './company-sidebar.component.html',
  styleUrl: './company-sidebar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PublicPipesSharedModuleModule,
    ShortenStringPipeModule,
  ],
})
export class CompanySidebarComponent implements OnInit, OnChanges {
  @Output() sideClosed: EventEmitter<any> = new EventEmitter<any>();
  @Input() recruiterCompanyId: string = '';
  id: string | undefined;
  tokenService = inject(TokenService);
  companyService = inject(CompanyService);
  isCompany: boolean = true;
  CompanyRecruitersList!: RecruiterBasicInfo[];

  ngOnInit(): void {
    this.id = this.tokenService.getUserId() as string;
    this.checkIsUserCompany();
    this.getCompanyActiveMembers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recruiterCompanyId']) {
      this.getCompanyActiveMembers();
    }
  }

  closeSideBar() {
    this.sideClosed.emit(true);
  }

  checkIsUserCompany() {
    this.isCompany = this.tokenService.getUserRoles()!.includes('ROLE_COMPANY');
  }

  getCompanyActiveMembers() {
    this.isCompany = this.tokenService.getUserRoles()!.includes('ROLE_COMPANY');
    const userId: string = (
      this.isCompany ? this.id : this.recruiterCompanyId
    ) as string;

    this.requestCompanyRecruiters(userId);
  }

  requestCompanyRecruiters(userId: string) {
    if (!userId) return;
    this.companyService.getAllCompanyRecruitersById(userId).subscribe({
      next: (res: ApiResponse<any>) => {
        this.CompanyRecruitersList = res.body;
      },
      error(err) {
        console.log(`Error in Getting Active members ${err}`);
      },
    });
  }
}
