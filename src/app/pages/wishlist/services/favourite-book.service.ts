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

  loadFavouriteBooks(userId: number): void {
    this.facade.loadFavouriteBooks(userId)
  }

  addBookToFavourite(book: BooksView, userId: number): void {
    this.facade.addBookToFavourite(book, userId);
  }

  removeBookFromFavourite(book: BooksView, userId: number): void {
    this.facade.removeBookFromFavourite(book, userId);
  }
}
