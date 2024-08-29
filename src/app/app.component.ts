import { NotExpr } from '@angular/compiler';
import { LoaderService } from './shared/services/loader.service';
import { Component, OnInit, inject } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { BehaviorSubject, Observable, Subscription, debounceTime, filter } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MainLoaderService } from './shared/services/main-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  title = 'Hiring-Process-Management-System-Frontend';
  loaderService = inject(LoaderService); 

  isLoading$: Observable<boolean>;
  private ignoreUrls = ['/search'];
 
 
  constructor(private router: Router, private mainLoaderService: MainLoaderService) {
    this.isLoading$ = this.mainLoaderService.isLoading$;
    this.mainLoaderService.show();
    this.router.events.pipe(
    filter(event => event instanceof NavigationStart ||
       event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
         event instanceof NavigationError),
      debounceTime(1100)
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.mainLoaderService.show();
        if (!this.shouldIgnore(event.url)) {
          this.mainLoaderService.show();
        }
      } else if (event instanceof NavigationEnd) {
        this.mainLoaderService.hide();
      }
    });
  }
  
  private shouldIgnore(url: string): boolean {
    return this.ignoreUrls.some(ignoreUrl => url.includes(ignoreUrl));
  }



}
