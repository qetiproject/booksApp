import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { debouncedSignal } from '../../../../utils/debouncedSignal';
import { BookService } from '../../services/book.service';
import { SearchBooksView } from '../../types/book';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent{

  private bookService = inject(BookService);
  searchControl = new FormControl('');

  // 1️⃣ query სიგნალი (writable)
  query: WritableSignal<string> = signal('');

  // 2️⃣ debounce
  debouncedQuery = debouncedSignal(this.query, 400);

  // 3️⃣ შედეგები
  results: WritableSignal<SearchBooksView[]> = signal([]);

  constructor() {
    // FormControl → Signal binding
    this.searchControl.valueChanges.subscribe(value => {
      this.query.set(value?.trim() || '');
    });

    // Effect რეაგირებს debouncedQuery-ზე
    effect((onCleanup) => {
      const q = this.debouncedQuery();

      if (!q || q.length < 3) {
        this.results.set([]);
        return;
      }

      const sub = this.bookService.searchBooks(q).pipe(
        catchError(() => of([]))
      ).subscribe(res => this.results.set(res));

      onCleanup(() => sub.unsubscribe());
    });
  }
}
