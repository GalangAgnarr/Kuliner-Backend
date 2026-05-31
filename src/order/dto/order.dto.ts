export class CreateOrderItemDto {
  menuId!: number;
  quantity!: number;
}

export class CreateOrderDto {
  items!: CreateOrderItemDto[];
}

export class UpdateOrderStatusDto {
  status!: 'PENDING' | 'CONFIRMED' | 'DONE' | 'CANCELLED';
}