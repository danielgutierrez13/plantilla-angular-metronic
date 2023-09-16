import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginRepositoryService } from "../../../../domain/login/repository/login-repository.service";
import { LoginInterfacesRequest } from "../../../../domain/login/interfaces/login-interfaces";
import { ChangeDetectorRef } from '@angular/core';
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  public loginForm: FormGroup;
  public hasError: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginRepository: LoginRepositoryService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    if (this.loginRepository.currentUserValue?.status) {
      this.toDashboard();
    }
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public get f() {
    return this.loginForm.controls;
  }

  public initForm() {
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  public submit(): void {
    if (this.loginForm.valid) {
      this.hasError = false;
      this.isLoading = true;
      const values = this.loginForm.value;
      const data: LoginInterfacesRequest = {
        username: values.email,
        password: values.password
      };
      this.loginRepository.login(data)
          .pipe(
              finalize(() => {
                this.isLoading = false;
                this.cd.detectChanges();
              })
          )
          .subscribe({
              next: () => {
                this.toDashboard();
              },
              error: () => {
                this.hasError = true;
              }
          });
    }
  }

  public toDashboard(): void {
    void this.router.navigate(['/']);
  }

}
