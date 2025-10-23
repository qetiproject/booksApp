import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserSafeInSystem, UserService } from '@auth-module';
import { BooksView } from '@book-module';
import { STORAGE_KEYS } from '@core';

@Injectable({
  providedIn: 'root',
})
export class FavouriteBookService {
  private readonly STORAGE_KEY =  STORAGE_KEYS.FAVOURITE;
  
  favouriteBooks: WritableSignal<BooksView[]> = signal([]);
  #userService = inject(UserService);
  user: UserSafeInSystem | null = this.#userService.getCurrentUser();

  constructor() {
    if (!this.user) return;
    this.favouriteBooks.set(this.loadFavouriteBooks(this.user?.userId));
  }

  loadFavouriteBooks(userId: number): BooksView[] {
    const currentBooks = localStorage.getItem(this.STORAGE_KEY);
    if (!currentBooks) return [];

    const parsedBooks = JSON.parse(currentBooks) as BooksView[];
    const books = parsedBooks.filter(x => x.userId === userId);
    console.log(books, "books")
    return books;
  }

  addBookInFavourite(book: BooksView) {
    const exists = this.favouriteBooks().some(b => b.id === book.id);
    if(!exists) {
      this.favouriteBooks.update(curr => [book, ...curr]);
      this.saveToStorage();
    }
  }

  removeBookFromFavourite(book: BooksView) {
    this.favouriteBooks.update(cur => cur.filter(b => b.id !== book.id));
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favouriteBooks()))
  }
}
