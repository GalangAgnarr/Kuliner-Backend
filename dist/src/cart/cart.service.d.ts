import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateCart(userId: number): Promise<{
        items: ({
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
            quantity: number;
            menuId: number;
            cartId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
    }>;
    addToCart(userId: number, dto: AddToCartDto): Promise<{
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
        quantity: number;
        menuId: number;
        cartId: number;
    }>;
    getCart(userId: number): Promise<{
        total: number;
        items: ({
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
            quantity: number;
            menuId: number;
            cartId: number;
        })[];
        id: number;
        createdAt: Date;
        userId: number;
    }>;
    updateCartItem(userId: number, itemId: number, dto: UpdateCartItemDto): Promise<{
        id: number;
        quantity: number;
        menuId: number;
        cartId: number;
    }>;
    removeFromCart(userId: number, itemId: number): Promise<{
        id: number;
        quantity: number;
        menuId: number;
        cartId: number;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
    checkout(userId: number): Promise<{
        items: ({
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
            price: number;
            quantity: number;
            menuId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: number;
    }>;
}
