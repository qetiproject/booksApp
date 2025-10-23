import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Users, UserService } from '@auth-module';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  private userService = inject(UserService);

  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
    const email = control.value?.trim();
    if (!email) return of(null);

    return this.userService.searchUsers(email).pipe(
      map(response => {
        const users: Users = { ...response };

        return users.totalRecords === 0
          ? null
          : { uniqueEmail: { isTaken: true } };
      }),
      catchError(() => of({ uniqueEmail: { unknownError: true } }))
    );
  }
}
