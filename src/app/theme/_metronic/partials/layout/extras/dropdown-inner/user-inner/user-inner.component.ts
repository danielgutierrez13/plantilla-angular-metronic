import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginInterfacesResponse } from "../../../../../../../domain/login/interfaces/login-interfaces";
import { LoginRepositoryService } from "../../../../../../../domain/login/repository/login-repository.service";

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  user$: LoginInterfacesResponse | null;

  constructor(
    private auth: LoginRepositoryService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserValue;
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
