import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Details } from './entities/details.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ Invoice, Details ])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
