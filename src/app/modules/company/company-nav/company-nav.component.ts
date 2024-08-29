import { RecruiterManagementService } from './../recruiter-management/recruiter-management.service';
import { TokenService } from '../../../shared/services/token.service';
import { UserDataService } from './../../../shared/services/user-data.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  inject,
} from '@angular/core';
import { ApiResponse } from '../../../shared/models/Api-response';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { PublicPipesSharedModuleModule } from '../../../shared/pipes/public-pipes/public-pipes-shared-module.module';
import { ShortenStringPipeModule } from '../../../shared/pipes/public-pipes/shorten-string-pipe/shorten-string-pipe/shorten-string-pipe.module';
import { Observable, Subject, Subscription, catchError, filter, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService } from '../../../shared/services/search.service';
import { MultiSelectSearchBoxComponent } from '../../../shared/layout/standalone-components/multi-select-search-box/multi-select-search-box.component';


@Component({
  selector: 'app-company-nav',
  templateUrl: './company-nav.component.html',
  styleUrl: './company-nav.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PublicPipesSharedModuleModule,
    ShortenStringPipeModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectSearchBoxComponent,
  ],
})
export class CompanyNavComponent implements OnInit {
  @Output() sideOpened: EventEmitter<any> = new EventEmitter<any>();
  @Output() recruiterCompanyIdChange: EventEmitter<any> = new EventEmitter();

  private messageSubscription !: Subscription;

  tokenService = inject(TokenService);
  companyService = inject(CompanyService);
  userDataService = inject(UserDataService);
  recruiterManagementService = inject(RecruiterManagementService);
  router = inject(Router);
  elRef = inject(ElementRef);
  renderer = inject(Renderer2);

  isDropDownVisible: boolean = false;
  userId: string = '';
  nameOfUser: string = '';
  isCompany!: boolean;
  profileImageUrl: string = '';
  userEmail: string = '';

  // recruiterCompanyName: string = '';
  // recruiterCompanyId: string = '';
  recruiterCompanyBasicInfo = {
    companyName: '',
    companyId: '',
  };
  //notification

  //notification
  isNotificationVisible = false;
  notificationsCount = 0;
  page : number =  0;
  size : number = 5 ;
  notificationPage : any ;
  notificationList: any = [];
  isNotificationLoading = true ;
  isOpend = false ;
  isChanged = false ;
  completed = false ;
  // form
  searchControl = new FormControl();
  suggestions$: Observable<string[]>;
  showSearchDropdown = true;
  constructor(private notificationService : NotificationService,
    private fb : FormBuilder,
    private searchService : SearchService,
    private route : ActivatedRoute
  ){
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(query => this.searchService.getSuggestions(query))
    );
  }

  ngOnInit(): void {
    // notification
    this.notificationService.requestPermission();
    this.getNotificationsCount();
    this.notificationService.subscribeToReceiveMessages();
    this.messageSubscription = this.notificationService
      .getMessageReceivedObservable()
      .subscribe((message) => {
        if (message) {
          this.notificationsCount++;
          console.log('Received message in HeaderComponent: ', message);
          this.isChanged = true;
          const newNotification = {
            id: message.messageId,
            title: message.notification.title,
            body: message.notification.body,
          };
          console.log('new Notification in Header ==> ', newNotification);
        }
      });
    // Getting User Token Data
    this.userId = this.tokenService.getUserId() as string;
    this.checkIsUserRecruiter();
    this.userEmail = this.tokenService.getUserEmail() as string;
    this.route.queryParams.subscribe(prams=>{
        this.searchControl.setValue(prams['keyword']);
    });
    // Getting User Data According to token data
    this.getUserImage();
    this.getNameOfUser();
    this.getRecruiterCompanyBasicInfo();

  }

  getNotificationsCount() {
    this.notificationService.countNotifications().subscribe({
      next: (res: any) => {
        this.notificationsCount = res.body;
      },
    });
  }

  getNotifications() {
    console.log('this notification list', this.notificationList.length);
    console.log('this is changed ', this.isChanged);
    if (!this.isChanged && this.notificationList.length != 0) return;
    this.isNotificationLoading = true;
    this.notificationService
      .getAllNotifications(this.page, this.size)
      .pipe(
        map((res: any) => {
          if (res) {
            setTimeout(() => {
              this.isNotificationLoading = false;
              this.isChanged = false;
            }, 600);
            this.notificationPage = res.body;
            this.notificationList = res.body.content;
            console.log(res.body.content);
          }
        }),
        catchError((err) => {
          console.error(err);
          this.isNotificationLoading = true;
          return err;
        })
      )
      .subscribe();
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.ok) {
          this.notificationList.forEach((el: any) => {
            el.read = true;
          });
          this.notificationsCount = 0;
        }
      },
    });
  }

  markRead(notification : any){
    if(notification.read)
      {
        this.notificationService.markAsRead(notification.id).subscribe();
        notification.read = true;
      }
  }

  loadMore() {
    this.notificationService
      .getAllNotifications(++this.page, this.size)
      .subscribe({
        next: (res: any) => {
          if (res.ok) {
            console.log(res.notifications);
            this.notificationList = [
              ...this.notificationList,
              ...res.body.content,
            ];
            this.notificationPage = res.body;
          }
        },
      });
  }

  openSideBar() {
    this.sideOpened.emit(true);
  }

  toggleDropDownVisibility() {
    this.closeNotificationDropDown();
    this.isDropDownVisible = !this.isDropDownVisible;
  }
  closeDownVisibility() {
    this.isDropDownVisible = false;
  }
  toggleNotificationVisibility() {
    this.closeDownVisibility();
    this.isNotificationVisible = !this.isNotificationVisible;
  }

  closeNotificationDropDown() {
    this.isNotificationVisible = false;
  }

  getCompanyName() {
    this.companyService.getCompanyName().subscribe({
      next: (response: ApiResponse<any>) => {
        this.nameOfUser = response.body;
      },
      error: (err) => {
        console.log('Error in getting name of user: ', err);
      },
    });
  }

  checkIsUserRecruiter() {
    this.isCompany = this.tokenService.getUserRoles()!.includes('ROLE_COMPANY');
  }

  getCompanyPrfileImage() {
    this.companyService.getProfileImage().subscribe({
      next: (res: ApiResponse<any>) => {
        this.profileImageUrl = res.body;
      },
      error: (err) => console.log('error in getting company image ', err),
    });
  }

  getRecruiterProfileImage() {
    this.recruiterManagementService.getRecruiterProfileImage().subscribe({
      next: (res: ApiResponse<any>) => {
        this.profileImageUrl = res.body;
        console.log('image ', res.body);
      },
      error: (err) => console.log('error in getting Recruiter image ', err),
    });
  }

  getUserImage() {
    this.isCompany
      ? this.getCompanyPrfileImage()
      : this.getRecruiterProfileImage();
  }

  getRecruiterCompanyBasicInfo() {
    if (this.isCompany) return;
    this.recruiterManagementService.getRecruiterCompanyBasicInfo().subscribe({
      next: (res: ApiResponse<any>) => {
        this.recruiterCompanyBasicInfo.companyName = res.body.companyName;
        this.changeRecruiterCompanyId(res.body.companyId);
        this.nameOfUser = `${res.body.firstName} ${res.body.lastName} `;
      },
      error: (err) =>
        console.log('error in getting Recruiter CompanyName  ', err),
    });
  }

  changeRecruiterCompanyId(companyId: string) {
    this.recruiterCompanyBasicInfo.companyId = companyId;
    this.recruiterCompanyIdChange.emit(companyId);
  }

  getNameOfUser() {
    if (this.isCompany) {
      this.getCompanyName();
    } else {
      this.getRecruiterCompanyBasicInfo();
    }
  }

  handleNavUserName() {
    if (this.nameOfUser.includes(' ')) {
      return this.nameOfUser.substring(0, this.nameOfUser.indexOf(' '));
    }
    return this.nameOfUser;
  }

  closeDropDown() {
    this.isDropDownVisible = false;
  }

  logout() {
    this.userDataService.clearUserData();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropDownVisible = false;
      this.closeNotificationDropDown();
      this.showSearchDropdown = false ;
    }
  }

  search(keyword: any){
    const value = keyword == null ? this.searchControl.value : keyword;
    const currentUrl = this.router.url;
    if(this.searchControl.value != keyword && keyword != null){
      this.searchControl.setValue(keyword);
    }
    if (this.isSearchUrl(currentUrl)) {
      this.updateKeywordInUrl(value);
    } else {
      this.router.navigate(['/search'], {
        queryParams: { keyword: value }
      });
    }
    this.showSearchDropdown = false;
    console.log(currentUrl);

  }

  updateKeywordInUrl(keyword : any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { keyword: keyword },
      queryParamsHandling: 'merge'
    });
  }

  isSearchUrl(url: string): boolean {
    return url.includes('/search') || url.includes('/search/company') || url.includes('/search/jobposts');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search(this.searchControl.value);
      //  this.searchControl.setValue('');
      this.showSearchDropdown = false;
      console.log("true")
    } else {
      this.showSearchDropdown = true;
      console.log("true")
    }
  }

}
