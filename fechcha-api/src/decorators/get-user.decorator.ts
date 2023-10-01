import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator(
  (metadata, contex: ExecutionContext) => contex.switchToHttp().getRequest().user,
);
