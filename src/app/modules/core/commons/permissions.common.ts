import { ERole } from '../../users/enums/user.enum';

export enum EOperation {
  SHOW_ANIMAL_LIST,
  SHOW_ANIMAL_DETAILS,
  SHOW_ANIMAL_ADOPTIONS,
  SHOW_ANIMAL_VET_VISITS,

  ADD_ANIMAL,
  UPDATE_ANIMAL,
  REMOVE_ANIMAL,

  ADD_ADOPTION,
  REMOVE_ADOPTION,

  SHOW_EMPLOYEE_LIST,
  SHOW_EMPLOYEE_DETAILS,
  SHOW_USER_LIST,
  SHOW_DETAILS_USER,

  ADD_USER,
  EDIT_USER,

  ADD_SPECIALIST,
  ASSIGN_SPECIALIST,
  REMOVE_SPECIALIST,

  ADD_MEDICINES,
  ADD_TREATMENT,
  REMOVE_MEDICINES,
  REMOVE_TREATMENT,

  ADD_VET_VISIT,
  EDIT_VET_VISIT
}

export const permissionsMap = new Map<EOperation, ERole[]>([
  [EOperation.SHOW_ANIMAL_LIST, [ERole.ALL]],
  [EOperation.SHOW_ANIMAL_DETAILS, [ERole.ALL]],
  [EOperation.SHOW_ANIMAL_ADOPTIONS, [ERole.ALL]],
  [EOperation.SHOW_ANIMAL_VET_VISITS, [ERole.ALL]],

  [EOperation.ADD_ANIMAL, [ERole.EMPLOYEE, ERole.ADMIN]],
  [EOperation.UPDATE_ANIMAL, [ERole.EMPLOYEE, ERole.ADMIN]],
  [EOperation.REMOVE_ANIMAL, [ERole.ADMIN]],

  [EOperation.ADD_ADOPTION, [ERole.EMPLOYEE, ERole.VET]],
  [EOperation.REMOVE_ADOPTION, [ERole.EMPLOYEE, ERole.VET]],

  [EOperation.SHOW_EMPLOYEE_LIST, [ERole.ALL]],
  [EOperation.SHOW_EMPLOYEE_DETAILS, [ERole.ALL]],
  [EOperation.SHOW_USER_LIST, [ERole.ADMIN]],
  [EOperation.SHOW_DETAILS_USER, [ERole.ALL]],

  [EOperation.ADD_USER, [ERole.ALL]],
  [EOperation.EDIT_USER, [ERole.ALL]],

  [EOperation.ADD_SPECIALIST, [ERole.ALL]],
  [EOperation.ASSIGN_SPECIALIST, [ERole.ALL]],
  [EOperation.REMOVE_SPECIALIST, [ERole.ALL]],

  [EOperation.ADD_TREATMENT, [ERole.ALL]],
  [EOperation.ADD_MEDICINES, [ERole.ALL]],
  [EOperation.REMOVE_TREATMENT, [ERole.ALL]],
  [EOperation.REMOVE_MEDICINES, [ERole.ALL]],
  [EOperation.REMOVE_MEDICINES, [ERole.ALL]],

  [EOperation.ADD_VET_VISIT, [ERole.ALL]],
  [EOperation.EDIT_VET_VISIT, [ERole.ALL]],
]);
