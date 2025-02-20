import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatMessageSchema } from './entities/chat.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
