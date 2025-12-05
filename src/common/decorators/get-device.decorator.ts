import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetDevice = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['user-agent'] || 'Unknown Device';
  },
);