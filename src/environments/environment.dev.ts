import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: {
    auth: 'http://localhost:8600/api/v1/auth',
    animals: 'https://0b0bdce9-0be1-4cdd-b034-fd5752a61915.mock.pstmn.io/api/animals',
    dictionaries: 'https://0b0bdce9-0be1-4cdd-b034-fd5752a61915.mock.pstmn.io/api/dictionaries'
  }
};
