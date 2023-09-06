import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginModelRequest, LoginModelResponse } from "../model/login-model";
import { LoginConstRoutes } from "../const/login-const";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginRepositoryService {

  private currentUserSubject: BehaviorSubject<LoginModelResponse | null>;
  public currentUser: Observable<LoginModelResponse | null>;
  public isLogin: boolean = false;
  public roleAs: string;

  constructor(
    private apiService: ApiService
  ) {
    const parsedUser = JSON.parse(localStorage.getItem('currentUser')?.toString() ?? '{}');
    this.currentUserSubject = new BehaviorSubject<LoginModelResponse | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(data: LoginModelRequest): Observable<LoginModelResponse> {
    const ctrl: string = LoginConstRoutes.LOGIN;
    return this.apiService.post(ctrl, environment.apiSecurity, data).pipe(
      map((repsonse: LoginModelResponse) => {
        localStorage.setItem("currentUser", JSON.stringify(repsonse));
        localStorage.setItem("STATE", "true");
        localStorage.setItem("ROLE", JSON.stringify([repsonse.role]));
        this.currentUserSubject.next(repsonse);
        return repsonse;
      })
    );
  }

  public get currentUserValue(): LoginModelResponse | null {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("STATE");
    localStorage.removeItem("ROLE");
    this.isLogin = false;
    this.roleAs = "";
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem("STATE");
    this.isLogin = loggedIn == "true";
    return this.isLogin;
  }

  // getRole() {
  //   this.roleAs = JSON.parse(localStorage.getItem("ROLE")?.toString() ?? '{}');
  //   return this.roleAs;
  // }
}
