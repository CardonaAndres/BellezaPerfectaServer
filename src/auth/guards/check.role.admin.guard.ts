import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'src/users/enums/roles.enum';

@Injectable()
export class CheckAdminRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { role_ID } = req.user;
  
    if(role_ID && role_ID !== Role.ADMIN)
      throw new ForbiddenException('No tienes permiso para realizar esta función')
    
    return true;
  }


}
