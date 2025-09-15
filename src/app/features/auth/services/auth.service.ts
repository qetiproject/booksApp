import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthTokens } from "../store/auth.store";
import { LoginRequest, LoginResponse } from "../types/user";
import { UserProfileResponse } from "../types/user-profile";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginRequest>(`${environment.authApi}/login`, {
      username, password
    }).pipe(
      map((response) => {
        const user: LoginResponse = {
          user: {
            id: response.id,
            username: response.username,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            gender: response.gender,
            image: response.image,
          },
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        }
        this.saveTokens(response.accessToken, response.refreshToken);
        return user;
      })
    )
  }

  async logout() {
    this.clearTokens();
    await this.router.navigateByUrl('/login')
  }

  private saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(environment.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(environment.REFRESH_TOKEN_KEY, refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(environment.ACCESS_TOKEN_KEY);
    localStorage.removeItem(environment.REFRESH_TOKEN_KEY);
  }

  getTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem(environment.ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(environment.REFRESH_TOKEN_KEY);

    if(accessToken && refreshToken) {
      return { accessToken, refreshToken}
    }

    return null;
  }

  refreshToken(refreshToken: string) {
    return this.http.post<any>(`${environment.authApi}/refresh`, refreshToken);
  }

  updateAccessToken(newAccessToken: string) {
    const current = this.getTokens();
    if(current) {
      this.saveTokens(newAccessToken, current.refreshToken)
    }

  }
  getProfile(): Observable<UserProfileResponse> {
   return this.http.get<UserProfileResponse>(`${environment.authApi}/me`) 
  }
}
