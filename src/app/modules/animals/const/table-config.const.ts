import { ITableColumn } from '../../shared/interfaces/table-column.interface';

export const animalTableConfig = [
  {
    code: 'name',
    sortable: true
  },
  {
    code: 'sex',
    translated: true,
    sortable: true
  },
  {
    code: 'species',
    translated: true,
    sortable: true
  },
  {
    code: 'status',
    translated: true,
    sortable: true
  },
] as ITableColumn[];

export const animalDetailsAdoptionTableConfig = [
  {
    code: 'adopterFullName'
  },
  {
    code: 'employeeFullName'
  },
  {
    code: 'adoptionDate'
  }
];

export const animalDetailsVetVisistTableConfig = [
  {
    code: 'visitDate'
  },
  {
    code: 'description'
  }
];

export const vetDictionaryTableConfig = [
  {
    code: 'name'
  },
  {
    code: 'remove'
  }
]
