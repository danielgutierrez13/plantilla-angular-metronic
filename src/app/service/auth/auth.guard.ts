import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // verificar los rutas y accesos de usuario
  // redireccionar ruta existente pero no permitida para rol
  return true;
};
