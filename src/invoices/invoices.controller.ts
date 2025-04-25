import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';


@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary : 'Crear una factura' })
  async create(@Request() req : any, @Body() body : CreateInvoiceDto){
    try {
      return await this.invoicesService.create(body, req.user.user_ID);
    } catch (err) {
      errorHandler(err);
    }
  }
}
