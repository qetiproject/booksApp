import { inject, Injectable } from '@angular/core';
import {
  Resolve
} from '@angular/router';
import { Users, UserService } from '@auth-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Users> {
  #userService = inject(UserService);

  resolve(): Observable<Users> {
    return this.#userService.getUserbyEmail();
  }
}
