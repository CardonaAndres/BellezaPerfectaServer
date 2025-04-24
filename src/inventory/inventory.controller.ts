import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from 'src/app/dto/pagination.dto';

@UseGuards(AuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('/:product_ID')
  @ApiOperation({ summary : 'Obtener todos los registros de un solo producto' })
  async findAllProductRecords(
    @Param('product_ID') product_ID : string, @Query() pagination : PaginationDto
  ){
    try {
      if(!pagination.limit) pagination.limit = 10;
      if(!pagination.page) pagination.page = 1;

      return await this.inventoryService.findAll(product_ID, pagination);
    } catch (err) {
      errorHandler(err);
    }
  }
 
}
