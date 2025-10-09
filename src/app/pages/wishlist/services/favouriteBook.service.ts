import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BooksView } from '../../../modules/book-module/types/book';

@Injectable({
  providedIn: 'root',
})
export class FavouriteBookService {
  private readonly STORAGE_KEY =  environment.favouritesStorageKey;
  
  favouriteBooks: WritableSignal<BooksView[]> = signal([]);
  
  constructor() {
    this.favouriteBooks.set(this.loadFavouriteBooks());
  }

  loadFavouriteBooks(): BooksView[] {
    const currentBooks = localStorage.getItem(this.STORAGE_KEY);
    return currentBooks ? JSON.parse(currentBooks) : [];
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
