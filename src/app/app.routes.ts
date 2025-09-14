import { Routes } from '@angular/router';
import { bookRoutes } from './features/books/book.router';
import { catalogueRoutes } from './pages/catalogues/catalogue.route';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  },      
  {
    path: 'login',
    component: LoginComponent
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
