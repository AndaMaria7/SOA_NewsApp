import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { Ad } from '../model/ad.model';
import { AdService } from '../services/ad.service';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
    @Input() adId!: string;
    @Input() userConnected!: User;
    messages: any[] = [];
    newMessage = '';

    ad!: Ad;

    constructor(
        private chatService: ChatService,
        private adService: AdService,
        ) { }

    addChatMessage() {
        const chatData = {
            adId: this.adId,
            userId: this.userConnected.id,
            userEmail: this.userConnected.email,
            message: this.newMessage,
            timestamp: new Date(),

        };

        this.chatService.createChatMessage(chatData).subscribe(
            (response) => {
                console.log('ChatMessage created successfully:', response);
            },
            (error) => {
                console.error('Error creating ChatMessage:', error);
            }
        );
    }

    ngOnInit() {
        console.log('User connected:', this.userConnected);

        this.adService.getAdById(this.adId).subscribe((ad) => {
            this.ad = ad;
        });
        
        // Remplir le tableau de messages avec les messages existants
        this.chatService.getOldMessages(this.adId).subscribe((messages) => {
            this.messages = messages;
        });

        this.chatService.joinChat(this.adId);
        this.chatService.getMessages().subscribe((message) => {
            this.messages.push(message);
        });
    }

    sendMessage() {
        this.addChatMessage();
        this.chatService.sendMessage(this.adId, this.userConnected.id, this.userConnected.email, this.newMessage);
        this.newMessage = '';
    }

    isAdPoster(message: any) {
        return this.ad.poster_id === message.userId;
    }

    isMessageAuthor(message: any) {
        return this.userConnected.id === message.userId;
    }

}
