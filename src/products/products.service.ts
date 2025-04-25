import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/app/dto/pagination.dto';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly conn : Repository<Product>,
    private readonly inventoryService : InventoryService
  ){}

  async findAll(pagination : PaginationDto) {
    const { limit = 10, page = 1 } = pagination;
    const [products, total] = await this.conn.findAndCount({
      take : limit,
      skip : (page - 1) * limit
    });

    return {
      products,
      meta : {
        total,
        page,
        limit,
        last_page : Math.ceil(total / limit),
        has_more : (page * limit) < total
      }
    }
  }

  async findByProperty(value : string, property : string) {
    const propertiesAllowed = Object.keys(new CreateProductDto());

    if(!propertiesAllowed.includes(property)) 
      throw { message : 'La propiedad no es valida', status : 400 }

    const products = await this.conn.find({
      where :{
        [property] : value
      }
    });

    if(!products) 
      throw { message : 'No se ha encontrado el producto', status : 404 }

    return products;
    
  }

  async create(createProductDto: CreateProductDto) {
    const verifyProductID = await this.conn.findOneBy({ product_ID : createProductDto.product_ID });
    if(verifyProductID) throw { message : 'Utiliza otro código, este ya esta en uso', status : 409 }

    await this.conn.save(createProductDto);

    await this.inventoryService.create({
      type : 'Registrar el producto en el sistema',
      quantity : createProductDto.stock,
      reason : 'Creación de producto',
      product_ID : createProductDto.product_ID
    });
    
    return {
      product : createProductDto
    }
  }

  async update(
    product_ID: string, 
    updateProductDto: UpdateProductDto,
    type : string = 'Actualización del producto en el sistema',
    reason : string = 'Actualización de producto'
  ) {

    const product = await this.conn.findOneBy({ product_ID });
    if(!product) throw { message : 'No se ha encontrado el producto', status : 404 }   

    if (updateProductDto.product_ID && updateProductDto.product_ID !== product_ID) 
      throw { message: 'No se puede cambiar el codigo del producto', status: 400 };
    
    const productToUpdate = Object.assign(product, updateProductDto);

    await this.conn.save(productToUpdate);

    await this.inventoryService.create({
      type,
      quantity : productToUpdate.stock,
      reason,
      product_ID : productToUpdate.product_ID
    });

  }

  async remove(product_ID: string) {
    const product = await this.conn.findOneBy({ product_ID });
    if(!product) throw { message : 'No se ha encontrado el producto', status : 404 }
    await this.conn.delete({ product_ID });
    
  }
}
