import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { LoginCredentials, LoginResponse, RegisterUserRequest, RegisterUserResponse } from "../types/user";

@Injectable({
    providedIn: 'root'
})

export class AuthFacade {
    private http = inject(HttpClient);
    readonly  AUTH_API = environment.AUTH_API;
    
    registerUser(user: RegisterUserRequest): Observable<RegisterUserResponse> {
        return this.http.post<RegisterUserResponse>(`/UserApp/CreateNewUser`, user)
    }

    login(user: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('/UserApp/login', user)
    }

    // getProfile(): Observable<UserProfileResponse> {
    //     return this.http.get<UserProfileResponse>(`${this.AUTH_API}/me`, );
    // }

    // refresh(refreshToken: string): Observable<AuthTokens> {
    //     return this.http.post<AuthTokens>(`${this.AUTH_API}/refresh`, refreshToken);
    // }
}