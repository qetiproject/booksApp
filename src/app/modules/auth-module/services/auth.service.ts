import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "@auth-module";
import { Observable } from "rxjs";
import { LoginCredentials, LoginResponse, RegisterCredentionals, RegisterUserResponse, ResetPassword } from "../types/auth";
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
  
  registerUser(user: RegisterCredentionals): Observable<RegisterUserResponse> {
    return this.authFacade.registerUser(user)
  }
      
  login(user: LoginCredentials): Observable<LoginResponse> {
    return this.authFacade.login(user);  
  }

  sendResetotp(emailId: string) {
    return this.authFacade.sendResetOtp(emailId);
  }

  resetPassword(data: ResetPassword): Observable<string> {
    return this.authFacade.resetPassword(data);
  }
  
  async logout() {
    this.tokenStorageService.clear();
    await this.router.navigateByUrl('/login')
  }

  searchUsers(searchText: string): Observable<Users> {
    return this.authFacade.searchUsers(searchText);
  }
}
