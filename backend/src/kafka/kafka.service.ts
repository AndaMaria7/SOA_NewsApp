import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('AD_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async sendNotification(adData: any) {
    return this.kafkaClient.emit('ad.created', {
      id: adData.id,
      title: adData.title,
      timestamp: new Date().toISOString(),
    });
  }
}