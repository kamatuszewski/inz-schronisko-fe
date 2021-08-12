import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { permissionsMap, EOperation } from '../../core/commons/permissions.common';
import { IListConfig } from '../interfaces/list-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ListUtilsService {
  constructor(private authService: AuthService) {
  }

  public prepareParamListConfig = (param: string, object: IListConfig, value: string | boolean, operation: EOperation): void => {
    if (this.authService.hasSomeAllowedRole(...permissionsMap.get(operation))) {
      object[param] = value;
    }
  }
}
