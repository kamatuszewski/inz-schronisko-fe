import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: {
    auth: 'http://localhost:8600/api/v1/auth'
  }
};
