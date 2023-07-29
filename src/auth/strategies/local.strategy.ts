import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const user = await authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
