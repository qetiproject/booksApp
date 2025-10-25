import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SafeUserData, Users, UserSafeInSystem } from "@auth-module";
import { STORAGE_KEYS } from "@core";
import { filter, map, Observable, take } from "rxjs";
import { UserFacade } from "./user.facade";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);
  userFacade = inject(UserFacade);
  
  searchUsers(searchText: string): Observable<Users> {
    return this.userFacade.searchUsers(searchText);
  }

  getUserbyEmail(): Observable<Users> {
    return this.userFacade.getUserbyEmail();
  }

  getCurrentUserFromStorage(): UserSafeInSystem | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  }

  getCuurentUserSafeData(): Observable<SafeUserData> {
    return this.getUserbyEmail().pipe(
      map(users => {
        const data = (users && 'data' in users && Array.isArray(users.data)) ? users.data : [];
        return data[0];
      }),
      filter((user): user is SafeUserData => !!user),
      take(1),
    );
  }
      
}
