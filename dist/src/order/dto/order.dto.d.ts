export declare class CreateOrderItemDto {
    menuId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    items: CreateOrderItemDto[];
}
export declare class UpdateOrderStatusDto {
    status: 'PENDING' | 'CONFIRMED' | 'DONE' | 'CANCELLED';
}
