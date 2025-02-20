import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
@Schema()
export class ChatMessage extends Document {
  @Prop({ required: true })
  adId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);