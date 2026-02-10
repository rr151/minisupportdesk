import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { TicketStatus } from "../entities/ticket.entity";

export class UpdateTicketDto {
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}