import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        items: {
            id: number;
            price: number;
            quantity: number;
            menuId: number;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: number;
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
        };
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
    })[]>;
    findMyOrders(userId: number): Promise<({
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
    })[]>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: number;
    }>;
}
