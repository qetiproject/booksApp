import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";
import { selectIsLoggedIn } from "../../features/auth/store/auth.selector";

export const IsUserAuthenticated: CanActivateFn = 
    (route: ActivatedRouteSnapshot, next: RouterStateSnapshot) => {

        const store = inject(Store);
        const router = inject(Router);

        return store.select(selectIsLoggedIn).pipe(
            take(1),
            map(isLoggedin => {
                if(isLoggedin) {
                    return true
                }else {
                    return router.parseUrl('/login')
                }
            })
        )
}