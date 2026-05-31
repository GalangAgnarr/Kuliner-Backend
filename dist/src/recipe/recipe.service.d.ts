import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
export declare class RecipeService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        menu: {
            id: number;
            name: string;
            createdAt: Date;
            description: string;
            price: number;
            category: string;
            imageUrl: string | null;
            isAvailable: boolean;
        };
    } & {
        id: number;
        createdAt: Date;
        menuId: number;
        ingredients: string;
        steps: string;
        youtubeUrl: string | null;
    })[]>;
    findOne(id: number): Promise<{
        menu: {
            id: number;
            name: string;
            createdAt: Date;
            description: string;
            price: number;
            category: string;
            imageUrl: string | null;
            isAvailable: boolean;
        };
    } & {
        id: number;
        createdAt: Date;
        menuId: number;
        ingredients: string;
        steps: string;
        youtubeUrl: string | null;
    }>;
    findByMenu(menuId: number): Promise<{
        menu: {
            id: number;
            name: string;
            createdAt: Date;
            description: string;
            price: number;
            category: string;
            imageUrl: string | null;
            isAvailable: boolean;
        };
    } & {
        id: number;
        createdAt: Date;
        menuId: number;
        ingredients: string;
        steps: string;
        youtubeUrl: string | null;
    }>;
    create(dto: CreateRecipeDto): Promise<{
        id: number;
        createdAt: Date;
        menuId: number;
        ingredients: string;
        steps: string;
        youtubeUrl: string | null;
    }>;
    update(id: number, dto: UpdateRecipeDto): Promise<{
        id: number;
        createdAt: Date;
        menuId: number;
        ingredients: string;
        steps: string;
        youtubeUrl: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        menuId: number;
        ingredients: string;
        steps: string;
        youtubeUrl: string | null;
    }>;
}
