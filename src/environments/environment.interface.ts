import { EApiUrl } from './api-url.enum';

export interface IEnvironment {
  apiUrl: {[key in EApiUrl]: string};
  production: boolean;
}
