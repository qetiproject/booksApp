import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UniqueEmailValidator implements AsyncValidator {
    http = inject(HttpClient);
    
    validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
        return this.http.get<unknown[]>(`/UserApp/searchUsers?searchText=${control.value}`).pipe(
            map(users =>
                users.length === 0
                ? null
                : { uniqueEmail: { isTaken: true}}
            ),
            catchError(() => of({ uniqueEmail: { unknownError: true}}))
        )
    }
}