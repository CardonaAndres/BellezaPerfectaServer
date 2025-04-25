import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Controller, Get, UseGuards, Request, Query, Patch, Body, Delete, Param } from '@nestjs/common';
import { CheckAdminRoleGuard } from 'src/auth/guards/check.role.admin.guard';
import { PaginationDto } from 'src/app/dto/pagination.dto';
import { errorHandler } from 'src/app/middlewares/error.handler';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(CheckAdminRoleGuard)
  async findAllUsers(@Query() pagination : PaginationDto, @Request() req : any){
    try {
      if(!pagination.limit) pagination.limit = 10;
      if(!pagination.page) pagination.page = 1;

      const { user_ID } = req.user;

      return await this.usersService.findAll(user_ID, pagination);

    } catch(err) {
      errorHandler(err);
    }
  }
  
  @Get('/me')
  async findMe(@Request() req : any) {
    try {
      const { user_ID } = req.user;

      const user = await this.usersService.findOne(user_ID);  
      if(!user) throw { status : 404, message : 'User not found' };

      const  {password, ...userWithOutPassword } = user;

      return {
        user : userWithOutPassword
      }

    } catch(err) {
      errorHandler(err);
    }
  }

  @Patch('/')
  @ApiOperation({ 
    summary : 'Enpoind para actualizar usuarios desde la parte administrativa y desde el permil del usuaio' 
  })
  async updateMe(
    @Query('user_ID') user_ID : string, @Request() req : any, @Body() body : UpdateUserDto
  ) {
    try {
        return await this.usersService.update(body, user_ID, req); 
    } catch(err) {
      errorHandler(err);
    }
  }

  @ApiOperation({ summary : 'Enpoind para eliminar un usuario desde la parte administrativa' })
  @Delete('/:user_ID')
  @UseGuards(CheckAdminRoleGuard)
  async deleteUser(@Param('user_ID') user_ID : string) {
    try {
      return await this.usersService.remove(user_ID);
    } catch(err) {
      errorHandler(err);
    }
  }

}
