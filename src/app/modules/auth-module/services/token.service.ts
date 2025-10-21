import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TokenStorageService {
    saveTokens(access: string) {
        sessionStorage.setItem(environment.ACCESS_TOKEN_KEY, access);
    }

    getAccessToken(): string | null {
        return sessionStorage.getItem(environment.ACCESS_TOKEN_KEY);
    }

    clear(): void {
        sessionStorage.removeItem(environment.ACCESS_TOKEN_KEY);
    }
}