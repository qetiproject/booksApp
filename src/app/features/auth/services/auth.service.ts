import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { User } from "../types/user";
import { environment } from "../../../../environments/environment";

const USER_STORAGE_KEY = 'user';
const apiRoot ='http://localhost:9000/api';

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
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    })
  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if(json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${apiRoot}/login`, {
      email, password
    });

    const user = await firstValueFrom(login$);

    this.#userSignal.set(user);
    return user
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login')
  }
}
