import { ITableColumn } from '../../shared/interfaces/table-column.interface';

export const userTableConfig = [
  {
    code: 'firstName',
    sortable: true
  },
  {
    code: 'lastName',
    sortable: true
  },
  {
    code: 'sex',
    translated: true,
    sortable: true
  },
] as ITableColumn[];

export const employeeTableConfig = [
  {
    code: 'firstName',
    sortable: true
  },
  {
    code: 'lastName',
    sortable: true
  },
  {
    code: 'sex',
    translated: true,
    sortable: true
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
    code: 'firstName',
    sortable: true
  },
  {
    code: 'lastName',
    sortable: true
  },
  {
    code: 'sex',
    translated: true,
    sortable: true
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
