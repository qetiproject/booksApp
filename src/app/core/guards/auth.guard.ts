import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { selectIsLoggedIn } from "@auth-module/store/auth.selector";
import { Store } from "@ngrx/store";
import { filter, map, take } from "rxjs/operators";

export const IsUserAuthenticated: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
      filter(v => v !== null && v !== undefined),
      take(1),
      map(isLoggedIn => {
        return isLoggedIn ? true : router.parseUrl('/login');
      })
    );
  };

