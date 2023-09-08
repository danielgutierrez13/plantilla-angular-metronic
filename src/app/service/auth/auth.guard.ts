import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedIn = localStorage.getItem("state");
  const isLogin = loggedIn == "true";
  if (!isLogin) {
    window.location.href = "/auth/login_check";
    return false;
  }
  // obtener rutas permitidas de local storage y comparar con la ruta actual
  // si la ruta existe pero no esta en las permitidas, redireccionar a 401
  // if (state.url === "/builder") {
  //   window.location.href = "/error/401";
  //   return false;
  // }
  return true;
};
