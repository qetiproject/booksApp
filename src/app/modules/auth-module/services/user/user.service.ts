import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SafeUserData, UserFacade, Users, UserSafeInSystem } from "@auth-module";
import { STORAGE_KEYS } from "@core";
import { Observable } from "rxjs";

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

  getUserbyEmail(email: string): Observable<SafeUserData | null> {
    return this.userFacade.searchUserByEmail(email);
  }

  getCurrentUserFromStorage(): UserSafeInSystem | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  }
}
