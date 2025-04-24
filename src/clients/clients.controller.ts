import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { PaginationDto } from 'src/app/dto/pagination.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary : 'Traer todos los clientes paginados' })
  async findAll(@Query() pagination : PaginationDto) {
    try {
      return await this.clientsService.findAll(pagination);
    } catch (err) {
      errorHandler(err);
    }
  }

  @Get('one')
  @ApiOperation({ summary : 'Traer todo los clientes por un campo y un valor' })
  async findOne(@Query('value') value: string, @Query('property') property: string) {
    try {
      const client = await this.clientsService.findOne(value, property)

      return {
        message : 'Cliente encontrado correctamente',
        client
      }

    } catch(err){
      errorHandler(err);
    }
  }

  @Post()
  @ApiOperation({ summary : 'Registrar un cliente' })
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const { client } = await this.clientsService.create(createClientDto)

      return {
        message : 'Cliente creado correctamente',
        client
      }
    } catch(err){
      errorHandler(err);
    }
  }

  @Patch(':client_ID')
  @ApiOperation({ summary : 'Actualizar un cliente' })
  async update(@Param('client_ID') client_ID: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      await this.clientsService.update(client_ID, updateClientDto);

      return {
        message : 'Cliente actualizado correctamente',
      }

    } catch(err){
      errorHandler(err);
    }
  }

  @Delete(':client_ID')
  @ApiOperation({ summary : 'Eliminar un cliente' })
  async remove(@Param('client_ID') client_ID: string) {
    try {
      await this.clientsService.remove(client_ID)
      return {
        message : 'Cliente eliminado correctamente'
      }
    } catch(err){
      errorHandler(err);
    }
  }
}
