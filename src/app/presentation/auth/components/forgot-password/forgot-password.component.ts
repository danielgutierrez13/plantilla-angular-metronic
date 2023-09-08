import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit  {

  public forgotPasswordForm: FormGroup;
  public errorState: number = 0;
  public isLoading: boolean = false;

  ngOnInit(): void {
  }

  constructor(
      private fb: FormBuilder
  ) {
    this.initForm();
  }
  public get f() {
    return this.forgotPasswordForm.controls;
  }

  public initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(320),
        ]),
      ],
    });
  }

  public submit() {

  }
}
