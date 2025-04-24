import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CheckAdminRoleGuard } from 'src/auth/guards/check.role.admin.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary : 'Iniciar Sesión' })
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

  @UseGuards(AuthGuard, CheckAdminRoleGuard)
  @Post('/register')
  @HttpCode(200) // PENDIENTE añadir guard, esto solo lo podra hacer un usuario administrados
  @ApiOperation({ summary : 'Registrar un usuario' })
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
}
