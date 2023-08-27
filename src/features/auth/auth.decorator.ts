import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { AuthInfo } from './auth.interface';

export const Auth = createParamDecorator((data: any, ctx: ExecutionContext): AuthInfo => {
    const request = ctx.switchToHttp().getRequest()

    return {
        auth: request.payload,
        user: request.user
    }
})
