import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { MessagesComponent } from "./components/messages/messages.component";
import { AuthService } from './features/auth/services/auth.service';
import { TokenStorageService } from './features/auth/services/token.service';
import { loginSuccess } from './features/auth/store/auth.action';
import { selectIsLoggedIn } from './features/auth/store/auth.selector';
import { LoadingComponent } from "./features/loading/loading.component";

@Component({
    selector: 'app-root',
    imports: [
    RouterOutlet,
    ReactiveFormsModule,
    LoadingComponent,
    HeaderComponent,
    MessagesComponent
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent{
    isLoggedIn: boolean = false;
    
    constructor(private store: Store) {
        this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => {
            this.isLoggedIn =isLoggedIn;
        });
        this.init();
    }

    authService = inject(AuthService);
    tokenStorageService = inject(TokenStorageService);

    init() {
        const accessToken = this.tokenStorageService.getAccessToken();
        const refreshToken = this.tokenStorageService.getRefreshToken();
        const userData = sessionStorage.getItem(environment.USER_STORAGE_KEY);
        const user = userData ? JSON.parse(userData) : null;

        if (accessToken && refreshToken && user) {
            this.store.dispatch(loginSuccess({ 
                user, 
                tokens: { accessToken, refreshToken }
            }));
        }
    }
}
