import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { ChatMessage } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  private chatRooms = new Map<string, any[]>(); 

  constructor(private readonly chatService: ChatService) {}
  
  @EventPattern('chat.newMessage')
  handleNewMessage(data: { adId: string; userId: string; userEmail:string, message: string; timestamp: Date }) {
    const { adId, userId, userEmail, message, timestamp } = data;

    if (!this.chatRooms.has(adId)) {
      this.chatRooms.set(adId, []);
    }

    this.chatRooms.get(adId).push({ userId, userEmail, message, timestamp });
    console.log(`📩 [Chat] Message received ${adId}:`, message);
  }

  @Post('create')
    async createMessage(@Body() createChatDto: CreateChatDto) {
        return this.chatService.createMessage(createChatDto);
    }

  @Get('/:adId')
  getMessagesByAdId(@Param('adId') adId: string) {
    return this.chatService.getMessagesByAdId(adId);
  }
}
