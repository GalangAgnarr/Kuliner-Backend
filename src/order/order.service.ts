import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // Buat order baru (Prisma Transaction)
  async create(userId: number, dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const orderItems: { menuId: number; quantity: number; price: number }[] = [];

      for (const item of dto.items) {
        const menu = await tx.menu.findUnique({ where: { id: item.menuId } });
        if (!menu) throw new NotFoundException(`Menu id ${item.menuId} tidak ditemukan`);
        if (!menu.isAvailable) throw new BadRequestException(`Menu ${menu.name} tidak tersedia`);

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

  // Lihat semua order (Admin)
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { menu: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Lihat order milik user sendiri
  async findMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { menu: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Update status order (Admin)
  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}