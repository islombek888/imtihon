import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return (
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      null
    );
  },
);