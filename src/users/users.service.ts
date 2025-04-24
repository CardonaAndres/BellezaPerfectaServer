import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/app/dto/pagination.dto';
import { Role } from './enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly conn : Repository<User>){}

  async findAll(user_ID : string, pagination : PaginationDto) {
    const { limit = 10, page = 1 } = pagination;
    const [ users, total ] = await this.conn.findAndCount({
      take : limit,
      skip : (page - 1) * limit,
      where : { user_ID : Not(user_ID) },
    });

    return {
      users,
      meta :{
        page,
        limit,
        total,
        last_page : Math.ceil(total / limit),
      }
    }
  }

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

  async update(body: UpdateUserDto, user_ID: string, req: any) {
    const { role_ID } = req.user;
  
    // Determinar el ID del usuario a actualizar
    const targetUserID = user_ID || (role_ID === Role.ADMIN ? body.user_ID : null);
  
    if (!targetUserID) throw { message: 'No tienes permisos para actualizar este usuario', status: 403 };
  
    const user = await this.conn.findOneBy({ user_ID: targetUserID });
    if (!user) throw { message: 'El usuario no existe', status: 404 };
  
    if (body.password) body.password = await bcrypt.hash(body.password, 10);
  
    // Actualizar usuario
    const updatedUser = await this.conn.save(Object.assign(user, body));
  
    // Eliminar el password antes de responder
    const { password, ...userWithoutPassword } = updatedUser;
  
    return {
      message: 'Usuario actualizado',
      user: userWithoutPassword,
    };
  }
  
}
