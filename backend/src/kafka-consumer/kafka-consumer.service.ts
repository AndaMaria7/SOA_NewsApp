import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka, MessagePattern, KafkaContext } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { NotificationsGateway } from 'src/notification/notification.gateway';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private client: ClientKafka;

  // constructor() {
  //   // Initialisation du client Kafka (non nécessaire si tu utilises déjà un microservice)
  //   this.client = new ClientKafka({
  //     client: {
  //       brokers: ['localhost:9093'], // Remplace par ton broker Kafka
  //     },
  //   });
  // }

  private kafka = new Kafka({
    clientId: 'ad-consumer',
    // brokers: ['localhost:9093'],
    brokers: ['kafka:9093'],
  });

  private consumer = this.kafka.consumer({ groupId: 'ad-consumer-group' });

  constructor(private notificationsGateway: NotificationsGateway) {}
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'ad-notifications', fromBeginning: false });
    this.consumeMessages();
  }

  private async consumeMessages() {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const notification = JSON.parse(message.value.toString());
        console.log('Message Kafka received:', notification);
        this.notificationsGateway.sendNotification(notification);
      },
    });
  }
}
