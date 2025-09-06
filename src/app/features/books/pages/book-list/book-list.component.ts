import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { SearchBooksView } from '../../types/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent{

  private bookService = inject(BookService);

  results: WritableSignal<SearchBooksView[]> = signal([]);
  searchQuery = input<string>('');
  categorySelected = input<string | null>('');
  #sub: Subscription | null = null;

  constructor() {
    // Effect რეაგირებს debouncedQuery-ზე
    effect((onCleanup) => {
      this.searchBooksByName();
      this.booksByCategory();
      // Cleanup on next effect run
      onCleanup(() => this.#sub?.unsubscribe());
    });
  }

  searchBooksByName() {
    const query = this.searchQuery();
    if (!query || query.length < 3) {
      this.results.set([]);
      return;
    }
    // ჩაკეტე წინა subscription, თუ არსებობს
    if (this.#sub) {
      this.#sub.unsubscribe();
    }
    this.#sub = this.bookService.searchBooksByName(query).pipe(catchError(() => of([])))
      .subscribe(res => this.results.set(res));
  }

  booksByCategory() {
    const category = this.categorySelected();
    if(!category) {
      this.results.set([]);
      return;
    }
    if(this.#sub) {
      this.#sub.unsubscribe();
    }

    console.log(category, "category")
    this.#sub = this.bookService.loadBooksByCategory(category).pipe(catchError(() => of([])))
      .subscribe(res => this.results.set(res));
  }

}
