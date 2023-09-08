export interface MenuAside {
  title: string;
  url: string;
  icon: string;
  separator?: boolean;
  nameSeparator?: string;
  order: number;
  subMenu: SubMenuAside[];
}

export interface SubMenuAside {
  title: string;
  url: string;
  order: number;
}
