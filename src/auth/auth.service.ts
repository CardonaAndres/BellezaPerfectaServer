import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService : UsersService,
    private readonly jwtService: JwtService
  ){}

  async login(authDto : CreateAuthDto){
      const user = await this.userService.findOne(authDto.user_ID);
      if(!user) throw { message : 'El usuario con ese número de documento no existe', status : 404 }

      const passwordIsCorrect = await bcrypt.compare(authDto.password, user.password);
      if(!passwordIsCorrect) throw { message : 'Contraseña incorrecta', status : 400 }

      const { password, ...userWithOutPassword } = user;
      const token = await this.jwtService.signAsync(userWithOutPassword)

      return { 
        userWithOutPassword,
        token
      }
  }
  
  async register(user : CreateUserDto) {
    const isUserIdUsed = await this.userService.findOne(user.user_ID);
    if(isUserIdUsed) throw { message : 'El documento ya esta en uso', status : 409 }

    const isEmailUsed = await this.userService.findOneByEmail(user.email);
    if(isEmailUsed) throw { message: 'El email está en uso', status: 409 };

    const isCellphoneUsed = await this.userService.findOneByCellphone(user.cellphone);
    if(isCellphoneUsed) throw { message: 'El celular está en uso', status: 409 };

    const passwordHash = await bcrypt.hash(user.password, 10);

    await this.userService.create({
      ...user,
      password : passwordHash
    });

    const { password, ...userWithOutPassword } = user

    return userWithOutPassword

  }
  
  async logout(){
  
  }

}
