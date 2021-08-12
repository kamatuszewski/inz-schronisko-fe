import { ESex } from '../../shared/enums/sex.enum';

// tslint:disable-next-line:no-empty-interface
export interface ICreateAnimalRequest extends IAnimalForm {}

// tslint:disable-next-line:no-empty-interface
export interface ISaveAnimalResponse {}

export interface IAnimalForm {
  birthDate: string,
  chipNumber: number,
  foundDate: string;
  foundPlace: string;
  id: number,
  name: string,
  sex: ESex,
  speciesId: number;
  statusId: number;
}

export interface IUpdateAnimalRequest {
  foundPlace: string;
  id: number,
  name: string,
  statusId: number;
}
