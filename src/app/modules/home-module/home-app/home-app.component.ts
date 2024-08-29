import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/layout/standalone-components/navbar/navbar.component';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css'],
  standalone: true,
  imports: [RouterModule, NavbarComponent],
})
export class HomeAppComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
