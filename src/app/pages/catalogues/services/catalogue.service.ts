import { inject, Injectable } from '@angular/core';
import { BookDetails, BooksView } from '@book-module';
import { CatalogueFacade } from '@pages';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  #catalogueFacade = inject(CatalogueFacade);

  books$: Observable<BooksView[]> = this.#catalogueFacade.books$;
  
  addBook(book: BookDetails, userId: number): void {
    this.#catalogueFacade.addBook(book, userId);
  }

  loadCatalogueBooks(userId: number) {
    this.#catalogueFacade.loadCatalogueBooks(userId)
  }

  removeBook(book: BooksView, id: number): void {
    this.#catalogueFacade.removeBook(book, id);
  }

}
