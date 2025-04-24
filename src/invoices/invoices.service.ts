import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { Details } from './entities/details.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private readonly connInvoice : Repository<Invoice>,
    @InjectRepository(Details) private readonly connDetails : Repository<Details>,
  ){} 


}
