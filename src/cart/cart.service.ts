import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Ambil atau buat cart user
  async getOrCreateCart(userId: number) {
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

  // Tambah item ke keranjang
  async addToCart(userId: number, dto: AddToCartDto) {
    const menu = await this.prisma.menu.findUnique({ where: { id: dto.menuId } });
    if (!menu) throw new NotFoundException('Menu tidak ditemukan');
    if (!menu.isAvailable) throw new BadRequestException('Menu tidak tersedia');

    const cart = await this.getOrCreateCart(userId);

    // Cek apakah menu sudah ada di keranjang
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, menuId: dto.menuId },
    });

    if (existingItem) {
      // Update quantity jika sudah ada
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + dto.quantity },
        include: { menu: true },
      });
    }

    // Tambah item baru
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        menuId: dto.menuId,
        quantity: dto.quantity,
      },
      include: { menu: true },
    });
  }

  // Lihat isi keranjang
  async getCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);
    const total = cart.items.reduce((sum, item) => sum + item.menu.price * item.quantity, 0);
    return { ...cart, total };
  }

  // Update quantity item
  async updateCartItem(userId: number, itemId: number, dto: UpdateCartItemDto) {
    const cart = await this.getOrCreateCart(userId);
    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Item tidak ditemukan di keranjang');

    if (dto.quantity <= 0) {
      return this.prisma.cartItem.delete({ where: { id: itemId } });
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
      include: { menu: true },
    });
  }

  // Hapus item dari keranjang
  async removeFromCart(userId: number, itemId: number) {
    const cart = await this.getOrCreateCart(userId);
    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Item tidak ditemukan di keranjang');

    return this.prisma.cartItem.delete({ where: { id: itemId } });
  }

  // Kosongkan keranjang
  async clearCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { message: 'Keranjang berhasil dikosongkan' };
  }

  // Checkout keranjang → jadi Order
  async checkout(userId: number) {
    const cart = await this.getOrCreateCart(userId);
    if (cart.items.length === 0) throw new BadRequestException('Keranjang kosong');

    return this.prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const orderItems: { menuId: number; quantity: number; price: number }[] = [];

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

      // Kosongkan keranjang setelah checkout
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return order;
    });
  }
}