import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoginCredentials, LoginResponse, RegisterUserRequest, RegisterUserResponse } from "../types/user";
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
  
  registerUser(user: RegisterUserRequest): Observable<RegisterUserResponse> {
    return this.authFacade.registerUser(user)
  }
      
  login(user: LoginCredentials): Observable<LoginResponse> {
    return this.authFacade.login(user);  
  }

  async logout() {
    this.tokenStorageService.clear();
    await this.router.navigateByUrl('/login')
  }

  // refresh(refreshToken: string): Observable<{ accessToken: string; refreshToken: string}> {
  //   return this.authFacade.refresh(refreshToken);
  // }

  // getProfile(): Observable<UserProfileResponse> {
  //   return this.authFacade.getProfile();
  // }
}
