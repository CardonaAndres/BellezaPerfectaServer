import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Details } from './entities/details.entity';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule } from 'src/clients/clients.module';
import { ProductsModule } from 'src/products/products.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([ Invoice, Details ]),
    UsersModule,
    ClientsModule,
    ProductsModule,
    InventoryModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
