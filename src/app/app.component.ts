import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './features/auth/services/auth.service';
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
    }

    authService = inject(AuthService);
    
    init() {
        const tokens = this.authService.getTokens()
        if(tokens) {
        this.store.dispatch(loginSuccess({ 
            user: JSON.parse(localStorage.getItem('user') || 'null'), 
            tokens 
        }));
        }
    }
}
