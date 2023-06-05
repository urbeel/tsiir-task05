import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

export const adminGuard: CanActivateFn = () => {
  if (inject(AuthService).isAdmin()) {
    return true;
  } else {
    inject(Router).navigate(['']).catch(reason => console.error(reason));
    return false;
  }
}
