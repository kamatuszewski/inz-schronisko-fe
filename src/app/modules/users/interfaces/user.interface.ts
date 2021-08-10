import { ESex } from '../../shared/enums/sex.enum';

export interface IGeneralUser {
  emailAddress: string
  firstName: string,
  id: number;
  lastName: string
  pesel: string,
  phoneNumber: string,
  sex: ESex,
}
