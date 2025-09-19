import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TokenStorageService {
    saveTokens(access: string, refresh: string) {
        sessionStorage.setItem(environment.ACCESS_TOKEN_KEY, access);
        sessionStorage.setItem(environment.REFRESH_TOKEN_KEY, refresh);
    }

    getAccessToken(): string | null {
        return sessionStorage.getItem(environment.ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return sessionStorage.getItem(environment.REFRESH_TOKEN_KEY);
    }

    clear(): void {
        sessionStorage.removeItem(environment.ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(environment.REFRESH_TOKEN_KEY);
    }
}