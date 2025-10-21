import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginCredentials, LoginResponse, RegisterCredentionals, RegisterUserResponse, ResetPassword } from "../types/auth";

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

    sendResetOtp(emailId: string): Observable<{message: string}> {
        return this.http.post<{message: string}>(`/UserApp/send-reset-otp?emailId=${emailId}`, null)
    }

    resetPassword(data: ResetPassword): Observable<string> {
        return this.http.post<string>(
            `/UserApp/verify-otp-reset-password`, 
            data,
            { responseType: 'text' as 'json' }
        )
    }
    
    // getProfile(): Observable<UserProfileResponse> {
    //     return this.http.get<UserProfileResponse>(`${this.AUTH_API}/me`, );
    // }
}