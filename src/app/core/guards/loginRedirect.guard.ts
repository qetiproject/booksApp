import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { selectIsLoggedIn } from '../../features/auth/store/auth.selector';

export const LoginRedirectGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    take(1), 
    map(isLoggedIn => {
      return isLoggedIn ? router.parseUrl('/books') : true;
    })
  );
};
