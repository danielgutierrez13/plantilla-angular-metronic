import { Component, OnInit } from '@angular/core';
import { MenuAside } from "../../../../../interfaces/interfaces-menu-aside";

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  public menuAside: MenuAside[] = asideMenu;
  constructor() {
  }

  ngOnInit(): void {}
}

const asideMenu: MenuAside[] = [
  {
    title: 'Dashboard',
    url: '/crafted/pages/profile/campaigns',
    icon: './assets/media/icons/duotune/communication/com006.svg',
    separator: true,
    nameSeparator: 'Sistema',
    order: 1,
    subMenu: [
      {
        title: 'Dashboard 1',
        url: '/crafted/pages/profile/campaigns',
        order: 1,
      },
      {
        title: 'Dashboard 2',
        url: '/crafted/pages/profile/projects',
        order: 2,
      }
    ]
  },
  {
    title: 'Cuentas',
    url: '/crafted/account',
    icon: './assets/media/icons/duotune/communication/com006.svg',
    separator: false,
    nameSeparator: 'Cuentas',
    order: 2,
    subMenu: [
      {
        title: 'Cuentas 1',
        url: '/crafted/account/overview',
        order: 1,
      },
      {
        title: 'Cuentas 2',
        url: '/crafted/account/settings',
        order: 2,
      }
    ]
  },

]
