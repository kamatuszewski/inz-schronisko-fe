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
    code: 'id'
  },
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
