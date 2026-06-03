export class AddToCartDto {
  menuId!: number;
  quantity!: number;
}

export class AddMultipleToCartDto {
  items!: AddToCartDto[];
}

export class UpdateCartItemDto {
  quantity!: number;
}