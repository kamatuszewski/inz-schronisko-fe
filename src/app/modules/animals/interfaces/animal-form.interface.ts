import { ESex } from '../../shared/enums/sex.enum';

export interface ICreateAnimalRequest {
  birthDate: number,
  chipNumber: number,
  foundDate: string;
  foundPlace: string;
  id: number,
  name: string,
  sex: ESex,
  speciesId: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ICreateAnimalResponse {}
