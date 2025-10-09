import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginResponse } from "@auth-types/user";
import { UserProfileResponse } from "@auth-types/user-profile";
import { Observable } from "rxjs";
import { AuthFacade } from "./authFacade";
import { TokenStorageService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);
  tokenStorageService = inject(TokenStorageService)
  authFacade = inject(AuthFacade);
  
  constructor() {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.authFacade.login(username, password);  
  }

  async logout() {
    this.tokenStorageService.clear();
    await this.router.navigateByUrl('/login')
  }

  refresh(refreshToken: string): Observable<{ accessToken: string; refreshToken: string}> {
    return this.authFacade.refresh(refreshToken);
  }

  getProfile(): Observable<UserProfileResponse> {
    return this.authFacade.getProfile();
  }
}
