import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        category: string;
        imageUrl: string | null;
        isAvailable: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        category: string;
        imageUrl: string | null;
        isAvailable: boolean;
    }>;
    create(dto: CreateMenuDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        category: string;
        imageUrl: string | null;
        isAvailable: boolean;
    }>;
    update(id: number, dto: UpdateMenuDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        category: string;
        imageUrl: string | null;
        isAvailable: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        category: string;
        imageUrl: string | null;
        isAvailable: boolean;
    }>;
}
