import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.route';
import { bookRoutes } from './features/books/book.router';
import { catalogueRoutes } from './pages/catalogues/catalogue.route';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  },      
  {
    path: '',
    children: authRoutes
  },
  { path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  }, 
  {
    path: 'books',
    children: bookRoutes,
  },
  {
    path: 'catalogue',
    children: catalogueRoutes
  },
  {
    path: "favourites",
    component: WishlistComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];
