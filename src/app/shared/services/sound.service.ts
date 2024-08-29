import { Injectable } from '@angular/core';
import { Howl } from 'howler';
 
@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sound: Howl;
  private contextResumed: boolean = false;

  constructor() { 
    this.sound = new Howl({
      src: ['assets/sounds/notification-sound.mp3'],
      onplayerror: () => {
        if (!this.contextResumed) {
          this.resumeContextAndPlay(); 
        }
      }
    });
  }

  playNotificationSound() { 
    if (!this.contextResumed) {
      this.resumeContextAndPlay(); 
    } else {
      this.sound.play();
    }
  }

  private resumeContextAndPlay() {
    this.sound.play();
    this.contextResumed = true;
  }
}
