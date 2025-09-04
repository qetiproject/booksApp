import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

export const IsAuthenticated: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isLogeedIn()) {
      return true;
    }else {
      return router.parseUrl('/login')
    }
  }
