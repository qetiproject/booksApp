import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MessagesService } from '../../../core/services/messages.service';
import { BooksView } from '../../../modules/book-module/types/book';
import { BookDetails } from '../../../modules/book-module/types/book-details';
import { MessageSeverity } from '../../../types/common';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private readonly STORAGE_KEY = environment.catalogueStorageKey;
  private messages = inject(MessagesService);
  private errorMessage = 'Failed to save catalogue to localStorage';

  books = new BehaviorSubject<BooksView[]>([]);
  books$ = this.books.asObservable();

  constructor() {
    this.loadBooks();
  }
  
  addBook(book: BookDetails): void {
    const view = this.mapToBookView(book);
    const current = this.books.value;
    if(!current.some(b => b.id == view.id)){
      this.updateBooks([view, ...current]);
    }
  }

  private mapToBookView(details: BookDetails): BooksView {
    return {
      id: details.id,
      title: details.volumeInfo.title,
      authors: details.volumeInfo.authors ?? [],
      language: details.volumeInfo.language,
      imageLinks: {
        thumbnail: details.volumeInfo.imageLinks.thumbnail || 'assets/no-image.png',
        smallThumbnail: details.volumeInfo.imageLinks.smallThumbnail || 'assets/no-image.png',
      },
      categories: details.volumeInfo.categories
    };
  }
  
  removeBook(book: BooksView): void {
    this.updateBooks(this.books.value.filter(x => x.id !== book.id));
  }

  private loadBooks() {
    const currentBooks = localStorage.getItem(this.STORAGE_KEY);
    this.books.next(currentBooks ? JSON.parse(currentBooks) : []);
  }

  private updateBooks(updated: BooksView[]): void {
    this.books.next(updated);
    try{
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    }
    catch(err){
      this.messages.showMessage({
        text: `📚 ${this.errorMessage}- ${err}`,
        severity: MessageSeverity.Error,
        duration: 5000
      })
    }
  }

}
