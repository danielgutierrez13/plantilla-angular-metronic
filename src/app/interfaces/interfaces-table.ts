export interface HeaderTable {
  id: string;
  label: string;
  minWidth?: string;
}

export interface MenuItems {
  id: number;
  options: string;
}

export interface DataRow {
  [key: string]: string;
}
