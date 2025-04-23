import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { errorHandler } from 'src/app/middlewares/error.handler';

@Injectable()
export class ClientSeedService implements OnModuleInit {
    constructor(@InjectRepository(Client) private readonly conn: Repository<Client>) {}

    async onModuleInit() {
        try {
            const contactGenericExist = await this.conn.findOneBy({
                client_ID : '1'
            });

            if(!contactGenericExist){
                await this.conn.save({
                    client_ID : '1',
                    document_type : 'CC',
                    name : 'CLIENT GENERIC',
                    city : 'BOGOTA',
                    zone : 'ZONA 1',
                    neighborhood : 'NEIGHBORHOOD GENERIC',
                    address : 'ADDRESS GENERIC',
                    cellphone : '3111111111'
                });
            }

        } catch (err) {
            errorHandler(err);
        }
    }
}