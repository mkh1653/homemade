import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from 'src/common/enums/role.enum';
import { AuthUserPayload } from 'src/common/interfaces/auth-user-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email, [
      'person',
      'person.customers',
      'person.providers',
    ]);

    if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
      return null;
    }

    return user;
  }

  async login(user: User, role: UserRole) {
    const payload: AuthUserPayload = {
      userId: user.id,
      userPublicId: user.publicId,
      personPublicId: user.person.publicId,
      customerPublicId: undefined,
      providerPublicId: undefined,
      role: role,
      iat: undefined,
      exp: undefined,
    };

    switch (role) {
      case UserRole.CUSTOMER:
        const customer = user.person.customers?.find(c => true);
        if (!customer) {
          throw new BadRequestException('Customer profile not found for this user.');
        }
        payload.customerPublicId = customer.publicId;
        break;
      case UserRole.PROVIDER:
        const provider = user.person.providers?.find(p => true);
        if (!provider) {
          throw new BadRequestException('Provider profile not found for this user.');
        }
        payload.providerPublicId = provider.publicId;
        break;
      case UserRole.SUPPORT:
        break;
      default:
        throw new BadRequestException('Invalid role specified for login.');
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
