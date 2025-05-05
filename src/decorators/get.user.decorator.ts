import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthUser } from 'src/types/types';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): IAuthUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
