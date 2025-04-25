import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/app/dto/pagination.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private readonly conn : Repository<Client>){}

  async findAll(pagination : PaginationDto) {
    const { limit = 10, page = 1 } = pagination;
    const [ clients, total ] = await this.conn.findAndCount({
      take : limit,
      skip : (page - 1) * limit,
      where :{
        client_ID : Not('1')
      }
    });

    return {
      clients,
      meta : {
        total,
        page,
        limit,
        last_page : Math.ceil(total / limit)
      }
    }

  }

  async findOne(value: string, property: string) {
    const properties = Object.keys(new CreateClientDto());
    if(!properties.includes(property)) 
      throw { message : 'El campo no es válido', status : 400 }

    const client = await this.conn.findOne({
      where : { 
        [property] : value,
        client_ID : Not('1') 
      }
    });

    if(!client) 
      throw { message : 'El cliente no existe', status : 404 }

    return {
      client
    }

  }

  async create(createClientDto: CreateClientDto) {
    const verifyClientID = await this.conn.findOneBy({ client_ID : createClientDto.client_ID});
    if(verifyClientID) 
      throw { message : 'El cliente con ese número de documento ya existe', status : 409 }

    await this.conn.save(createClientDto);

    return {
      client : createClientDto
    }

  }

  async update(client_ID : string ,updateClientDto: UpdateClientDto) {
    if(updateClientDto.client_ID && updateClientDto.client_ID !== client_ID)
      throw { 
        message : 'El número de documento del cliente no se puede cambiar, eliminalo y crea un nuevo',
        status : 409 
      }
  

    const client = await this.conn.findOneBy({ client_ID });
    if(!client) throw { message : 'El cliente no existe', status : 404 }

    await this.conn.save(Object.assign(client, updateClientDto))
  }

  async remove(client_ID: string) {
    const client = await this.conn.findOneBy({ client_ID });
    if(!client) throw { message : 'El cliente no existe', status : 404 }
    await this.conn.delete(client_ID);
  }
}
