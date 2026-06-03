export declare class AddToCartDto {
    menuId: number;
    quantity: number;
}
export declare class AddMultipleToCartDto {
    items: AddToCartDto[];
}
export declare class UpdateCartItemDto {
    quantity: number;
}
