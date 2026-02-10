import { IsString, MinLength, MaxLength, IsArray, ArrayMaxSize, IsEnum, IsOptional } from 'class-validator';
import { TicketPriority } from '../entities/ticket.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ description: 'Titre du ticket', minLength: 5, maxLength: 120 })
  @IsString()
  @MinLength(5, { message: 'Le titre est trop court (min 5 caractères)' })
  @MaxLength(120, { message: 'Le titre est trop long (max 120 caractères)' })
  title: string;

  @ApiProperty({ description: 'Description du ticket', minLength: 20, maxLength: 4000 })
  @IsString()
  @MinLength(20, { message: 'La description doit faire au moins 20 caractères' })
  @MaxLength(4000)
  description: string;

  @ApiPropertyOptional({ enum: TicketPriority, default: TicketPriority.MEDIUM })
  @IsEnum(TicketPriority)
  @IsOptional()
  priority?: TicketPriority;

  @ApiPropertyOptional({ type: [String], maxItems: 5 })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5, { message: 'Vous ne pouvez pas ajouter plus de 5 tags' })
  tags: string[];
}