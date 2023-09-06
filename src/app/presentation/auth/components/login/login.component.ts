import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginRepositoryService } from "../../../../domain/login/repository/login-repository.service";
import { LoginModelRequest } from "../../../../domain/login/model/login-model";
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
      this.dashboard();
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
          Validators.minLength(6),
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
      const data: LoginModelRequest = {
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
                this.dashboard();
              },
              error: () => {
                this.hasError = true;
              }
          });
    }
  }

  public dashboard(): void {
    void this.router.navigate(['/']);
  }

}
