import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ad extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  poster_id: Types.ObjectId;

  @Prop()
  location: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

}

export const AdSchema = SchemaFactory.createForClass(Ad);