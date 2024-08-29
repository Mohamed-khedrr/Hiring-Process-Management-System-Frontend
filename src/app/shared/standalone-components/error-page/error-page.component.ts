import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../layout/standalone-components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  err: string = this.route.snapshot.params['err'] || '404';
  heading: string = '';
  message: string = '';
  imgSrc: String = '';
  contactBtn: boolean = false;

  ngOnInit(): void {
    this.imgSrc = `assets/imgs/errors/${this.err}.svg`;
    this.handleErrorType(this.err);
  }

  handleErrorType(err: string) {
    switch (err) {
      case '403':
        this.heading = 'Access Denied';
        this.message =
          'Sorry, you don’t have permission to access this page, please contact us if this wasn’t supposed to happen. ';
        this.contactBtn = true;
        break;
      case '401':
        this.heading = 'Unauthorized';
        this.message = 'Sorry, but you are not authorized to view this page. ';
        this.contactBtn = true;
        break;
      case '406':
        this.heading = 'Not Acceptable';
        this.message = 'Sorry, The entered token is invalid ';
        this.imgSrc = 'assets/imgs/errors/404.svg';
        break;
      case '500':
        this.heading = 'Internal Server Error';
        this.message =
          'We are having some issues at the moment, we will have it fixed in no time.';
        break;
      case '503':
        this.heading = 'Service Unavailable';
        this.message = `Something went wrong on our end,
          refresh the page or go back and attempt the same action again.
          If you still have the same problem contact us`;

        break;
      case '504':
        this.heading = 'Gateway timeout';
        this.message = `he page you're looking for encountered a delay in communication,
        try refreshing the page, or contact us`;
        break;

      default:
        this.heading = 'That Page Does Not Exist!';
        this.message =
          'Sorry the page you were looking for could not be found.';
        this.imgSrc = 'assets/imgs/errors/404.svg';
        break;
    }
  }
}
