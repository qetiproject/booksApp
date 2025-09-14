import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { User } from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();

  isLogeedIn = computed(() => !!this.user());

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user();
      if(user) {
        localStorage.setItem(environment.USER_STORAGE_KEY, JSON.stringify(user));
      }
    })
  }

  loadUserFromStorage() {
    const json = localStorage.getItem(environment.USER_STORAGE_KEY);
    if(json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async login(username: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${environment.authApi}/login`, {
      username, password
    });

    const user = await firstValueFrom(login$);

    this.#userSignal.set(user);
    return user
  }

  async logout() {
    localStorage.removeItem(environment.USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login')
  }
}
