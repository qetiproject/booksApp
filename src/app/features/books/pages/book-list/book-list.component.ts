import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { DebounceSearchComponent } from "../../../../components/debounce-search/debounce-search.component";
import { BookService } from '../../services/book.service';
import { SearchBooksView } from '../../types/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,  DebounceSearchComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent{

  private bookService = inject(BookService);

  results: WritableSignal<SearchBooksView[]> = signal([]);
  searchQuery = signal<string>('');
  #sub: Subscription | null = null;

  constructor() {
    // Effect რეაგირებს debouncedQuery-ზე
    effect((onCleanup) => {
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
      // Cleanup on next effect run
      onCleanup(() => this.#sub?.unsubscribe());
    });
  }

  onSearchEvent(value: string) {
    this.searchQuery.set(value);
  }

  onCategorySelectedEvent(value: string | null) {
    console.log(value, "value")
  }
}
