import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'notification-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.scss',
})
export class NotificationMessageComponent implements OnInit {

  @Input('type') type: string = 'success';
  @Input('messageHeader') header: string = 'Header';
  @Input('message') message: string = 'message';
  @Input('time') time: number = 10; // seconds
  @Input('visable') isVisible = true;

  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  ngOnInit() { }

  close() {
    this.isVisibleSubject.next(false);
  }

  resetVisibility() {
    this.isVisibleSubject.next(true);
  }


}
