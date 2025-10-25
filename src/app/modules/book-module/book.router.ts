import { Routes } from "@angular/router";


export const bookRoutes: Routes = [
   {
    path: '',
    loadComponent: () => 
      import('@pages/home/home.component').then(c => c.HomeComponent)
  },
  // {
  //   path: ':id',
  //   loadComponent: () => 
  //     import('@book-module').then(c => c.BookDetailsComponent),
  //   resolve: {
  //     book: BookDetailsResolver
  //   },
  //    data: {} as BookDetailsRouteData
  // }
]
