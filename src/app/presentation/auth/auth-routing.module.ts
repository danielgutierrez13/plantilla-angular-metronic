import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from "./components/login/login.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login_check',
        pathMatch: 'full',
      },
      {
        path: 'login_check',
        component: LoginComponent,
        data: {
          returnUrl: window.location.pathname
        },
      },
      {
        path: 'forgot_password',
        component: ForgotPasswordComponent,
        data: {
          returnUrl: window.location.pathname
        },
      },
      { path: '', redirectTo: 'login_check', pathMatch: 'full' },
      { path: '**', redirectTo: 'login_check', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
