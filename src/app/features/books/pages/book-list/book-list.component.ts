import { computed, effect } from '@angular/core';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../services/book.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { SearchBooksView } from '../../types/book';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debouncedSignal } from '../../../../utils/debouncedSignal';

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
