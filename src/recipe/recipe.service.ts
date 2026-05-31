import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.recipe.findMany({
      include: {
        menu: true,
      },
    });
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { menu: true },
    });
    if (!recipe) throw new NotFoundException('Resep tidak ditemukan');
    return recipe;
  }

  async findByMenu(menuId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { menuId },
      include: { menu: true },
    });
    if (!recipe) throw new NotFoundException('Resep untuk menu ini tidak ditemukan');
    return recipe;
  }

  async create(dto: CreateRecipeDto) {
    const menu = await this.prisma.menu.findUnique({ where: { id: dto.menuId } });
    if (!menu) throw new NotFoundException('Menu tidak ditemukan');

    const existing = await this.prisma.recipe.findUnique({ where: { menuId: dto.menuId } });
    if (existing) throw new ConflictException('Menu ini sudah memiliki resep');

    return this.prisma.recipe.create({ data: dto });
  }

  async update(id: number, dto: UpdateRecipeDto) {
    await this.findOne(id);
    return this.prisma.recipe.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.recipe.delete({ where: { id } });
  }
}