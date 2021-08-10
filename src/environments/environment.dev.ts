import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: {
    auth: 'api/Auth',
    animals: 'api/Animals',
    dictionaries: 'api/Dictionaries'
  }
};
