import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthTokens } from "../store/auth.store";
import { LoginRequest, LoginResponse, RegisterUserRequest, RegisterUserResponse } from "../types/user";
import { UserProfileResponse } from "../types/user-profile";

@Injectable({
    providedIn: 'root'
})

export class AuthFacade {
    private http = inject(HttpClient);
    readonly  AUTH_API = environment.AUTH_API;

    registerUser(user: RegisterUserRequest): Observable<RegisterUserResponse> {
        return this.http.post<RegisterUserResponse>(`/UserApp/CreateNewUser`, user)
    }

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginRequest>(`${this.AUTH_API}/login`, {
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
            return user;
            })
    )}

    getProfile(): Observable<UserProfileResponse> {
        return this.http.get<UserProfileResponse>(`${this.AUTH_API}/me`, );
    }

    refresh(refreshToken: string): Observable<AuthTokens> {
        return this.http.post<AuthTokens>(`${this.AUTH_API}/refresh`, refreshToken);
    }
}