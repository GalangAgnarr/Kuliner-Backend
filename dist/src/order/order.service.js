"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.$transaction(async (tx) => {
            let totalPrice = 0;
            const orderItems = [];
            for (const item of dto.items) {
                const menu = await tx.menu.findUnique({ where: { id: item.menuId } });
                if (!menu)
                    throw new common_1.NotFoundException(`Menu id ${item.menuId} tidak ditemukan`);
                if (!menu.isAvailable)
                    throw new common_1.BadRequestException(`Menu ${menu.name} tidak tersedia`);
                totalPrice += menu.price * item.quantity;
                orderItems.push({
                    menuId: item.menuId,
                    quantity: item.quantity,
                    price: menu.price,
                });
            }
            const order = await tx.order.create({
                data: {
                    userId,
                    totalPrice,
                    items: {
                        create: orderItems,
                    },
                },
                include: { items: true },
            });
            return order;
        });
    }
    async findAll() {
        return this.prisma.order.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: { include: { menu: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findMyOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: { include: { menu: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, dto) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map