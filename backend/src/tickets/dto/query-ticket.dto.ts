import {
  IsOptional,
  IsEnum,
  IsArray,
  IsString,
  IsUUID,
  Min,
  IsInt,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TicketStatus, TicketPriority } from '../entities/ticket.entity';

export class TicketQueryDto {
  // status
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(TicketStatus, { each: true })
  status?: TicketStatus[];

  // priority
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(TicketPriority, { each: true })
  priority?: TicketPriority[];

  // tag
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  // assignedTo
  @IsOptional()
  @IsUUID()
  assignedTo?: string;

  // search
  @IsOptional()
  @IsString()
  search?: string;

  // pagination
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}