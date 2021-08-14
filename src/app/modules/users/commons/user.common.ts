import { Validators, ValidatorFn } from '@angular/forms';
import { ERole } from '../enums/user.enum';

export const roleAddedFieldsMap = new Map<ERole, string[]>([
  [ERole.ALL, ['hireDate', 'quitDate', 'salary', 'PWZNumber', 'attendance', 'joiningDate']],
  [ERole.VOLUNTEER, ['attendance', 'joiningDate']],
  [ERole.EMPLOYEE, ['hireDate', 'quitDate', 'salary']],
  [ERole.VET, ['hireDate', 'quitDate', 'salary', 'PWZNumber']]
]);

export const volunteerValidatorMap = new Map<string, ValidatorFn[]>([
  ['attendance', [Validators.required]],
  ['joiningDate', [Validators.required]]
]);

export const employeeValidatorMap = new Map<string, ValidatorFn[]>([
  ['hireDate', [Validators.required]],
  ['quitDate', []],
  ['salary', [Validators.required]]
]);

export const vetValidatorMap = new Map<string, ValidatorFn[]>([
  ['hireDate', [Validators.required]],
  ['quitDate', []],
  ['salary', [Validators.required]],
  ['PWZNumber', [Validators.required]],
  ['VetSpecialties', [Validators.required]]
]);

export const roleAddedFieldsValidatorMap = new Map<ERole, Map<string, ValidatorFn[]>>([
  [ERole.EMPLOYEE, employeeValidatorMap],
  [ERole.VET, vetValidatorMap],
  [ERole.VOLUNTEER, volunteerValidatorMap]
])
