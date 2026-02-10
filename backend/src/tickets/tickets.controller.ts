import { Controller, UseGuards, Get, Post, Patch, Request, Query, Body, BadRequestException, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { TicketsService } from './tickets.service';
import { TicketPriority } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketQueryDto } from './dto/query-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {

    constructor(private ticketsService: TicketsService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Request() req, @Query() query :TicketQueryDto) {
        return this.ticketsService.findAll(req.user, query);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Request() req, @Body() body: CreateTicketDto) {

        console.log(req.user)
        return this.ticketsService.create(
            body,
            req.user, // par JwtStrategy
        );
    }

    @Patch(':id')
    @Roles(UserRole.AGENT)
    updateStatus(@Param('id') id: string,@Body() dto: UpdateTicketDto,@Request() req,) {
        return this.ticketsService.update(id, dto, req.user);
    }

    @Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.ticketsService.remove(id, req.user);
}
}