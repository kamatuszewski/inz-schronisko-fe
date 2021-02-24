import { EApiUrl } from './api-url.enum';

export interface IEnvironment {
  production: boolean;
  apiUrl: {[key in EApiUrl]: string};
}
