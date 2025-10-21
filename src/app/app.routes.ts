import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from '@auth-pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from '@auth-pages/reset-password/reset-password.component';
import { bookRoutes } from '@book-module/book.router';
import { IsUserAuthenticated } from '@core/guards/auth.guard';
import { LoginRedirectGuard } from '@core/guards/loginRedirect.guard';
import { RedirectBasedOnAuth } from '@core/guards/redirectBasedOnAuth.guard';
import { RegisterUserComponent } from 'modules/auth-module/pages/register-user/register-user.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectBasedOnAuth],
    loadComponent: () => 
      import('../app/modules/auth-module/pages/login/login.component').then(c => c.LoginComponent),
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
      import('../app/modules/auth-module/pages/login/login.component').then(c => c.LoginComponent),
    canActivate: [LoginRedirectGuard]
  },
  { path: '**', redirectTo: '' }
];

