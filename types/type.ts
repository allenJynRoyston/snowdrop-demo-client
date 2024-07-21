export type TypeTransaction = {
  _id: string
  id: number
  username: string
  userid: string
  amount: string
  date: Date // Ideally this should be a Date type, but whatever it's fine for this
  transaction_status: number
  vender: string
}

export type GenericFunc<T> = {
  [K in keyof T]?: (value: T[K]) => any;
};

export  type SmartTableProps<T> = {
  data: T[]
  convertFunc?: GenericFunc<T>
  searchFunc?: GenericFunc<T>
  filterFunc?: GenericFunc<T>
  dropdownFunc?: GenericFunc<T>
  isFetching?: boolean
  hasError?: boolean
  sortByKey?: (key: string, reversed:Boolean) => void
}

export type SmartTablePaginationProps = {
  totalEntries: number;
  entriesPerPage: number;
  currentPage: number;
  handleClick: (page: number) => void;
};

export type IconTypes = 'home' | 'dashboard' | 'businessman' | 'arrowup' | 'arrowdown' | 'filter' | 'cross'

export type TransactionStatus = 'Pending' | 'Completed' | 'Failed' | 'Cancelled' | 'Refunded' | 'In Review' | 'Unknown';
