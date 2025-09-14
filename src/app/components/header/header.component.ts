import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../features/auth/store/auth.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  store = inject(Store);

  onLogout() {
    this.store.dispatch(logout());
  }
}
