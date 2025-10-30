import { Routes } from '@angular/router';
import { IsUserAuthenticated, LoginRedirectGuard, RedirectBasedOnAuth } from '@core';
import { authRoutes } from 'modules/auth-module/auth.routes';
import { ProfileResolver } from 'modules/auth-module/pages/profile/profile.resolver';
import { bookRoutes } from 'modules/book-module/book.router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectBasedOnAuth],
    pathMatch: 'full',
    loadComponent: () => 
      import('@auth-module').then(c => c.LoginComponent),
  },
  { 
    path: 'books', 
    canActivateChild: [IsUserAuthenticated], 
    children: bookRoutes,  
  },
  { path: 'catalogue', 
    canActivate: [IsUserAuthenticated],
    loadComponent: () => 
          import('@pages').then(c => c.CataloguesComponent), 
  },
  { path: 'favourites', 
    canActivate: [IsUserAuthenticated],
    loadComponent: () => 
      import('@pages').then(c => c.WishlistComponent), 
  },
  { 
    path: '', 
    canActivate: [LoginRedirectGuard], 
    children: authRoutes
  },
   { 
    path: 'profile', 
    canActivate: [IsUserAuthenticated], 
    loadComponent: () => import('@auth-module').then(c => c.ProfileComponent),
    resolve: { user: ProfileResolver },
  },
  { path: '**', redirectTo: '' }
];


