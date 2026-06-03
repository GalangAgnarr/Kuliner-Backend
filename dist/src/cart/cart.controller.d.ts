import { CartService } from './cart.service';
import { AddToCartDto, AddMultipleToCartDto, UpdateCartItemDto } from './dto/cart.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
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
    addToCart(req: any, dto: AddToCartDto): Promise<{
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
    addMultipleToCart(req: any, dto: AddMultipleToCartDto): Promise<any[]>;
    updateCartItem(req: any, itemId: number, dto: UpdateCartItemDto): Promise<{
        id: number;
        quantity: number;
        menuId: number;
        cartId: number;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
    removeFromCart(req: any, itemId: number): Promise<{
        id: number;
        quantity: number;
        menuId: number;
        cartId: number;
    }>;
    checkout(req: any): Promise<{
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
