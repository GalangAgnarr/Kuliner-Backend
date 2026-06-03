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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateCart(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { menu: true },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: { menu: true },
                    },
                },
            });
        }
        return cart;
    }
    async addToCart(userId, dto) {
        const menu = await this.prisma.menu.findUnique({ where: { id: dto.menuId } });
        if (!menu)
            throw new common_1.NotFoundException('Menu tidak ditemukan');
        if (!menu.isAvailable)
            throw new common_1.BadRequestException('Menu tidak tersedia');
        const cart = await this.getOrCreateCart(userId);
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { cartId: cart.id, menuId: dto.menuId },
        });
        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + dto.quantity },
                include: { menu: true },
            });
        }
        return this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                menuId: dto.menuId,
                quantity: dto.quantity,
            },
            include: { menu: true },
        });
    }
    async addMultipleToCart(userId, dto) {
        const results = [];
        for (const item of dto.items) {
            const result = await this.addToCart(userId, item);
            results.push(result);
        }
        return results;
    }
    async getCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        const total = cart.items.reduce((sum, item) => sum + item.menu.price * item.quantity, 0);
        return { ...cart, total };
    }
    async updateCartItem(userId, itemId, dto) {
        const cart = await this.getOrCreateCart(userId);
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Item tidak ditemukan di keranjang');
        if (dto.quantity <= 0) {
            return this.prisma.cartItem.delete({ where: { id: itemId } });
        }
        return this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity: dto.quantity },
            include: { menu: true },
        });
    }
    async removeFromCart(userId, itemId) {
        const cart = await this.getOrCreateCart(userId);
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Item tidak ditemukan di keranjang');
        return this.prisma.cartItem.delete({ where: { id: itemId } });
    }
    async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        return { message: 'Keranjang berhasil dikosongkan' };
    }
    async checkout(userId) {
        const cart = await this.getOrCreateCart(userId);
        if (cart.items.length === 0)
            throw new common_1.BadRequestException('Keranjang kosong');
        return this.prisma.$transaction(async (tx) => {
            let totalPrice = 0;
            const orderItems = [];
            for (const item of cart.items) {
                totalPrice += item.menu.price * item.quantity;
                orderItems.push({
                    menuId: item.menuId,
                    quantity: item.quantity,
                    price: item.menu.price,
                });
            }
            const order = await tx.order.create({
                data: {
                    userId,
                    totalPrice,
                    items: { create: orderItems },
                },
                include: { items: { include: { menu: true } } },
            });
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            return order;
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map