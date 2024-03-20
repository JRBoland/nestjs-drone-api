import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { dbg } from '../helpers/debug-helper';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      dbg(this, 'no role metadata');
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Added safety checks
    if (!user) {
      dbg(this, 'no metadata');
      return false;
    }

    const hasRole = () => user.roles.some((role) => roles.includes(role));
    dbg(this, 'hasRole: ', hasRole());
    return hasRole();
  }
}
