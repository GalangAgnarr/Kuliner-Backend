import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { RecipeModule } from './recipe/recipe.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [PrismaModule, AuthModule, MenuModule, OrderModule, RecipeModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
