import { ESex } from '../../shared/enums/sex.enum';
import { ERole } from '../enums/user.enum';
import { IGenericDictionary } from '../../shared/interfaces/generic.interface';

export interface IGeneralUser {
  emailAddress: string;
  firstName: string;
  id: number;
  lastName: string;
  pesel: string;
  phoneNumber: string;
  roles: ERole[];
  sex: ESex;
  specialties: IGenericDictionary[];
}

export interface IGeneralUserListItem {
  emailAddress: string;
  firstName: string;
  id: number;
  lastName: string;
  sex: ESex;
  specialties: string;
}
