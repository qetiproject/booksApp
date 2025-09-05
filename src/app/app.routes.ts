import {Routes} from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { bookRoutes } from './features/books/book.router';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
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
