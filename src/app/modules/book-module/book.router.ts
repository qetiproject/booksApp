import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./pages/book-details/book-details.component";
import { BookDetailsResolver } from "./pages/book-details/book-details.resolver";
import { BookDetailsRouteData } from "./types/book-details";

export const bookRoutes: Routes = [
   {
    path: '',
    loadComponent: () => 
      import('../../pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: ':id',
    component: BookDetailsComponent,
    resolve: {
      book: BookDetailsResolver
    },
     data: {} as BookDetailsRouteData
  }
]
