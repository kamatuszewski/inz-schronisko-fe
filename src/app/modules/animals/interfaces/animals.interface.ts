import { ESex } from '../../shared/enums/sex.enum';
import { IGenericDictionary } from '../../shared/interfaces/generic.interface';
import { IVetSpecialty } from '../../users/interfaces/user.interface';

export interface ISimpleAnimal {
  birthDate: string;
  id: number;
  name: string;
  sex: string;
  species: string;
  status: string;
}

export interface ISimplePayload {
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
  species: IGenericDictionary,
  status: IGenericDictionary,
}

export interface IGeneralAdoption {
  adopter: IGeneralAdopter;
  adoptionDate: string,
  employee: IGeneralEmployee;
  id: number;
  notes?: string;
}

export interface IGeneralAdopter {
  address: string;
  emailAddress: string;
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
  details: IAnimalDetailsAdopterContact;
  employeeFullName: string;
  id: number;
}

export interface IAnimalDetailsAdopterContact {
  address: string;
  emailAddress: string;
  id: number;
  notes?: string;
  phoneNumber: string;
}

export interface IAnimalAdoptionForm {
  adopterId: number,
  adoptionDate: string,
  animalId: number,
  employeeId: number
  isOwnerPickup: true,
  notes?: string,
}

export interface IAnimalsGroupBySpecies {
  animals: ISimpleAnimal[];
  species: string;
}

export interface IAnimalVetVisitForm {
  animalId: number;
  description: string;
  id: number;
  medicines: IMedicines[];
  treatments: ITreatments[]
  vetId: number;
  visitDate: string;
}

export interface IMedicines {
  amount: number;
  id: string;
  name: string;
}

export interface ITreatments {
  id: string;
}

export interface IVetVisits {
  animal: ISimpleAnimal;
  description: string;
  id: number;
  medicines: IMedicines[];
  treatments: ITreatments[];
  vet: ISimpleVet;
  visitDate: string;
}

export interface ISimpleVet {
  firstName: string;
  id: number;
  lastName: string;
  sex: ESex;
  specialties: IVetSpecialty[];
}
