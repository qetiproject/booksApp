import {Routes} from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { authRoutes } from './features/auth/auth.route';
import { IsAuthenticated } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    children: authRoutes
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [IsAuthenticated]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
