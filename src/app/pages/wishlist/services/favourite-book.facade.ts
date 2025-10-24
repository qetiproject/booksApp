import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserService } from '@auth-module';
import { BooksView } from '@book-module';
import { STORAGE_KEYS } from '@core';

@Injectable()
export class FavouriteBookFacade {
  private readonly STORAGE_KEY = STORAGE_KEYS.FAVOURITE;
  private readonly userService = inject(UserService);

  favouriteBooks: WritableSignal<BooksView[]> = signal([]);

  constructor() {
    effect(() => {
      const user = this.userService.getCurrentUser();
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

  private loadFavouriteBooks(userId: number): void {
    const stored = localStorage.getItem(this.getKey(userId));
    const books = stored ? (JSON.parse(stored) as BooksView[]) : [];
    this.favouriteBooks.set(books);
  }

  private saveToStorage(): void {
    const user = this.userService.getCurrentUser();
    if (!user) return;
    localStorage.setItem(this.getKey(user.userId), JSON.stringify(this.favouriteBooks()));
  }

  addBookToFavourite(book: BooksView): void {
    const exists = this.favouriteBooks().some(b => b.id === book.id);
    if (!exists) {
      this.favouriteBooks.update(current => [book, ...current]);
      this.saveToStorage();
    }
  }

  removeBookFromFavourite(book: BooksView): void {
    this.favouriteBooks.update(current => current.filter(b => b.id !== book.id));
    this.saveToStorage();
  }

  clearFavourites(): void {
    this.favouriteBooks.set([]);
    const user = this.userService.getCurrentUser();
    if (user) localStorage.removeItem(this.getKey(user.userId));
  }

  getFavourites(): BooksView[] {
    return this.favouriteBooks();
  }
}
