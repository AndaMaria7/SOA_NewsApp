import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    ad_id: string;
  
    @IsString()
    @IsNotEmpty()
    student_id: string;
  
    @IsString()
    @IsNotEmpty()
    message: string;
  
    @IsEnum(['pending', 'accepted', 'rejected'])
    @IsOptional()
    status?: 'pending' | 'accepted' | 'rejected';
}
