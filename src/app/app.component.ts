import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from "./features/loading/loading.component";

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ReactiveFormsModule,
        LoadingComponent,
        HeaderComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent{
    
}
