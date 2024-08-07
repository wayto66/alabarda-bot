import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as crypto from 'crypto';

@Injectable()
export class EndpointGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const body = req.body;
    if (!body) throw new UnauthorizedException('No Data found');

    const signature = req.headers['x-hmac-signature'];
    const secret = process.env.HMAC_SECRET;

    if (!signature) {
      throw new UnauthorizedException('No HMAC signature found');
    }

    const hash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (hash !== signature) {
      throw new UnauthorizedException('Invalid HMAC signature');
    }

    return true;
  }
}
