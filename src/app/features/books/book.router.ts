import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./pages/book-details/book-details.component";
import { BookDetailsResolver } from "./pages/book-details/book-details.resolver";

export const bookRoutes: Routes = [
  {
    path: ':id',
    component: BookDetailsComponent,
    resolve: {
      book: BookDetailsResolver
    }
  }
]
