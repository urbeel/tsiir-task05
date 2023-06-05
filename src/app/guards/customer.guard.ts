import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

export const customerGuard: CanActivateFn = () => {
  if (inject(AuthService).isCustomer()) {
    return true;
  } else {
    inject(Router).navigate(['login']).catch(reason => console.error(reason));
    return false;
  }
}
