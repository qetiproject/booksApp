import { inject, Injectable } from '@angular/core';
import {
  Resolve
} from '@angular/router';
import { selectUserEmail, Users, UserService } from '@auth-module';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Users> {
  #userService = inject(UserService);
  #store = inject(Store);
  email: string = '';

  resolve(): Observable<any> {
    return this.#store.select(selectUserEmail).pipe(
      filter((email): email is string => !!email),
      take(1),
      switchMap(email => this.#userService.getUserbyEmail(email)), 
    );
}

}
