import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    poster_id: string;
  
    @IsString()
    @IsNotEmpty()
    location: string;
  
    @IsString()
    @IsNotEmpty()
    category: string;
  
}
