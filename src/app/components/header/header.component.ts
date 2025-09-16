import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../features/auth/store/auth.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  store = inject(Store);
  isOpen = signal(false);
  isMobileMenu = signal(false);
  
  navLinks = [
    { path: '/books', label: 'Books' },
    { path: '/favourites', label: 'Favourites' },
    { path: '/catalogue', label: 'Catalogue' },
  ];

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

   toggleMobileMenu() {
    this.isMobileMenu.update(v => !v);
  }

  onLogout() {
    this.store.dispatch(logout());
  }

}
