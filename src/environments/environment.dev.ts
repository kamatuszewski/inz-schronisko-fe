import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: {
    persons: 'api/Persons',
    animals: 'api/Animals',
    dictionaries: 'api/Dictionaries'
  }
};
