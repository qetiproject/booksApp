import { Routes } from "@angular/router";
import { BookDetailsResolver, BookDetailsRouteData } from "@book-module";


export const bookRoutes: Routes = [
   {
    path: '',
    loadComponent: () => 
      import('@pages').then(c => c.HomeComponent)
  },
  {
    path: ':id',
    loadComponent: () => 
      import('@book-module').then(c => c.BookDetailsComponent),
    resolve: {
      book: BookDetailsResolver
    },
     data: {} as BookDetailsRouteData
  }
]
