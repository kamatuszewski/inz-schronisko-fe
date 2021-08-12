import { ITableColumn } from '../../shared/interfaces/table-column.interface';

export const userTableConfig = [
  {
    code: 'id'
  },
  {
    code: 'firstName'
  },
  {
    code: 'lastName'
  },
  {
    code: 'emailAddress'
  },
  {
    code: 'sex',
    translated: true
  },
] as ITableColumn[];

export const employeeTableConfig = [
  {
    code: 'id'
  },
  {
    code: 'firstName'
  },
  {
    code: 'lastName'
  },
  {
    code: 'emailAddress'
  },
  {
    code: 'sex',
    translated: true
  },
  {
    code: 'roles',
    translated: true,
  },
] as ITableColumn[];
