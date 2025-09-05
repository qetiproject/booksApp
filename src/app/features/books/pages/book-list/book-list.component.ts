import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError, of } from 'rxjs';
import { debouncedSignal } from '../../../../utils/debouncedSignal';
import { BookCategoryDropdownComponent } from "../../components/book-category-dropdown/book-category-dropdown.component";
import { BookService } from '../../services/book.service';
import { SearchBooksView } from '../../types/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, BookCategoryDropdownComponent],
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

      const sub = this.bookService.searchBooksByName(q).pipe(
        catchError(() => of([]))
      ).subscribe(res => this.results.set(res));

      onCleanup(() => sub.unsubscribe());
    });
  }
}
