import {Routes} from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { authRoutes } from './features/auth/auth.route';

export const routes: Routes = [
  {
    path: "",
    children: authRoutes
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
