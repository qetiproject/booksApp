import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "@auth-module";
import { Observable } from "rxjs";
import { TokenStorageService } from "../token.service";
import { UserFacade } from "./user.facade";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  router = inject(Router);
  tokenStorageService = inject(TokenStorageService)
  userFacade = inject(UserFacade);
  
  searchUsers(searchText: string): Observable<Users> {
    return this.userFacade.searchUsers(searchText);
  }
}
