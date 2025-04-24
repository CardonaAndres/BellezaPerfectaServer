import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { PaginationDto } from 'src/app/dto/pagination.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory) private readonly conn : Repository<Inventory>,
    @InjectRepository(Product) private readonly connProducts : Repository<Product>,
  ){}

  async findAll(product_ID : string, pagination : PaginationDto) {
    const { limit = 10, page = 1 } = pagination;
    const [ records, total ] = await this.conn.findAndCount({
      take : limit,
      skip : limit * (page - 1),
      where : {
        product : { product_ID : product_ID }
      }
    });

    return {
      records,
      meta : {
        total,
        page,
        limit,
        last_page : Math.ceil(total / limit),
      }
    }
  }

  async create(createInventoryDto: CreateInventoryDto) {
    const product = await this.connProducts.findOneBy({
      product_ID : createInventoryDto.product_ID
    });

    if(!product) throw { message : 'El producto no existe', status : 404 }

    await this.conn.save({
      ...createInventoryDto,
      product : product
    });

  }

}
