import { Injectable } from '@nestjs/common';
import { MessagePattern, KafkaContext } from '@nestjs/microservices';

@Injectable()
export class NotificationService {

  @MessagePattern('ad-notifications') 
  handleAdNotification(message: any, context: KafkaContext) {
    const receivedMessage = context.getMessage().value.toString(); 
    console.log('Notification received:', JSON.parse(receivedMessage)); 
  }
}
