import * as moment from 'moment';
import { dateMomentFormat } from '../../core/commons/date-format.common';
import { IGeneralUser, IGeneralUserListItem, IVetSpecialty } from '../interfaces/user.interface';

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
            UserMapperService.checkIfNull(user.specialties[0]?.name, '(...)'),
          isVet: user.isVet
        }
      ))
    }
    return [];
  }

  public static mapSpecialties = (specialties :IVetSpecialty[]): IVetSpecialty[] => {
    if (specialties && specialties.length) {
      return specialties.map(specialty => ({
        id: specialty.id,
        name: specialty.name,
        obtainingDate: moment(specialty.obtainingDate).format(dateMomentFormat)
      }))
    }
    return specialties;
  }

  private static checkIfNull(name: string, suffix: string): string {
    if (!!name) {
      return `${name} ${suffix}`;
    }
    return '';
  }
}
