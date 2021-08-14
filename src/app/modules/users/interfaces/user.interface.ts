import { ESex } from '../../shared/enums/sex.enum';
import { IGenericDictionary } from '../../shared/interfaces/generic.interface';

export interface IGeneralUser {
  emailAddress: string;
  firstName: string;
  id: number;
  lastName: string;
  pesel: string;
  phoneNumber: string;
  roles: IGenericDictionary[];
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

export interface IUserForm {
  address: string;
  attendance: string
  emailAddress: string;
  firstName: string;
  hireDate: string;
  joiningDate: string;
  lastName: string;
  password: string;
  PESEL: string
  phoneNumber: string;
  PWZNumber: string;
  quitDate: string;
  roleId: 1;
  salary: number;
  sex: ESex;
}
