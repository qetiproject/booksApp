import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { SafeUserData, UserResponse, Users } from "@auth-module";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniqueEmailValidator implements AsyncValidator {
  http = inject(HttpClient);
  
  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
    return this.http.get<UserResponse>(`/UserApp/searchUsers?searchText=${control.value}`).pipe(
      map(response => {
        const users: Users = {
          ...response,
          data: response.data.map(({ password, refreshToken, refreshTokenExpiryTime, ...rest }) => rest as SafeUserData)
        };
        return users.totalRecords === 0
          ? null
          : { uniqueEmail: { isTaken: true } };
      }),
      catchError(() => of({ uniqueEmail: { unknownError: true } }))
    );
  }
}
