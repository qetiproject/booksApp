import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./pages/book-details/book-details.component";
import { BookDetailsResolver } from "./pages/book-details/book-details.resolver";
import { BookListComponent } from "./pages/book-list/book-list.component";

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: ':id',
    component: BookDetailsComponent,
    resolve: BookDetailsResolver
  }
]
