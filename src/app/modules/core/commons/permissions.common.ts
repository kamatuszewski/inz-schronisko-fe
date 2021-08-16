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

  [EOperation.ADD_ANIMAL, [ERole.EMPLOYEE]],
  [EOperation.UPDATE_ANIMAL, [ERole.EMPLOYEE]],
  [EOperation.REMOVE_ANIMAL, [ERole.EMPLOYEE]],

  [EOperation.ADD_ADOPTION, [ERole.EMPLOYEE]],
  [EOperation.REMOVE_ADOPTION, [ERole.EMPLOYEE]],

  [EOperation.SHOW_EMPLOYEE_LIST, [ERole.DIRECTOR] [ERole.ADMIN]],     //[Magda] i wyswietlenie listy wolontariuszy
  [EOperation.SHOW_EMPLOYEE_DETAILS, [ERole.DIRECTOR] [ERole.ADMIN]],  //[Magda] i wyswietlenie detali wolontariusza
  [EOperation.SHOW_USER_LIST, [ERole.ADMIN]],
  [EOperation.SHOW_DETAILS_USER, [ERole.ADMIN]],

  [EOperation.ADD_USER, [ERole.EMPLOYEE] [ERole.ADMIN]], //[Magda] dla Employee tylko dodanie bez roli osoby i bez hasla
  [EOperation.EDIT_USER, [ERole.ADMIN]],            //[Magda] w tym dopisanie/usunięcie roli

  [EOperation.ADD_SPECIALIST, [ERole.ADMIN]],
  [EOperation.ASSIGN_SPECIALIST, [ERole.ADMIN]],
  [EOperation.REMOVE_SPECIALIST, [ERole.ADMIN]],

  [EOperation.ADD_TREATMENT, [ERole.VET]],
  [EOperation.ADD_MEDICINES, [ERole.VET]],
  [EOperation.REMOVE_TREATMENT, [ERole.VET]],
  [EOperation.REMOVE_MEDICINES, [ERole.VET]],       
  [EOperation.REMOVE_MEDICINES, [ERole.VET]],       //[Magda] duplikat linijki wyżej

  [EOperation.ADD_VET_VISIT, [ERole.VET]],
  [EOperation.EDIT_VET_VISIT, [ERole.VET]],
]);
 