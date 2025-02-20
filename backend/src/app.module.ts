import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdsModule } from './ads/ads.module';
// import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { NotificationService } from './notification/notification.service';
import { NotificationsGateway } from './notification/notification.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/job-student-sandbox'), 
    UserModule, AdsModule, AuthModule, ChatModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9093'],  
          },
          consumer: {
            groupId: 'nestjs-consumer-client', 
          },
        },
      },
    ]),
    
  ],
  controllers: [ChatController],
  providers: [KafkaConsumerService, NotificationService, NotificationsGateway, ChatGateway,],
})
export class AppModule {}
