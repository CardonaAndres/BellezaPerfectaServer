import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/app/dto/pagination.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary : 'Todos los productos con su paginación' })
  async findAll(@Query() pagination : PaginationDto) {
    try {
      return await this.productsService.findAll(pagination);
    } catch (err){
      errorHandler(err);
    }
  }

  @Get('/find/')
  @ApiOperation({ summary : 'Todos los productos encontrados por una clave y valor' })
  async findBy(@Query('value') value : string, @Query('property') property : string) {
    try {
      if(!value || !property) 
        throw { message : 'No se ha enviado el valor o la propiedad a buscar', status : 400 }

      return {
        message : 'Productos encontrados',
        products : await this.productsService.findByProperty(value, property)
      }

    } catch (err){
      errorHandler(err);
    };
  }

  @Post()
  @ApiOperation({ summary : 'Crear un producto' })
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const { product } = await this.productsService.create(createProductDto)

      return {
        message : 'Producto creado con exito',
        product
      }
    } catch (err){
      errorHandler(err);
    }
  }

  @Patch(':product_ID')
  @ApiOperation({ summary : 'Actualizar un producto' })
  async update(@Param('product_ID') product_ID: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      await this.productsService.update(product_ID, updateProductDto);
      return {
        message : 'Producto actualizado con exito'
      }

    } catch (err){
      errorHandler(err);
    }
  }

  @Delete(':product_ID')
  @ApiOperation({ summary : 'Eliminar un producto' })
  async remove(@Param('product_ID') product_ID: string) {
    try {
      await this.productsService.remove(product_ID);

      return {
        message : 'Producto eliminado correctamente'
      }
    } catch (err){
      errorHandler(err);
    }
  }
}
