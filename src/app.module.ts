import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { database_credentials } from './app/configs/app';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { Product } from './products/entities/product.entity';
import { Inventory } from './inventory/entities/inventory.entity';
import { InvoicesModule } from './invoices/invoices.module';
import { Invoice } from './invoices/entities/invoice.entity';
import { Details } from './invoices/entities/details.entity';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: database_credentials.type,
      host: database_credentials.host,
      port: database_credentials.port,
      username: database_credentials.username,
      password: database_credentials.password,
      database: database_credentials.database,
      entities: [
        User, 
        Client,
        Product,
        Inventory,
        Invoice,
        Details
      ],
      synchronize: true,
    }),
    AuthModule, 
    UsersModule, 
    ClientsModule, 
    ProductsModule, 
    InventoryModule, 
    InvoicesModule, 
    ReportsModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}