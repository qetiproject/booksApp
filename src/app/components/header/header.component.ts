import { Component, inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
