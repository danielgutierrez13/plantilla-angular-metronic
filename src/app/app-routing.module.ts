import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from "./service/auth/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./presentation/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./presentation/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./theme/_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
