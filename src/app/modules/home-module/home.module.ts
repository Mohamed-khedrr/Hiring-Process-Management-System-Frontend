import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { JobSeekerHomeComponent } from './job-seeker-home/job-seeker-home.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../../shared/layout/standalone-components/navbar/navbar.component';
import { HomeCartComponent } from '../../shared/layout/standalone-components/home-cart/home-cart.component';
import { HomeFooterComponent } from '../../shared/layout/standalone-components/home-footer/home-footer.component';
import { NotificationMessageComponent } from '../../shared/standalone-components/notification-message/notification-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JobSeekerHomeComponent, EmployerHomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    NavbarComponent,
    HomeCartComponent,
    HomeFooterComponent,
    NotificationMessageComponent,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class HomeModule {

}
