import { ERole } from '../../users/enums/user.enum';

export interface IProfile {
  firstName: string;
  id: number;
  lastName: string;
  roles: ERole[];
}
