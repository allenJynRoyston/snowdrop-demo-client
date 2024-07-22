export type TypeTransaction = {
  _id: string
  id: number
  username: string
  userid: string
  amount: string
  date: Date 
  transaction_status: number 
  vender: string
}

export type DynamicBooleanObject = {
  [key: string]: boolean
}

export type GenericFunc<T> = {
  [K in keyof T]?: (value: T[K]) => any;
};

export type DropdownListType<K extends string> = {
  [key in K]?: string[];
};

export  type SmartTableProps<T> = {
  data: T[]
  convertFunc?: GenericFunc<T>
  searchFunc?: GenericFunc<T>
  filterFunc?: GenericFunc<T>
  dropdownList?: DropdownListType<keyof T & string>
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

export type DropdownProps<T> = {
  items: T[]
  defaultSelection: number
  onSelection: (val: T) => void
}

export type DropdownMenuProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  onClose: () => void;
}

export type SmartTableInfoProps<T> = {
  data: T[];
  onSizeSelection: (size: number) => void;
}


export type IconTypes = 'home' | 'dashboard' | 'businessman' | 'arrowup' | 'arrowdown' | 'filter' | 'cross'

export type TransactionStatus = 'Pending' | 'Completed' | 'Failed' | 'Cancelled' | 'Refunded' | 'In Review' | 'Unknown';
