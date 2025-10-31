import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { LoginCredentials, LoginResponse, RegisterCredentionals, RegisterUserResponse, ResetPassword } from "../types/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthFacade {
    private http = inject(HttpClient);
    
    registerUser(user: RegisterCredentionals): Observable<RegisterUserResponse> {
        return this.http.post<RegisterUserResponse>(`${environment.userUrl}/CreateNewUser`, user)
    }

    login(user: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.userUrl}/login`, user)
    }

    sendResetOtp(emailId: string): Observable<{message: string}> {
        return this.http.post<{message: string}>(`${environment.userUrl}/send-reset-otp?emailId=${emailId}`, null)
    }

    resetPassword(data: ResetPassword): Observable<string> {
        return this.http.post<string>(
            `${environment.userUrl}/verify-otp-reset-password`, 
            data,
            { responseType: 'text' as 'json' }
        )
    }
}