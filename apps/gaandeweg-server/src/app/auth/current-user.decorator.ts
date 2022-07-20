import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * A decorator that returns the user object from the request object.
 * @param {unknown} data - The data to pass to the decorator.
 * @param {ExecutionContext} ctx - The execution context.
 * @returns The user object from the request object.
 */
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  }
);
