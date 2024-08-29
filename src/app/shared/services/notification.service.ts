import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BehaviorSubject } from 'rxjs'; 
import { SoundService } from './sound.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  currentMessage = new BehaviorSubject<any>(null);
  permissionStatus: NotificationPermission | null = null;
  private token: string | null = null;
  private apiUrl = environment.baseUrl;

  

  constructor(
    private http: HttpClient,
    private afm: AngularFireMessaging,
    private soundService : SoundService,
  ) {}

  ngOnInit() {
     
  }

  requestPermission() {
    if (!('Notification' in window)) {
      console.log('Notifications are not supported by this browser.');
      return;
    }

    this.permissionStatus = Notification.permission;

    if (this.permissionStatus === 'granted') {
      this.getToken();
    } else if (this.permissionStatus === 'default') {
      Notification.requestPermission().then((permission) => {
        this.permissionStatus = permission;
        if (permission === 'granted') {
          this.getToken();
        } else {
          console.log('Notification permission denied.');
        }
      }).catch((error) => {
        console.error('Notification permission request error:', error);
      });
    } else if (this.permissionStatus === 'denied') {
      console.log('Notification permission was previously denied.');
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.getToken();
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else if (this.permissionStatus === 'blocked') {
      console.log('Notification permission is blocked.');
    }
  }

  private getToken() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        if (currentToken) {
          console.log('Token received:', currentToken);
          this.sendTokenToServer(currentToken);
          this.token = currentToken;
        } else {
          console.log('No registration token available.');
        }
      }
    ).catch((error) => {
      console.error('An error occurred while retrieving token: ', error);
    });
  }

  private sendTokenToServer(token: string) {
    const body = {
      token : token,
      clientType : "WEB"
    }; 
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(`${this.apiUrl}/notifications/register`, JSON.stringify(body), { headers }).subscribe({
      next: (response) => {
        console.log('Token sent to server successfully:', response);
      },
      error: (error) => {
        console.error('Error sending token to server:', error);
      }
    }); 
  }

  subscribeToReceiveMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('New message received: ', payload);
      this.soundService.playNotificationSound();
      this.currentMessage.next(payload);
    });

    this.afm.messages.subscribe(
      (payload: any) => {
        console.log('New message received from AngularFireMessaging: ', payload);
        this.soundService.playNotificationSound();
        this.currentMessage.next(payload);
      }
    );
  }
  getMessageReceivedObservable() {
    return this.currentMessage.asObservable();
  }
  getAllNotifications(page: number, size: number) {
    return this.http.get(`${this.apiUrl}/notifications?page=${page}&size=${size}`);
  }

  countNotifications() {
    return this.http.get(`${this.apiUrl}/notifications/count`);
  }

  markAllAsRead(){
    return this.http.put(`${this.apiUrl}/notifications`,{});
  }
  markAsRead(id : any){
    return this.http.put(`${this.apiUrl}/notifications/${id}`,{});
  }
  
}