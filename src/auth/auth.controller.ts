import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto : CreateAuthDto){
    try {
      const { userWithOutPassword, token } = await this.authService.login(authDto);

      return {
        message : 'Sesión iniciada correctamente',
        user : userWithOutPassword,
        token
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Post('/register')
  async register(@Body() user : CreateUserDto){
    try {
      const newUser = await this.authService.register(user)

      return {
        message : 'Usuario creado correctamente',
        user : newUser
      }

    } catch (err) {
      errorHandler(err);
    }
  }

  @Post('/logout')
  async logout(){
    try {

    } catch (err) {
      errorHandler(err);
    }
  }
}
