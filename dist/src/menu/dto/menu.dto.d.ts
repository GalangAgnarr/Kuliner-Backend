export declare class CreateMenuDto {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
}
export declare class UpdateMenuDto {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    imageUrl?: string;
    isAvailable?: boolean;
}
