import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ Product, Inventory ])],
  controllers: [ProductsController],
  providers: [ProductsService, InventoryService],
  exports : [ProductsService],
})
export class ProductsModule {}
