import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9093'], 
      },
      consumer: {
        groupId: 'nestjs-consumer-client', 
      },
    },
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://guest:guest@localhost:5672'],
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'chat_messages',
      queueOptions: {
        durable: false,
      },
    },
  });


  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
