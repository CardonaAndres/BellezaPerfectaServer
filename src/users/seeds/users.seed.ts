import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { Role } from '../enums/roles.enum';

@Injectable()
export class UserSeedService implements OnModuleInit {
    constructor(@InjectRepository(User) private readonly conn: Repository<User>) {}

    async onModuleInit() {
        try {
            const user = await this.conn.findOneBy({ user_ID : '1032011946' })

            if(!user){
                const newUser = this.conn.create({
                    user_ID : '1032011946',
                    name : '',
                    email : '11cardona31@gmail.com',
                    cellphone : '3012524648',
                    address : 'Cr 00 #00 - 00',
                    password : await bcrypt.hash("As1032011946@", 10),
                    role_ID : Role.ADMIN
                });

                await this.conn.save(newUser)
            }    
            
        } catch (err) {
            errorHandler(err);
        }
    }
}