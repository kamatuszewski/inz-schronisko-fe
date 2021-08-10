import { ERole } from '../../users/enums/user.enum';
import { permissionsMap, EOperation } from './permissions.common';

export interface ITabConfig {
  allowedRoles: ERole[]
  iconCode: string;
  label: string;
  redirectTo: string[];
}

export const tabConfig: ITabConfig[] = [
  {
    label: 'TABS.ANIMAL_LIST',
    redirectTo: ['animals'],
    allowedRoles: permissionsMap.get(EOperation.SHOW_ANIMAL_LIST),
    iconCode: 'pets'
  },
  {
    label: 'TABS.CREATE_ANIMAL',
    redirectTo: ['animals', 'create'],
    allowedRoles: permissionsMap.get(EOperation.ADD_ANIMAL),
    iconCode: 'add_circle'
  }
]
