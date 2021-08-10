import { ERole } from '../../users/enums/user.enum';

export interface IAllowedRole {
  hasSomeAllowedRole: (roles: ERole[]) => boolean;
}
