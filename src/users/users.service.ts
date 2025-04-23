import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly conn : Repository<User>){}

  async findOne(user_ID: string) {
    const user = await this.conn.findOneBy({ user_ID })
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.conn.findOneBy({ email })
    return user;
  }

  async findOneByCellphone(cellphone : string){
    const user = await this.conn.findOneBy({ cellphone });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    await this.conn.save(createUserDto);
  }

}
