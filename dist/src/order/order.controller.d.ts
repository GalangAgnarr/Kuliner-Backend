import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    create(req: any, dto: CreateOrderDto): Promise<{
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
    findMyOrders(req: any): Promise<({
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
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        userId: number;
    }>;
}
