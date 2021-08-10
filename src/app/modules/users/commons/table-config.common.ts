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
