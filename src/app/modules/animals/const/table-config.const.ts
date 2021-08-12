import { ITableColumn } from '../../shared/interfaces/table-column.interface';

export const animalTableConfig = [
  {
    code: 'id'
  },
  {
    code: 'name'
  },
  {
    code: 'sex',
    translated: true
  },
  {
    code: 'species',
    translated: true
  },
  {
    code: 'status',
    translated: true
  },
] as ITableColumn[];

export const animalDetailsAdoptionTableConfig = [
  {
    code: 'id'
  },
  {
    code: 'adopterFullName'
  },
  {
    code: 'employeeFullName'
  },
  {
    code: 'adoptionDate'
  }
]
