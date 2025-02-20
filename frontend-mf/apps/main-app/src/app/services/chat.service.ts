import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../model/chatMessage.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('http://localhost:3000');

  constructor(private http: HttpClient) {}

  joinChat(adId: string) {
    this.socket.emit('joinChat', adId);
  }

  sendMessage(adId: string, userId: string, userEmail: string, message: string) {
    console.log('Emitting message:', { adId, userId, userEmail, message }); // Ajoute ce log
    this.socket.emit('sendMessage', { adId, userId, userEmail, message });
    console.log('FRONTEND - Message envoyé');
  }


  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });
  }

  getOldMessages(adId: string): Observable<any> {
    const url = `http://localhost:3000/chat/${adId}`;

    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`  // Ajout du token dans l'en-tête Authorization
    // });

    return this.http.get<any[]>(url).pipe(
      map((response) => {
        // Assurez-vous que la réponse contient bien un tableau d'objets et transforme chaque élément en une instance d'Ad
        return response.map(chatMessage => new ChatMessage(
          chatMessage.adId,
          chatMessage.userId,
          chatMessage.userEmail,
          chatMessage.message,
          chatMessage.timestamp,
        ));
      })
    );
  }

  createChatMessage(adData: any): Observable<any> {
    let apiUrl = 'http://localhost:3000/chat/create';
    console.log('adData:', adData);
    
    return this.http.post<any>(apiUrl, adData);
  }
}
