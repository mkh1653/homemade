import { UserRole } from '../enums/role.enum';

export interface AuthUserPayload {
  customerId: any;
  providerId: any;
  publicId: string;
  userId: number;
  userPublicId: string;
  personPublicId: string;
  customerPublicId?: string;
  providerPublicId?: string;
  role: UserRole;
  iat: number;
  exp: number;
}
