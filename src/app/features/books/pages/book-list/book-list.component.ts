import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
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
  // searchControl = new FormControl('');

  // // 1️⃣ query სიგნალი (writable)
  // query: WritableSignal<string> = signal('');

  // // 2️⃣ debounce
  // debouncedQuery = debouncedSignal(this.query, 400);

  // 3️⃣ შედეგები
  results: WritableSignal<SearchBooksView[]> = signal([]);

  // constructor() {
  //   // FormControl → Signal binding
  //   this.searchControl.valueChanges.subscribe(value => {
  //     this.query.set(value?.trim() || '');
  //   });

  //   // Effect რეაგირებს debouncedQuery-ზე
  //   effect((onCleanup) => {
  //     const q = this.debouncedQuery();

      // if (!q || q.length < 3) {
      //   this.results.set([]);
      //   return;
      // }

      // const sub = this.bookService.searchBooksByName(q).pipe(
      //   catchError(() => of([]))
      // ).subscribe(res => this.results.set(res));

  //     onCleanup(() => sub.unsubscribe());
  //   });
  // }

  onCategorySelectedEvent(value: string | null) {
    console.log(value, "value")
  }
  

  onSearchEvent(value: string) {
      if (!value || value.length < 3) {
        this.results.set([]);
        return;
      }
      this.bookService.searchBooksByName(value).pipe(
        catchError(() => of([]))
      ).subscribe(res => this.results.set(res));

  }
}
