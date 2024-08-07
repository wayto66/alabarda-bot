import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context);

    const random = Math.random();
    const check = random > 0.5;
    console.log({ check });
    return check;
  }
}
