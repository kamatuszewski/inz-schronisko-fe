import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  apiUrl: {
    persons: 'http://localhost:8080/api/auth',
    animals: 'http://localhost:8080/api/animals',
    dictionaries: 'http://localhost:8080/api/dictionaries',
    adoptions: 'http://localhost:8080/api/adoptions',
    vetvisits: 'http://localhost:8080/api/vetvisits',
  }
};
