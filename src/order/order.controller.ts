import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Post()
  create(@Request() req, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.id, dto);
  }

  @Get('my-orders')
  findMyOrders(@Request() req) {
    return this.orderService.findMyOrders(req.user.id);
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(id, dto);
  }
}