import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { logout, TokenStorageService } from '@auth-module';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

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
  private tokenStorageService = inject(TokenStorageService);
  private router = inject(Router);
  
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
    this.tokenStorageService.clear();
    localStorage.removeItem(environment.USER_STORAGE_KEY);
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

}
