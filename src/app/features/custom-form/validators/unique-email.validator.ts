import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserResponse } from "@auth-types/user";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UniqueEmailValidator implements AsyncValidator {
    http = inject(HttpClient);
    
    validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
        return this.http.get<UserResponse>(`/UserApp/searchUsers?searchText=${control.value}`).pipe(
            tap((users) => console.log(users)),
            map(response =>
                response.totalRecords === 0
                ? null
                : { uniqueEmail: { isTaken: true}}
            ),
            catchError(() => of({ uniqueEmail: { unknownError: true}}))
        )
    }
}