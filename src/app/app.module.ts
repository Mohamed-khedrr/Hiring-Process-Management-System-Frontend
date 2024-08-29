import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModuleModule } from './modules/auth-module/auth.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobSeekerLoginComponent } from './modules/auth-module/login/job-seeker-login/job-seeker-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { JobSeekerProfileLoaderComponent } from './loaders/job-seeker-profile-loader/job-seeker-profile-loader.component';
import { CompanyProfileLoaderComponent } from './loaders/company-profile-loader-page/company-profile-loader.component';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CompanyModule } from './modules/company/company.module';
import { HandleFileUrlPipe } from './shared/pipes/public-pipes/handle-file-url.pipe';
import { PublicPipesSharedModuleModule } from './shared/pipes/public-pipes/public-pipes-shared-module.module';
import { DropdownModule } from 'primeng/dropdown';
import { SingleSelectionSquaresComponent } from './shared/layout/standalone-components/single-selection-squares/single-selection-squares.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app'; 
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { NotificationService } from './shared/services/notification.service';

import { ExplorePageComponent } from './modules/job-seeker/explore-page/explore-page.component';
import { CommonModule } from '@angular/common';
import { CustomRouteReuseStrategy } from './shared/CustomRouteReuseStrategy';
import { LoaderComponent } from './shared/layout/standalone-components/loader/loader.component';
import { RequestLoaderComponent } from './shared/layout/standalone-components/request-loader/request-loader.component';
import { NavbarComponent } from './shared/layout/standalone-components/navbar/navbar.component';
initializeApp(environment.firebase)
@NgModule({
  declarations: [
    AppComponent,
    JobSeekerProfileLoaderComponent,
    CompanyProfileLoaderComponent,
    LoaderComponent,
    RequestLoaderComponent, 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    IonicModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    IonicModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    DropdownModule,
    AngularFireModule.initializeApp(environment.firebase)  
  ],
  providers: [
    NotificationService,
    AngularFireMessaging,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    provideAnimationsAsync(),
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
