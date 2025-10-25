import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BooksView } from '@book-module';
import { MessagesService, STORAGE_KEYS } from '@core';
import { MessageSeverity } from '@types';

@Injectable({
  providedIn: 'root'
})
export class FavouriteBookFacade {
  #messages = inject(MessagesService);

  favouriteBooks: WritableSignal<BooksView[]> = signal([]);

  loadFavouriteBooks(userId: number): void {
    const stored = localStorage.getItem(this.getKey(userId));
    const books = stored ? (JSON.parse(stored) as BooksView[]) : [];
    this.favouriteBooks.set(books);
  }

  addBookToFavourite(book: BooksView, userId: number): void {
    const exists = this.favouriteBooks().some(b => b.id === book.id);
    if (!exists) {
      this.favouriteBooks.update(current => [book, ...current]);
      this.saveToStorage(userId);
    }
  }

  removeBookFromFavourite(book: BooksView, userId: number): void {
    this.favouriteBooks.update(current => current.filter(b => b.id !== book.id));
    this.saveToStorage(userId);
    if(this.favouriteBooks().length === 0) {
      localStorage.removeItem(this.getKey(userId))
    }
    this.#messages.showMessage({
      text: `📚 "${book.title}" წარმატებით წაიშალა სიიდან!`,
      severity: MessageSeverity.Success
    })
  }

  private getKey(userId: number): string {
    return `${STORAGE_KEYS.FAVOURITE}_${userId}`;
  }

  private saveToStorage(userId: number): void {
    localStorage.setItem(this.getKey(userId), JSON.stringify(this.favouriteBooks()));
  }
}
