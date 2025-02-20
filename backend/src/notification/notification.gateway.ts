import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200', // Autorise Angular
    methods: ['GET', 'POST'],
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté: ${client.id}`);
  }

  sendNotification(notification: any) {
    console.log("Envoi de notification :", notification);
    this.server.emit('new-notification', notification);
  }


}
