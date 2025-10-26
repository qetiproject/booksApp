import { inject, Injectable } from '@angular/core';
import { BookDetails, BooksView } from '@book-module';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogueFacade } from './catalogue.facade';

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

  removeBook(book: BooksView): void {
    // this.updateBooks(this.books.value.filter(x => x.id !== book.id));
  }

}
