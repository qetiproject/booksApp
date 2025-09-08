import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { showSnackbar } from '../../../utils/snackbar';
import { BookDetails } from '../../books/types/book-details';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private readonly STORAGE_KEY = environment.catalogueStorageKey;
  private snackbar = inject(MatSnackBar);
  private errorMessage = 'Failed to save catalogue to localStorage';

  books = new BehaviorSubject<BookDetails[]>([]);
  books$ = this.books.asObservable();

  constructor() {
    this.loadBooks();
  }
  
  addBook(book: BookDetails): void {
    const current = this.books.value;
    if(!current.some(b => b.id == book.id)){
      this.updateBooks([book, ...this.books.value]);
    }
  }
  
  removeBook(book: BookDetails): void {
    this.updateBooks(this.books.value.filter(x => x.id !== book.id));
  }

  private loadBooks() {
    const currentBooks = localStorage.getItem(this.STORAGE_KEY);
    this.books.next(currentBooks ? JSON.parse(currentBooks) : []);
  }

  private updateBooks(updated: BookDetails[]): void {
    this.books.next(updated);
    try{
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    }
    catch(err){
      showSnackbar(this.snackbar, `📚 ${this.errorMessage}- ${err}`);
    }
  }

}
