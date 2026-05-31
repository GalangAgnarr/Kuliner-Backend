import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
export declare class MenuController {
    private menuService;
    constructor(menuService: MenuService);
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
