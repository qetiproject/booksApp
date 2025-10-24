import { Injectable, inject } from '@angular/core';
import { BooksView } from '@book-module';
import { FavouriteBookFacade } from './favourite-book.facade';

@Injectable({
  providedIn: 'root',
})
export class FavouriteBookService {
  private readonly facade = inject(FavouriteBookFacade);

  get favouriteBooks() {
    return this.facade.favouriteBooks;
  }

  addBookToFavourite(book: BooksView): void {
    this.facade.addBookToFavourite(book);
  }

  removeBookFromFavourite(book: BooksView): void {
    this.facade.removeBookFromFavourite(book);
  }

  clearFavourites(): void {
    this.facade.clearFavourites();
  }

  getFavourites(): BooksView[] {
    return this.facade.getFavourites();
  }
}
