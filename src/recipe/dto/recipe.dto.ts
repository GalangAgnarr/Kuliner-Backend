export class CreateRecipeDto {
  menuId!: number;
  ingredients!: string;
  steps!: string;
  youtubeUrl?: string;
}

export class UpdateRecipeDto {
  ingredients?: string;
  steps?: string;
  youtubeUrl?: string;
}