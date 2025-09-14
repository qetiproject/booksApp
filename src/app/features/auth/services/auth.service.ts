import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthTokens } from "../store/auth.store";
import { LoginResponse } from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authApi}/login`, {
      username, password
    }).pipe(
      map((response) => {
        this.saveTokens(response.accessToken, response.refreshToken);
        return response
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

}
