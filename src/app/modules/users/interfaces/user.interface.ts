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
  pesel: string
  phoneNumber: string;
  PWZNumber: string;
  quitDate: string;
  roleId: 1;
  roles?: IGenericDictionary[];
  salary: number;
  sex: ESex;
  vetSpecialties: IVetSpecialty[];
}

export interface IVetSpecialty {
  id: number;
  obtainingDate: string;
}

export interface IUpdateUserForm {
  address: string;
  firstName: string;
  id: number;
  lastName: string;
  pesel: string
  phoneNumber: string;
  sex: ESex;
}

export interface IUserRoleForm {
  attendance?: string;
  hireDate?: string;
  joiningDate?: string;
  PWZNumber?: string;
  quitDate?: string;
  roleId: number;
  salary?: number;
}
