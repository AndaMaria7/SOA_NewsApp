import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3000');
  }

  listenForNotifications(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('new-notification', (data) => {
        console.log("Notification reçue :", data);
        observer.next(data);
      });

      return () => this.socket.disconnect();
    });
  }
}
