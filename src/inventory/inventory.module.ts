import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Inventory } from './entities/inventory.entity';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ Product, Inventory ])],
  providers: [InventoryService ],
  controllers: [InventoryController],
  exports: [InventoryService],
})

export class InventoryModule {}
