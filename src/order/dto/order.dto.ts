import { IsEnum } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export class CreateOrderItemDto {
  menuId!: number;
  quantity!: number;
}

export class CreateOrderDto {
  items!: CreateOrderItemDto[];
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, {
    message: 'Status tidak valid. Gunakan salah satu dari: PENDING, CONFIRMED, DONE, CANCELLED',
  })
  status!: OrderStatus;
}