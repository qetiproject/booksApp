import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { BookService } from '../../services/book.service';
import { BooksView } from '../../types/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent{

  private bookService = inject(BookService);

  searchResults: WritableSignal<BooksView[]> = signal([]);
  categoryBooksResults: WritableSignal<BooksView[]> = signal([]);
  searchQuery = input<string>('');
  categorySelected = input<string | null>('');
  #querySub: Subscription | null = null;
  #categorySub: Subscription | null = null;

  constructor() {
    // Effect რეაგირებს debouncedQuery-ზე
    effect((onCleanup) => {
      this.searchBooksByName();
      this.booksByCategory();
      // Cleanup on next effect run
      onCleanup(() => {
        this.#querySub?.unsubscribe();
        this.#categorySub?.unsubscribe();
      });
    });
  }

  searchBooksByName() {
    const query = this.searchQuery();
    if (!query || query.length < 3) {
      this.searchResults.set([]);
      return;
    }
    this.categoryBooksResults.set([]);

    // ჩაკეტე წინა subscription, თუ არსებობს
    if (this.#querySub) {
      this.#querySub.unsubscribe();
    }
    this.#querySub = this.bookService.searchBooksByName(query).pipe(catchError(() => of([])))
      .subscribe(res => this.searchResults.set(res));  }

  booksByCategory() {
    const category = this.categorySelected();
    if(!category) {
      this.categoryBooksResults.set([]);
      return;
    }

    this.searchResults.set([]);
    
    if(this.#categorySub) {
      this.#categorySub.unsubscribe();
    }

    this.#categorySub = this.bookService.loadBooksByCategory(category).pipe(catchError(() => of([])))
      .subscribe(res => this.categoryBooksResults.set(res));
  }

}
