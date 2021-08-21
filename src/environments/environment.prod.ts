import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  apiUrl: {
    persons: 'https://shelter-api-app.azurewebsites.net/api/Persons',
    animals: 'https://shelter-api-app.azurewebsites.net/api/Animals',
    dictionaries: 'https://shelter-api-app.azurewebsites.net/api/Dictionaries',
    adoptions: 'https://shelter-api-app.azurewebsites.net/api/Adoptions',
    vetvisits: 'https://shelter-api-app.azurewebsites.net/api/VetVisits',
    treatments: 'https://shelter-api-app.azurewebsites.net/api/Treatments',
    medicines: 'https://shelter-api-app.azurewebsites.net/api/Medicines',
  }
};
