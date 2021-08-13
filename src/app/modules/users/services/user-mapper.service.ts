import { IGeneralUser, IGeneralUserListItem } from '../interfaces/user.interface';

export class UserMapperService {
  public static generalUsersToGeneralUserListMap = (users: IGeneralUser[]): IGeneralUserListItem[] => {
    if (users && users.length) {
      return users.map(user => (
        {
          id: user.id,
          emailAddress: user.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          sex: user.sex,
          specialties: user.specialties.length === 1 ?
            user.specialties[0]?.name :
            UserMapperService.checkIfNull(user.specialties[0]?.name, '(...)')
        }
      ))
    }
    return [];
  }

  private static checkIfNull(name: string, suffix: string): string {
    if (!!name) {
      return `${name} ${suffix}`;
    }
    return '';
  }
}
