export interface IListConfig {
  columnsPrefix: string;
  create?: string;
  filter?: boolean;
  header?: string;
  isPagination?: boolean;
  prefix?: string;
  scrollable?: boolean;
  selectable?: boolean;
}

export interface Pagination<T> extends PaginationData {
  items: T[]
}

export interface PaginationData {
  itemsFrom: number,
  itemsTo: number,
  totalItemsCount: number,
  totalPages: number
}

export interface RequestListConfig extends SortConfig{
  pageNumber: number,
  pageSize: number,
}

export interface SortConfig {
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
