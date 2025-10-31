import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import * as UserActions from '@auth-module';
import { SafeUserData, selectSearchUsers, UserResponse, Users } from "@auth-module";
import { STORAGE_KEYS } from "@core";
import { Store } from "@ngrx/store";
import { filter, map, Observable, take } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserFacade {
    private http = inject(HttpClient);
    #store = inject(Store);
    
    searchUsers(searchText: string): Observable<Users> {
        return this.http.get<UserResponse>(`${environment.userUrl}/searchUsers?searchText=${searchText}`, );
    }

    getSafeUserData(): SafeUserData {
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        const user: SafeUserData = userData ? JSON.parse(userData) : null;
        return user;
    }

    searchUserByEmail(email: string): Observable<SafeUserData> {
        this.#store.dispatch(UserActions.searchUsers({ searchText: email }));
        return this.#store.select(selectSearchUsers).pipe(
            filter(response => response.data.some(u => u.emailId === email)), 
            take(1),
            map(response => response.data.find(u => u.emailId === email)!) 
        );
    }
}