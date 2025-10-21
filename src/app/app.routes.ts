import { Routes } from '@angular/router';
import { ForgotPasswordComponent, RegisterUserComponent, ResetPasswordComponent } from '@auth-module';
import { IsUserAuthenticated, LoginRedirectGuard, RedirectBasedOnAuth } from '@core';
import { bookRoutes } from 'modules/book-module/book.router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectBasedOnAuth],
    loadComponent: () => 
      import('@auth-module').then(c => c.LoginComponent),
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [IsUserAuthenticated],
    children: [
      { path: 'books', children: bookRoutes },
      { path: 'favourites', 
        loadComponent: () => 
          import('@pages/wishlist/wishlist.component').then(c => c.WishlistComponent) },
      { path: 'catalogue', 
        loadComponent: () => 
          import('@pages/catalogues/catalogues.component').then(c => c.CataloguesComponent)
      },
      // { path: 'profile', 
      //   loadComponent: () => 
      //     import('@auth-module/pages/profile/profile.component').then(c => c.ProfileComponent)
      // }
    ],
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'send-reset-otp',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'login',
    loadComponent: () => 
      import('@auth-module').then(c => c.LoginComponent),
    canActivate: [LoginRedirectGuard]
  },
  { path: '**', redirectTo: '' }
];

