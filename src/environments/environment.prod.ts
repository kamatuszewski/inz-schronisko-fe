import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  apiUrl: {
    auth: 'http://localhost:8080/api/v1/auth',
    animal: 'http://localhost:8080/api/v1/animal'
  }
};
