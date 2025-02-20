import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';

export class UpdateAdDto extends PartialType(CreateChatDto) {}
