import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: ClientsModuleOptions = [
  {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'task-manager',
        brokers: ['kafka:9093'], 
      },
      consumer: {
        groupId: 'notification-group',
      },
    },
  },
];
