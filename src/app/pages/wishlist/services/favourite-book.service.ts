import { Injectable, inject } from '@angular/core';
import { BooksView } from '@book-module';
import { FavouriteBookFacade } from './favourite-book.facade';

@Injectable({
  providedIn: 'root',
})
export class FavouriteBookService {
  private readonly bookFacade = inject(FavouriteBookFacade);

  get favouriteBooks() {
    return this.bookFacade.favouriteBooks;
  }

  loadFavouriteBooks(userId: number): void {
    this.bookFacade.loadFavouriteBooks(userId)
  }

  addBookToFavourite(book: BooksView, userId: number): void {
    this.bookFacade.addBookToFavourite(book, userId);
  }

  removeBookFromFavourite(book: BooksView, userId: number): void {
    this.bookFacade.removeBookFromFavourite(book, userId);
  }
}
