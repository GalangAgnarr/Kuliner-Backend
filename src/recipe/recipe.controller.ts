import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) { }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  @Get('menu/:menuId')
  findByMenu(@Param('menuId', ParseIntPipe) menuId: number) {
    return this.recipeService.findByMenu(menuId);
  }

  @Post()
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateRecipeDto) {
    return this.recipeService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRecipeDto) {
    return this.recipeService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.remove(id);
  }
}