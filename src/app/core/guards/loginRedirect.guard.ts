import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map, take } from "rxjs/operators";
import { selectIsLoggedIn } from "../../features/auth/store/auth.selector";

export const LoginRedirectGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    filter(v => v !== null && v !== undefined),
    take(1),
    map(isLoggedIn => {
      return isLoggedIn ? router.parseUrl('/books') : true
    })
  );
};