import { inject, Injectable } from '@angular/core';
import { BookDetails, BookFacadeService, BooksView } from '@book-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookFacade = inject(BookFacadeService);
  books = this.bookFacade.books;
  
  searchBooksByName(
    name: string | null, 
    maxResults: number, 
    startIndex: number,
    userId: number
  ): Observable<{ items: BooksView[]; totalItems: number }> {
    return this.bookFacade.searchBooksByName(name, maxResults,startIndex, userId);
  }

  loadBooksByCategory(
    category: string | null, 
    maxResults: number, 
    startIndex: number,
    userId: number
  ): Observable<{ items: BooksView[]; totalItems: number }> {

    return this.bookFacade.loadBooksByCategory(category, maxResults, startIndex, userId);
  }

  bookById(id: string): Observable<BookDetails> {
    return this.bookFacade.bookById(id);
  }

  getBooks(query: string | null, category: string | null): void {
    return this.bookFacade.getBooks(query, category);
  }

  resetPage() {
    return this.bookFacade.resetPage();
  }
  
}
