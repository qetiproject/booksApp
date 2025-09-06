import { Routes } from '@angular/router';
import { bookRoutes } from './features/books/book.router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  },      
  { path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  }, 
  {
    path: 'books',
    children: bookRoutes
  },
  {
    path: '**',
    redirectTo: ''
  }
];
