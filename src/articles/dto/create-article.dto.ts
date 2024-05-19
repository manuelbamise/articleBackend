import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({message: 'A title is required'})
  title: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({message:'A body is required'})
  body: string;

  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}