import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const loggedIn = localStorage.getItem("state");
    const isLogin = loggedIn == "true";
    if (!isLogin) {
       window.location.href = "/auth/login_check";
    }
    if (state.url === "/builder") {
       window.location.href = "/error/401";
    }
    return loggedIn == "true";
};
