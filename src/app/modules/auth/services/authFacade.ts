import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthTokens } from "../store/auth.store";
import { LoginRequest, LoginResponse } from "../types/user";
import { UserProfileResponse } from "../types/user-profile";

@Injectable({
    providedIn: 'root'
})

export class AuthFacade {
    private http = inject(HttpClient);

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
            return user;
            })
    )}

    getProfile(): Observable<UserProfileResponse> {
        return this.http.get<UserProfileResponse>(`${environment.authApi}/me`, );
    }

    refresh(refreshToken: string): Observable<AuthTokens> {
        return this.http.post<AuthTokens>(`${environment.authApi}/refresh`, refreshToken);
    }
}