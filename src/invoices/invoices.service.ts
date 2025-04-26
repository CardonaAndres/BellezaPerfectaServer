import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto, ProductList } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { Details } from './entities/details.entity';
import { UsersService } from 'src/users/users.service';
import { ClientsService } from 'src/clients/clients.service';
import { ProductsService } from 'src/products/products.service';
import { PaginationDto } from 'src/app/dto/pagination.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private readonly connInvoice : Repository<Invoice>,
    @InjectRepository(Details) private readonly connDetails : Repository<Details>,
    private readonly userService : UsersService,
    private readonly clientService : ClientsService,
    private readonly productService : ProductsService
  ){} 

  async findAll(pagination : PaginationDto){

  }

  async findOneByID(invoice_ID : number){

  }

  async create(body : CreateInvoiceDto, user_ID : string){
    const iva = body.iva ?? 0;
    const retefuente = body.retefuente ?? 0;
    const reteiva = body.reteiva ?? 0;

    const user = await this.userService.findOne(user_ID);
    if(!user) throw { message : 'El usuario no existe', status : 404 };

    const { client } = await this.clientService.findOne(body.client_ID, 'client_ID');
    if(!client) throw { message : 'El cliente no existe', status : 404 };

    body.client_ID = client.client_ID;
    body.user_ID = user.user_ID;
    body.date_start = body.date_start || new Date();

    const productsListFiltered : ProductList[] = []
    let total = 0;
    let subtotal = 0;
    

    for(const item of body.productsList){

      const product = await this.productService.findByProperty(item.product_ID, 'product_ID');  
      if(!product[0]) throw { message : 'El producto no existe', status : 404 };
      
      if(product[0].stock < item.quantity) 
        throw { message : 'No hay suficiente stock', status : 400 };

      if(item.quantity <= 0) 
        throw { message : 'La cantidad no puede ser menor o igual a cero', status : 400 };

      item.total = product[0].price * item.quantity;
      subtotal += product[0].price * item.quantity;
      total += item.total;
      

      await this.productService.update(product[0].product_ID, {
          stock : product[0].stock - item.quantity,
      }, 'Factura', 'Creación de factura');
      
      productsListFiltered.push(item);
    }

    body.subtotal = subtotal;
    body.total = total + (total * iva / 100) - (total * retefuente / 100) - (total * reteiva / 100);

    const invoice = this.connInvoice.create({
      date_invoice : body.date_start,
      date_end : body.date_end,
      type_payment : body.type_payment,
      subtotal : body.subtotal,
      IVA : body.iva,
      retefuente : body.retefuente,
      reteiva : body.reteiva,
      total : body.total,
      client_ID : client,
      user_ID : user,
    });

    const invoiceSaved = await this.connInvoice.save(invoice);

    for(const item of productsListFiltered){
      // guardar el detalle de la factura
      const detail = this.connDetails.create({
        invoice_ID : invoiceSaved,
        product_ID : item,
        quantity : item.quantity,
        total : item.total,
      });

      const detailSaved = await this.connDetails.save(detail);
    }

    return {
      message : 'Factura creada correctamente',
    }
  }

  async update(invoice_ID : number, body : UpdateInvoiceDto){

  }

  async remove(invoice_ID : number){

  }
}
