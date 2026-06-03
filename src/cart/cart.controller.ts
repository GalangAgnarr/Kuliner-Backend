import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) { }

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post()
  addToCart(@Request() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Put(':itemId')
  updateCartItem(
    @Request() req,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(req.user.id, itemId, dto);
  }

  @Delete('clear')
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Delete(':itemId')
  removeFromCart(
    @Request() req,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeFromCart(req.user.id, itemId);
  }

  @Post('checkout')
  checkout(@Request() req) {
    return this.cartService.checkout(req.user.id);
  }
}