import { ERole } from '../../users/enums/user.enum';

export enum EOperation {
  SHOW_ANIMAL_LIST,
  ADD_ANIMAL
}

export const permissionsMap = new Map<EOperation, ERole[]>([
  [EOperation.SHOW_ANIMAL_LIST, [ERole.ALL]],
  [EOperation.ADD_ANIMAL, [ERole.EMPLOYEE, ERole.ADMIN]],
]);
