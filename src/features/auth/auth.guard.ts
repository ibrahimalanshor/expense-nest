import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const accessToken = request.headers.authorization

    if (!accessToken) {
      throw new UnauthorizedException('Access token required')
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken)
      const user = await this.userService.findById(payload.userId)

      request['auth'] = payload
      request['user'] = user

      return true
    } catch (err) {
      throw new UnauthorizedException('Unauthorized', { cause: err })
    }
  }
}
