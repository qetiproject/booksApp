import { inject, Injectable } from '@angular/core';
import { BookDetails, BookFacadeService, BooksView } from '@book-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookFacade = inject(BookFacadeService);

  searchBooksByName(
    name: string | null, 
    maxResults: number, 
    startIndex: number
  ): Observable<{ items: BooksView[]; totalItems: number }> {
    return this.bookFacade.searchBooksByName(name, maxResults,startIndex);
  }

  loadBooksByCategory(
    category: string | null, 
    maxResults: number, 
    startIndex: number
  ): Observable<{ items: BooksView[]; totalItems: number }> {

    return this.bookFacade.loadBooksByCategory(category, maxResults, startIndex);
  }

  bookById(id: string, userId: number): Observable<BookDetails> {
    return this.bookFacade.bookById(id, userId);
  }

  getBooks(query: string | null, category: string | null): void {
    return this.bookFacade.getBooks(query, category);
  }

  onAddInFavouriteEvent(book: BooksView): void {
    return this.bookFacade.onAddInFavouriteEvent(book);
  }

  resetPage() {
    return this.bookFacade.resetPage();
  }
  
}
