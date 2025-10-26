import { inject, Injectable } from '@angular/core';
import { BookDetails, BooksView } from '@book-module';
import { MessagesService, STORAGE_KEYS } from '@core';
import { MessageSeverity } from '@types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueFacade {
  private messages = inject(MessagesService);
  private errorMessage = 'Failed to save catalogue to localStorage';

  books = new BehaviorSubject<BooksView[]>([]);
  books$ = this.books.asObservable();

  loadCatalogueBooks(userId: number) {
    const stored = localStorage.getItem(this.getKey(userId));
    const books = stored ? (JSON.parse(stored) as BooksView[]) : []
    this.books.next(books);
  }

  addBook(book: BookDetails, userId: number): void {
    const newBook = this.mapToBookView(book, userId);
    const current = this.books.value;
    const existCatalogueBook = current.some(b => b.id === newBook.id && b.userId === userId);
    if(!existCatalogueBook) {
        this.updateBooks([newBook, ...current], userId);
    }
  }

  private mapToBookView(details: BookDetails, userId: number): BooksView {
    return {
      id: details.id,
      title: details.volumeInfo.title,
      authors: details.volumeInfo.authors ?? [],
      language: details.volumeInfo.language,
      imageLinks: {
        thumbnail: details.volumeInfo.imageLinks.thumbnail || 'assets/no-image.png',
        smallThumbnail: details.volumeInfo.imageLinks.smallThumbnail || 'assets/no-image.png',
      },
      categories: details.volumeInfo.categories,
      userId
    };
  }
  
  removeBook(book: BooksView): void {
    // this.updateBooks(this.books.value.filter(x => x.id !== book.id));
  }

//   remove(book: BooksView, userId: number): void {
//     const curBooks = this.books.value.filter(b => b.id  !== book.id);
//     if(!curBooks) localStorage.removeItem(this.getKey(userId));
//     this.updateBooks(curBooks, userId);
//   }

  private updateBooks(updated: BooksView[], userId: number): void {
    this.books.next(updated);
    try{
        localStorage.setItem(this.getKey(userId), JSON.stringify(updated));
    }
    catch(err){
      this.messages.showMessage({
        text: `📚 ${this.errorMessage}- ${err}`,
        severity: MessageSeverity.Error,
        duration: 5000
      })
    }
  }

  private getKey(userId: number): string {
    return `${STORAGE_KEYS.CATALOGUE}_${userId}`;
  }

}
