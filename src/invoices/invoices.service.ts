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
    const { page = 1, limit = 10 } = pagination;
    const [ invoices, total ] = await this.connInvoice.findAndCount({
      take : limit,
      skip : (page - 1) * limit,
      relations : {
        details : {
          product_ID : true,
        }
      },
    });

    return {
      invoices,
      meta : {
        page,
        limit,
        total,
        totalPages : Math.ceil(total / limit),
      }
    }
  }

  async findOneByID(invoice_ID : number){
    const invoice = await this.connInvoice.findOne({
      where : { invoice_ID },
      relations : {
        details : {
          product_ID : true,
        }
      }
    });

    if(!invoice) throw { message : 'La factura NO existe', status : 404 }

    return {
      message : 'Factura obtenida correctamente',
      invoice
    }
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

    const { city, zone, neighborhood, address, cellphone } = body;
    
    if(client.client_ID === '1' && (!city || !zone || !neighborhood || !address || !cellphone)){
        throw {  
          message : 'Para el cliente genérico, los campos city, zone, neighborhood, address y cellphone son obligatorios.',
          status : 400
        }
    }

    const fields = ['city', 'zone', 'neighborhood', 'address', 'cellphone'];

    fields.forEach(field => {
      body[field] = body[field] || client[field];
    });

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

      const price = item.price || product[0].price;

      item.price = price;
      item.total = price * item.quantity;
      subtotal += price * item.quantity;
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
      zone : body.zone,
      city : body.city,
      neighborhood : body.neighborhood,
      address : body.address,
      cellphone : body.cellphone
    });

    const invoiceSaved = await this.connInvoice.save(invoice);

    for(const item of productsListFiltered){
      // guardar el detalle de la factura
      const detail = this.connDetails.create({
        invoice_ID : invoiceSaved,
        product_ID : item,
        quantity : item.quantity,
        total : item.total,
        price : item.price
      });

      const detailSaved = await this.connDetails.save(detail);
    }

    return {
      message : 'Factura creada correctamente',
      invoice_ID : invoiceSaved.invoice_ID
    }
  }

  async update(invoice_ID : number, user_ID : string, body : UpdateInvoiceDto){
    const iva = body.iva ?? 0;
    const retefuente = body.retefuente ?? 0;
    const reteiva = body.reteiva ?? 0;

    const invoice = await this.connInvoice.findOne({
      where: { invoice_ID },
      relations: { 
        details: { product_ID: true } 
      }, 
    });

    if (!invoice) throw { message: 'La factura no existe', status: 404 };

    for (const detail of invoice.details) {
      await this.productService.update(detail.product_ID.product_ID, {
        stock: detail.product_ID.stock + detail.quantity,
      }, 'Factura', 'Reversión por actualización de factura');
    }

    // Eliminar detalles anteriores
    await this.connDetails.delete({ invoice_ID : invoice });

    const user = await this.userService.findOne(user_ID);
    if (!user) throw { message: 'El usuario no existe', status: 404 };

    if(!body.client_ID) throw { message : 'El ID del cliente es obligatorio', status : 404 }

    const { client } = await this.clientService.findOne(body.client_ID, 'client_ID');
    if (!client) throw { message: 'El cliente no existe', status: 404 };
    
    const { city, zone, neighborhood, address, cellphone } = body;

    if (client.client_ID === '1' && (!city || !zone || !neighborhood || !address || !cellphone)) {
      throw {  
        message: 'Para el cliente genérico, los campos city, zone, neighborhood, address y cellphone son obligatorios.',
        status: 400
      };
    }

    const fields = ['city', 'zone', 'neighborhood', 'address', 'cellphone'];

    fields.forEach(field => {
      body[field] = body[field] || client[field];
    });

    const productsListFiltered: ProductList[] = [];
    let subtotal = 0;
    let total = 0;

    if(!body.productsList || body.productsList.length < 1) 
      throw { message : 'Debe tener minimo un producto asociado', status : 409 }
    
    for (const item of body.productsList) {
      const product = await this.productService.findByProperty(item.product_ID, 'product_ID');
      if (!product[0]) throw { message: 'El producto no existe', status: 404 };
  
      if (product[0].stock < item.quantity)
        throw { message: 'No hay suficiente stock', status: 400 };
  
      if (item.quantity <= 0)
        throw { message: 'La cantidad no puede ser menor o igual a cero', status: 400 };
  
      const price = item.price || product[0].price;

      item.price = price;
      item.total = price * item.quantity;
      subtotal += price * item.quantity;
      total += item.total;
  
      // Descontar stock de nuevo
      await this.productService.update(product[0].product_ID, {
        stock: product[0].stock - item.quantity,
      }, 'Factura', 'Actualización de factura');
  
      productsListFiltered.push(item);
    }
  
    const updatedTotal = total + (total * iva / 100) - (total * retefuente / 100) - (total * reteiva / 100);

    // Actualizar datos de la factura
    await this.connInvoice.update(invoice_ID, {
      date_invoice: body.date_start || new Date(),
      date_end: body.date_end,
      type_payment: body.type_payment,
      subtotal: subtotal,
      IVA: iva,
      retefuente: retefuente,
      reteiva: reteiva,
      total: updatedTotal,
      client_ID: client,
      user_ID: user,
      zone : body.zone,
      city : body.city,
      neighborhood : body.neighborhood,
      address : body.address,
      cellphone : body.cellphone
    });

    for (const item of productsListFiltered) {
      const detail = this.connDetails.create({
        invoice_ID: invoice,   // referencia por ID
        product_ID: item,
        quantity: item.quantity,
        total: item.total,
        price : item.price
      });
  
      await this.connDetails.save(detail);
    }

    return {
      message : 'Factura actualizada correctamente'
    }
  }

  async remove(invoice_ID : number){

    const invoice = await this.connInvoice.findOne({
      where: { invoice_ID },
      relations: { 
        details: { product_ID: true } 
      }, 
    });

    if(!invoice) throw { message : 'La factura NO existe', status : 404 }
 
    for (const detail of invoice.details) {
      await this.productService.update(detail.product_ID.product_ID, {
        stock: detail.product_ID.stock + detail.quantity,
      }, 'Factura', 'Eliminacion de la factura: ' + invoice_ID);
    }

    await this.connInvoice.delete({ invoice_ID });

    return {
      message : 'Factura eliminada correctamente',
    }
  } 
}