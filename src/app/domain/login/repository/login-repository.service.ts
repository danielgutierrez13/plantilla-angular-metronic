import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginInterfacesRequest, LoginInterfacesResponse } from "../interfaces/login-interfaces";
import { LoginConstRoutes } from "../const/login-const";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginRepositoryService {

  private currentUserSubject: BehaviorSubject<LoginInterfacesResponse | null>;
  public currentUser: Observable<LoginInterfacesResponse | null>;
  public isLogin: boolean = false;
  public roleAs: string;

  constructor(
    private apiService: ApiService
  ) {
    const parsedUser = JSON.parse(localStorage.getItem('currentUser')?.toString() ?? '{}');
    this.currentUserSubject = new BehaviorSubject<LoginInterfacesResponse | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(data: LoginInterfacesRequest): Observable<LoginInterfacesResponse> {
    const ctrl: string = LoginConstRoutes.LOGIN;
    return this.apiService.post(ctrl, environment.apiSecurity, data).pipe(
      map((repsonse: LoginInterfacesResponse) => {
        localStorage.setItem("currentUser", JSON.stringify(repsonse));
        localStorage.setItem("state", JSON.stringify(repsonse.status));
        localStorage.setItem("token", JSON.stringify(repsonse.token));
        localStorage.setItem("role", JSON.stringify(repsonse.role));
        this.currentUserSubject.next(repsonse);
        return repsonse;
      })
    );
  }

  public get currentUserValue(): LoginInterfacesResponse | null {
    return this.currentUserSubject.value;
  }

  public logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("state");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    this.isLogin = false;
    this.roleAs = "";
    this.currentUserSubject.next(null);
  }
}
