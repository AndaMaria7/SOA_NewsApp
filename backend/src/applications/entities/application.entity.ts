// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema()
// export class Application extends Document {

//     @Prop({ type: Types.ObjectId, ref: 'Ad', required: true })
//     ad_id: Types.ObjectId;

//     @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//     student_id: Types.ObjectId;

//     @Prop({ required: true })
//     message: string;

//     @Prop({ required: true, enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
//     status: string;

//     @Prop({ type: Date, default: Date.now })
//     created_at: Date;

//     @Prop({ type: Date, default: Date.now })
//     updated_at: Date;
// }

// export const ApplicationSchema = SchemaFactory.createForClass(Application);
