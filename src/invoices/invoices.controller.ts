import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { PaginationDto } from 'src/app/dto/pagination.dto';
import { 
  Controller, 
  Get, 
  Post, 
  Body,
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Request, 
  Query, 
  ParseIntPipe,
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @ApiOperation({ summary : 'Listar facturas' })
  async findAll(@Query() pagination : PaginationDto){
    try {
      return await this.invoicesService.findAll(pagination);
    } catch (err) {
      errorHandler(err);
    }
  } 

  @Get(':invoice_ID')
  @ApiOperation({ summary : 'Obtener una factura por ID' })
  async findOne(@Param('invoice_ID', ParseIntPipe) invoice_ID : number){
    try {
      return await this.invoicesService.findOneByID(invoice_ID);
    } catch (err) {
      errorHandler(err);
    }
  }

  @Get('/client/:client_ID/')
  @ApiOperation({ summary : 'Obtener todas las facturas de un usuario' })
  async findAllByClient(@Param('client_ID') client_ID : string, @Query() pagination : PaginationDto){
    try {
      return await this.invoicesService.findAllByClient(client_ID, pagination);
    } catch (err) {
      errorHandler(err);
    }
  }

  @Post()
  @ApiOperation({ summary : 'Crear una factura' })
  async create(@Request() req : any, @Body() body : CreateInvoiceDto){
    try {
      return await this.invoicesService.create(body, req.user.user_ID);
    } catch (err) {
      errorHandler(err);
    }
  }

  @Patch('/:invoice_ID')
  @ApiOperation({ summary : 'Actualizar una factura' })
  async update(
    @Param('invoice_ID', ParseIntPipe) invoice_ID : number, 
    @Request() req : any,
    @Body() body : UpdateInvoiceDto 
  ){
    try {
      return await this.invoicesService.update(invoice_ID, req.user.user_ID, body);
    } catch (err){
      errorHandler(err);
    }
  }

  @Delete('/:invoice_ID')
  @ApiOperation({ summary : 'ELiminar una factura' })
  async remove(@Param('invoice_ID' ,ParseIntPipe) invoice_ID : number ){
    try {
      return await this.invoicesService.remove(invoice_ID);
    } catch(err) {
      errorHandler(err);
    }
  }
}