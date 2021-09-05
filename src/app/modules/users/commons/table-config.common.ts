import { ITableColumn } from '../../shared/interfaces/table-column.interface';

export const userTableConfig = [
  {
    code: 'firstName'
  },
  {
    code: 'lastName'
  },
  {
    code: 'sex',
    translated: true
  },
] as ITableColumn[];

export const employeeTableConfig = [
  {
    code: 'firstName'
  },
  {
    code: 'lastName'
  },
  {
    code: 'sex',
    translated: true
  },
  {
    code: 'specialties'
  },
  {
    code: 'isVet',
    translated: true
  }
] as ITableColumn[];

export const volunteerTableConfig = [
  {
    code: 'firstName'
  },
  {
    code: 'lastName'
  },
  {
    code: 'sex',
    translated: true
  }
] as ITableColumn[];


export const specialistTableConfig = [
  {
    code: 'name'
  },
  {
    code: 'remove'
  }
]
