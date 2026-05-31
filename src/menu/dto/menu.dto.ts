export class CreateMenuDto {
  name!: string;
  description!: string;
  price!: number;
  category!: string;
  imageUrl?: string;
}

export class UpdateMenuDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  isAvailable?: boolean;
}