import { Routes } from "@angular/router";

import { BookDetailsResolver } from "@book-module-pages/book-details/book-details.resolver";
import { BookDetailsRouteData } from "./types/book-details";

export const bookRoutes: Routes = [
   {
    path: '',
    loadComponent: () => 
      import('@pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: ':id',
    loadComponent: () => 
      import('@book-module/pages/book-details/book-details.component').then(c => c.BookDetailsComponent),
    resolve: {
      book: BookDetailsResolver
    },
     data: {} as BookDetailsRouteData
  }
]
