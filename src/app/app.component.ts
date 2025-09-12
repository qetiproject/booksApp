import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';
import { LoadingComponent } from "./features/loading/loading.component";

@Component({
    selector: 'app-root',
    imports: [
    RouterOutlet,
    ReactiveFormsModule,
    LoadingComponent
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

  authService = inject(AuthService);

  isLogeedIn = this.authService.isLogeedIn;

  onLogout() {
    this.authService.logout();
  }
}
