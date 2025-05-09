import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientSeedService } from './seeds/clients.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientsService, ClientSeedService
  ],
  exports : [ClientsService],
})
export class ClientsModule {}
