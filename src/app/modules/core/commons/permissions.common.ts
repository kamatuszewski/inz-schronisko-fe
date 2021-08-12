import { ERole } from '../../users/enums/user.enum';

export enum EOperation {
  SHOW_ANIMAL_LIST,
  SHOW_ANIMAL_DETAILS,
  ADD_ANIMAL,
  UPDATE_ANIMAL,
  REMOVE_ANIMAL,
  SHOW_ANIMAL_ADOPTIONS,
  SHOW_ANIMAL_VET_VISITS,
  SHOW_USER_LIST
}

export const permissionsMap = new Map<EOperation, ERole[]>([
  [EOperation.SHOW_ANIMAL_LIST, [ERole.ALL]],
  [EOperation.SHOW_ANIMAL_DETAILS, [ERole.ALL]],
  [EOperation.ADD_ANIMAL, [ERole.EMPLOYEE, ERole.ADMIN]],
  [EOperation.UPDATE_ANIMAL, [ERole.EMPLOYEE, ERole.ADMIN]],
  [EOperation.REMOVE_ANIMAL, [ERole.ADMIN]],
  [EOperation.SHOW_ANIMAL_ADOPTIONS, [ERole.ADMIN]],
  [EOperation.SHOW_ANIMAL_VET_VISITS, [ERole.ADMIN]],
  [EOperation.SHOW_USER_LIST, [ERole.ADMIN]],
]);
