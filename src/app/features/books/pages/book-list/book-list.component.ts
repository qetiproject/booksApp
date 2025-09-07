import { CommonModule } from '@angular/common';
import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, combineLatest, map, of, startWith, switchMap } from 'rxjs';
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
export class BookListComponent {

  private bookService = inject(BookService);

  // inputs
  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);

  private searchQuery$ = toObservable(this.searchQuery);
  private categorySelected$ = toObservable(this.categorySelected);

  // result
  result: WritableSignal<BooksView[]> = signal([]);


  constructor() {
    this.loadBooks()
  }

  private searchData(query: string ) {
    return query && query.length >= 3
      ? this.bookService.searchBooksByName(query).pipe(
          catchError(() => of([])),
          startWith([])
        )
      : of([]);
  }

  private booksByCategory(category: string | null) {
    return category
      ? this.bookService.loadBooksByCategory(category).pipe(
          catchError(() => of([])),
          startWith([])
        )
      : of([]);
  }

  private loadBooks() {
    combineLatest([this.searchQuery$, this.categorySelected$])
    .pipe(
      switchMap(([query, category]) =>
        combineLatest([
          this.searchData(query),
          this.booksByCategory(category)
        ])
      ),
      map(([searchBooks, categoryBooks]) => [...categoryBooks, ...searchBooks]),
      takeUntilDestroyed()
    )
    .subscribe(res => this.result.set(res));
  }
}
