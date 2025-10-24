import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserService } from '@auth-module';
import { BooksView } from '@book-module';
import { STORAGE_KEYS } from '@core';

@Injectable({
  providedIn: 'root',
})
export class FavouriteBookService {
  private readonly STORAGE_KEY = STORAGE_KEYS.FAVOURITE;

  favouriteBooks: WritableSignal<BooksView[]> = signal([]);
  #userService = inject(UserService);

  constructor() {
    effect(() => {
      const user = this.#userService.getCurrentUser(); 
      console.log(user, "user")
      if (user) {
        this.loadFavouriteBooks(user.userId);
      } else {
        this.favouriteBooks.set([]);
      }
    });
  }

  private getKey(userId: number): string {
    return `${this.STORAGE_KEY}_${userId}`;
  }

  private loadFavouriteBooks(userId: number) {
    const data = localStorage.getItem(this.getKey(userId));
    const books = data ? (JSON.parse(data) as BooksView[]) : [];
    this.favouriteBooks.set(books);
  }

  addBookInFavourite(book: BooksView) {
    const exists = this.favouriteBooks().some(b => b.id === book.id);
    if (!exists) {
      this.favouriteBooks.update(curr => [book, ...curr]);
      this.saveToStorage();
    }
  }

  removeBookFromFavourite(book: BooksView) {
    this.favouriteBooks.update(cur => cur.filter(b => b.id !== book.id));
    this.saveToStorage();
  }

  private saveToStorage() {
    const user = this.#userService.getCurrentUser();
    if (!user) return;
    localStorage.setItem(this.getKey(user.userId), JSON.stringify(this.favouriteBooks()));
  }
}
