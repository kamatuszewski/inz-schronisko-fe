import { ESex } from '../../shared/enums/sex.enum';

export interface ISimpleAnimal {
  id: number;
  name: string;
  sex: string;
  species: string;
  status: string;
}

export interface IAnimalDetailsRequest {
  id: number;
}

export interface IAnimalDetailsResponse {
  adoptions: IGeneralAdoption[];
  data: IGeneralAnimal;
  vetVisits: IGeneralVetVisit[];
}

export interface IGeneralAnimal {
  birthDate: string,
  chipNumber: number,
  deathDate?: string
  foundDate: string,
  foundPlace: string,
  id: number,
  name: string,
  sex: ESex,
  species: string,
  status: string,
}

export interface IGeneralAdoption {
  adopter: IGeneralAdopter;
  adoptionDate: string,
  controlDate: string
  employee: IGeneralEmployee;
  id: number;
}

export interface IGeneralAdopter {
  address: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
}

export interface IGeneralEmployee {
  firstName: string;
  id: number;
  lastName: string;
}

export interface IGeneralVetVisit {
  description: string;
  id: number;
  visitDateTime: string;
}

export interface IAnimalDetailsAdoption {
  adopterFullName: string;
  adoptionDate: string;
  controlDate: string;
  employeeFullName: string;
  id: number;
}
