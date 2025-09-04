import {Routes} from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { authRoutes } from './features/auth/auth.route';
import { IsAuthenticated } from './core/guards/auth.guard';
import { bookRoutes } from './features/books/book.router';

export const routes: Routes = [
  // {
  //   path: "",
  //   children: authRoutes,
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  //   canActivate: [IsAuthenticated]
  // },
  // {
  //   path: "home",
  //   component: HomeComponent,
  //   canActivate: [IsAuthenticated]
  // },
  // {
  //   path: 'books',
  //   children: bookRoutes
  // },
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsAuthenticated]
  },
  {
    path: 'books',
    children: bookRoutes
  },
  ...authRoutes,
  {
    path: '**',
    redirectTo: ''
  }
];
