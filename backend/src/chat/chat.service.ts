import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ChatMessage } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';


@Injectable()
export class ChatService {
    private client: ClientProxy;

    constructor(@InjectModel(ChatMessage.name) private chatModel: Model<ChatMessage>) {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@rabbitmq:5672'],
                queue: 'chat_messages',
                queueOptions: { durable: false },
            },
        });
    }

    async sendMessage(adId: string, userId: string, userEmail:string, message: string) {
        console.log('BACKEND - Send message:', { adId, userId, message });

        this.client.emit('chat.newMessage', { adId, userId, message, timestamp: Date.now() });

    }

    createMessage(createModelDto: CreateChatDto) {
        const newChatMessage = new this.chatModel(createModelDto);
        return newChatMessage.save();
    }

    async getMessagesByAdId(adId: string) {
        return this.chatModel.find({ adId }).sort({ timestamp: 1 }).exec();
    }
}
