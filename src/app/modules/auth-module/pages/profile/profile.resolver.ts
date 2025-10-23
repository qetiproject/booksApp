import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import * as AuthSelectors from '@auth-module';
import * as UserActions from '@auth-module';
import * as UserSelectors from '@auth-module';
import { Store } from '@ngrx/store';
import { filter, first, map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  private store = inject(Store);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select(AuthSelectors.selectUserInSystem).pipe(
      first(user => !!user?.emailId),
      map(user => ({
        userId: user!.userId,
        emailId: user!.emailId
      })),
      tap(user => this.store.dispatch(UserActions.searchUsers({ searchText: user!.emailId }))),
      switchMap(() => {
        return this.store.select(UserSelectors.selectSearchUsers).pipe(
          filter(searchResult => !!searchResult && searchResult.data.length > 0),
          take(1)
        );
      })
    );
  }
}