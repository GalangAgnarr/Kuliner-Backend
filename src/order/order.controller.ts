import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  // User buat order
  @Post()
  create(@Request() req, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.id, dto);
  }

  // User lihat order sendiri
  @Get('my-orders')
  findMyOrders(@Request() req) {
    return this.orderService.findMyOrders(req.user.id);
  }

  // Admin lihat semua order
  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  findAll() {
    return this.orderService.findAll();
  }

  // Admin update status order
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