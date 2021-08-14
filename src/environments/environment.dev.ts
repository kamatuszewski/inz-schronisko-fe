import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: {
    persons: 'api/Persons',
    animals: 'api/Animals',
    dictionaries: 'api/Dictionaries',
    adoptions: 'api/Adoptions',
    vetvisits: 'api/VetVisits',
    treatments: 'api/Treatments',
    medicines: 'api/Medicines',
  }
};
