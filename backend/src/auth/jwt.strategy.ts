import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AuthUserPayload } from 'src/common/interfaces/auth-user-payload.interface';
import { UserRole } from 'src/common/enums/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: AuthUserPayload): Promise<AuthUserPayload> {
    if (!payload.personPublicId || !payload.role) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return payload;
  }
}
