import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import * as UserActions from '@auth-module';
import * as UserSelectors from '@auth-module';
import { SafeUserData, UserResponse, Users } from "@auth-module";
import { STORAGE_KEYS } from "@core";
import { Store } from "@ngrx/store";
import { filter, Observable, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserFacade {
    private http = inject(HttpClient);
    #store = inject(Store);
    
    searchUsers(searchText: string): Observable<Users> {
        return this.http.get<UserResponse>(`UserApp/searchUsers?searchText=${searchText}`, );
    }

    getSafeUserData(): SafeUserData {
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        const user: SafeUserData = userData ? JSON.parse(userData) : null;
        return user;
    }
    getUserbyEmail(): Observable<Users> {
        const user: SafeUserData = this.getSafeUserData();

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