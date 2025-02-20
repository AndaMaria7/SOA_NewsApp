import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AD_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ad-service',
            // brokers: ['localhost:9093'],
            brokers: ['kafka:9093'],
          },
          consumer: {
            groupId: 'ad-consumer-group',
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}