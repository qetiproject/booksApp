import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
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
}
