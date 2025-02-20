import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
    @IsString()
    @IsNotEmpty()
    adId: string;
  
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    userEmail: string;
  
    @IsString()
    @IsNotEmpty()
    message: string;
  
    @IsNotEmpty()
    timestamp: Date;
  
}
