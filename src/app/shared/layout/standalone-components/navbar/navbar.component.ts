import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';
import { RetrieveJobSeekerDataService } from '../../../../modules/job-seeker/retrieve-job-seeker-data.service';
import { PublicPipesSharedModuleModule } from '../../../pipes/public-pipes/public-pipes-shared-module.module';
import { TokenService } from '../../../services/token.service';
import { SettingsService } from '../../../services/settings.service';
import { ShortenStringPipeModule } from '../../../pipes/public-pipes/shorten-string-pipe/shorten-string-pipe/shorten-string-pipe.module';
import { NotificationService } from '../../../services/notification.service';
import { Observable, Subscription, catchError, map, startWith, switchMap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PublicPipesSharedModuleModule,
    ShortenStringPipeModule,
  ],
})
export class NavbarComponent implements OnInit {
  dataRetriver = inject(RetrieveJobSeekerDataService);
  router = inject(Router);
  tokenService = inject(TokenService);
  settingsService = inject(SettingsService);
  elRef = inject(ElementRef);
  renderer = inject(Renderer2);

  // Control Color of nav bar
  @Input() public navSimple: boolean = false;

  // Control visibilty of login and register button
  @Input() contact: boolean = false;

  @Input() profileImage = false;
  @Input() logs: boolean = true;
  @Input() isJobSeeker: boolean = true;
  @Input() employerJobSeekerBtn = true;
  @Input() isLoggedIn: boolean = false;

  // Router Links
  @Input() jobSeekerOrEmployerLink: string = '';
  loginLink: string = '';
  signupLink: string = '';
  contactLink: string = '/';

  userId: string | undefined;
  isDropDownVisible: boolean = false;

  selectedPofileImageURL: string | undefined;

  nameAndEmail = {
    firstName: '',
    lastName: '',
    username: '',
  };
  //notification 
  private messageSubscription !: Subscription;
  isNotificationVisible = false;
  notificationsCount = 0;
  page: number = 0;
  size: number = 5;
  notificationPage: any;
  notificationList: any = [];
  isNotificationLoading = true;
  isOpend = false;
  isChanged = false;
  completed = false;
  // form  
  searchControl = new FormControl();
  suggestions$: Observable<string[]>;
  showSearchDropdown = true;
  constructor(private searchService: SearchService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) {
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(query => this.searchService.getSuggestions(query))
    );
  }
  ngOnInit(): void {
    // notification 
    if (this.isLoggedIn) {
      this.notificationService.requestPermission();
      this.getNotificationsCount();
      this.notificationService.subscribeToReceiveMessages();
      this.messageSubscription = this.notificationService.getMessageReceivedObservable().subscribe((message) => {
        if (message) {
          this.notificationsCount++;
          console.log('Received message in HeaderComponent: ', message);
          this.isChanged = true;
          const newNotification = {
            id: message.messageId,
            title: message.notification.title,
            body: message.notification.body,
          }
          console.log("new Notification in Header ==> ", newNotification);
        }
      });
    }

    this.handleAuthPagesLinks();
    this.userId = this.tokenService.getUserId() as string;
    if (this.profileImage && this.userId) {
      this.getProfileImageUrl();
      this.getNameAndEmail();
    }
    this.route.queryParams.subscribe(prams => {
      this.searchControl.setValue(prams['keyword']);
    });


  }

  getNotificationsCount() {
    this.notificationService.countNotifications().subscribe({
      next: (res: any) => {
        console.log(res);
        this.notificationsCount = res.body;
      }
    });
  }

  getNotifications() {
    console.log("this notification list", this.notificationList.length)
    console.log("this is changed ", this.isChanged)
    if (!this.isChanged && this.notificationList.length != 0) return;
    this.isNotificationLoading = true;
    this.notificationService.getAllNotifications(this.page, this.size).pipe(
      map((res: any) => {
        if (res) {
          setTimeout(() => {
            this.isNotificationLoading = false;
            this.isChanged = false;
          }, 600);
          this.notificationPage = res.body;
          this.notificationList = res.body.content;
          console.log(res.body.content)
        }
      }),
      catchError(err => {
        console.error(err);
        this.isNotificationLoading = true;
        return err;
      })
    ).subscribe();
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.ok) {
          this.notificationList.forEach((el: any) => {
            el.read = true
          });
          this.notificationsCount = 0
        }
      }
    })
  }

  markRead(notification: any) {
    if (notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe();
      notification.read = true;
    }

    // this.router.navigate([]);*/
  }

  loadMore() {
    this.notificationService.getAllNotifications(++this.page, this.size).subscribe({
      next: (res: any) => {
        if (res.ok) {
          console.log(res.notifications)
          this.notificationList = [...this.notificationList, ...res.body.content]
          this.notificationPage = res.body;
        }
      }
    })
  }


  handleAuthPagesLinks() {
    let role = !this.isJobSeeker ? 'employer' : 'job-seeker';
    this.loginLink = `/auth/login/${role}`;
    this.signupLink = `/auth/registration/${role}`;
  }

  getNameAndEmail() {
    this.dataRetriver.getNameAndEmail().subscribe({
      next: (res) => {
        this.nameAndEmail = res.body;
      },
      error: (err) => {
        console.log('Error on Getting Name and Email ', err);
      },
    });
  }

  setValuesToFalse() {
    this.logs = false;
    this.navSimple = false;
    this.isJobSeeker = false;
    this.contact = false;
    this.isLoggedIn = false;
  }

  toProfile() {
    this.router.navigate(['/job-seeker/profile']);
  }

  getProfileImageUrl() {
    this.dataRetriver.getProfileImageUrl().subscribe({
      next: (res) => {
        this.selectedPofileImageURL = res.body as string;
      },
      error: (err) => {
        console.log('Error on Getting Profile Image ', err);
      },
    });
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
  closeDropDown() {
    this.isDropDownVisible = false;
  }

  logout() {
    this.settingsService.signOut();
    this.router.navigate(['/auth/login/job-seeker']);
  }


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropDownVisible = false;
      this.closeNotificationDropDown();
      this.showSearchDropdown = false;
    }
  }

  search(keyword: any) {

    const value = keyword == null ? this.searchControl.value : keyword;
    const currentUrl = this.router.url;
    if (this.searchControl.value != keyword && keyword != null) {
      this.searchControl.setValue(keyword);
    }
    console.log(currentUrl);

    if (this.isSearchUrl(currentUrl)) {
      this.updateKeywordInUrl(value);
    } else {
      this.router.navigate(['/search'], {
        queryParams: { keyword: value }
      });
    }
    this.showSearchDropdown = false;

  }

  updateKeywordInUrl(keyword: any): void {
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
