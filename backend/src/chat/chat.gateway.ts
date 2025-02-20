import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) { }

    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() data: { adId: string; userId: string; userEmail:string,  message: string }) {
        console.log('Message received', data); 
        this.chatService.sendMessage(data.adId, data.userId, data.userEmail, data.message);
        this.server.to(data.adId).emit('newMessage', data);
    }

    @SubscribeMessage('joinChat')
    handleJoinChat(@MessageBody() adId: string) {
        console.log('User joined room:', adId); 
        this.server.socketsJoin(adId);
    }
}
