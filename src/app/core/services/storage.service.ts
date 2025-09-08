import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
    }
    set<T>(key: string, value: T): void {
        try{
            localStorage.setItem(key, JSON.stringify(value))
        }
        catch(err) {
            console.error('Failed to save to localStorage', err);
        }
    }
}