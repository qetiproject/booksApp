import { Routes } from '@angular/router';
import { IsUserAuthenticated } from './core/guards/auth.guard';
import { authRoutes } from './features/auth/auth.route';
import { bookRoutes } from './features/books/book.router';
import { catalogueRoutes } from './pages/catalogues/catalogue.route';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [  
  {
    path: '',
    children: authRoutes
  },
 {
    path: '',
    canActivate: [IsUserAuthenticated],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'books', children: bookRoutes },
      { path: 'catalogue', children: catalogueRoutes },
      { path: 'favourites', component: WishlistComponent }
    ]
  },
 {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
