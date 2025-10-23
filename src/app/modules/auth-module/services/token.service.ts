import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "@core";

@Injectable({
    providedIn: 'root'
})

export class TokenStorageService {
    saveTokens(access: string) {
        sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    }

    getAccessToken(): string | null {
        return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    clear(): void {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
}