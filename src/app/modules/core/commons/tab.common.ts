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
  },
  {
    label: 'TABS.CREATE_ADOPTION',
    redirectTo: ['animals', 'adopt'],
    allowedRoles: permissionsMap.get(EOperation.ADD_ADOPTION),
    iconCode: 'add_business'
  },
  {
    label: 'TABS.CREATE_VET_VISIT',
    redirectTo: ['animals', 'vet-visit'],
    allowedRoles: permissionsMap.get(EOperation.ADD_VET_VISIT),
    iconCode: 'add_business'
  },
  {
    label: 'TABS.EMPLOYEE_LIST',
    redirectTo: ['users/employees'],
    allowedRoles: permissionsMap.get(EOperation.SHOW_EMPLOYEE_LIST),
    iconCode: 'groups'
  },
  {
    label: 'TABS.USER_LIST',
    redirectTo: ['users'],
    allowedRoles: permissionsMap.get(EOperation.SHOW_USER_LIST),
    iconCode: 'supervised_user_circle'
  },
  {
    label: 'TABS.CREATE_USER',
    redirectTo: ['users', 'create'],
    allowedRoles: permissionsMap.get(EOperation.ADD_USER),
    iconCode: 'person_add_alt'
  }
]
