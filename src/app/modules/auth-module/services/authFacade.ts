import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginCredentials, LoginResponse, RegisterCredentionals, RegisterUserResponse } from "../types/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthFacade {
    private http = inject(HttpClient);
    
    registerUser(user: RegisterCredentionals): Observable<RegisterUserResponse> {
        return this.http.post<RegisterUserResponse>(`/UserApp/CreateNewUser`, user)
    }

    login(user: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('/UserApp/login', user)
    }

    // getProfile(): Observable<UserProfileResponse> {
    //     return this.http.get<UserProfileResponse>(`${this.AUTH_API}/me`, );
    // }
}