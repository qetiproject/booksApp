import { inject, Injectable } from '@angular/core';
import {
  Resolve
} from '@angular/router';
import * as UserActions from '@auth-module';
import * as UserSelectors from '@auth-module';
import { SafeUserData, Users } from '@auth-module';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Users> {
  #store = inject(Store);

  resolve(): Observable<Users> {
    const userData = localStorage.getItem(environment.USER_STORAGE_KEY);
    const user: SafeUserData = userData ? JSON.parse(userData) : null;
    const email = user.emailId;

    this.#store.dispatch(UserActions.searchUsers({ searchText: email }));
    return this.#store.select(UserSelectors.selectSearchUsers).pipe(
      filter(searchResult =>
        !!searchResult && searchResult.data.some(u => u.emailId === email)
      ),
      take(1)
    )
  }
}
