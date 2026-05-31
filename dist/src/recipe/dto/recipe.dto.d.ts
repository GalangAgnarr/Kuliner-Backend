export declare class CreateRecipeDto {
    menuId: number;
    ingredients: string;
    steps: string;
    youtubeUrl?: string;
}
export declare class UpdateRecipeDto {
    ingredients?: string;
    steps?: string;
    youtubeUrl?: string;
}
