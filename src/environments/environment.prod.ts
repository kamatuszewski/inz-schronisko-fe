import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  apiUrl: {
    auth: 'http://localhost:8080/api/auth',
    animals: 'http://localhost:8080/api/animals',
    dictionaries: 'http://localhost:8080/api/dictionaries'
  }
};
