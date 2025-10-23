import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserResponse, Users } from "@auth-module";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserFacade {
    private http = inject(HttpClient);

    searchUsers(searchText: string): Observable<Users> {
        return this.http.get<UserResponse>(`UserApp/searchUsers?searchText=${searchText}`, );
    }
}