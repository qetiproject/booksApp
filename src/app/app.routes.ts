import { Routes } from '@angular/router';
import { LoginComponent } from 'modules/auth/pages/login/login.component';
import { ProfileComponent } from 'modules/auth/pages/profile/profile.component';
import { IsUserAuthenticated } from './core/guards/auth.guard';
import { LoginRedirectGuard } from './core/guards/loginRedirect.guard';
import { RedirectBasedOnAuth } from './core/guards/redirectBasedOnAuth.guard';
import { bookRoutes } from './modules/book-module/book.router';
import { CataloguesComponent } from './pages/catalogues/catalogues.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectBasedOnAuth],
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [IsUserAuthenticated],
    children: [
      { path: 'books', children: bookRoutes },
      { path: 'favourites', component: WishlistComponent },
      { path: 'catalogue', component: CataloguesComponent },
      { path: 'profile', component: ProfileComponent }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectGuard]
  },
  { path: '**', redirectTo: '' }
];

