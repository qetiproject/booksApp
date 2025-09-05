import { computed, effect } from '@angular/core';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../services/book.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { SearchBooksView } from '../../types/book';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{

  private bookService = inject(BookService);
  searchValue$!: Observable<SearchBooksView[]>;
  searchControl = new FormControl('');

  private searchResultSignal = signal<SearchBooksView[]>([]);

  searchSignal = computed(() => this.searchResultSignal());


  searchBooks() {
    this.searchValue$ = this.searchControl.valueChanges.pipe(
      startWith(''), // საწყისი მნიშვნელობა
      debounceTime(300), // 300მწმ-ის შემდეგ იწყებს ძებნას,
      map(value => value?.trim() || ''), // დამატებით ვწმინდავთ სივრცეებს
      distinctUntilChanged(),
      filter(value => value.length > 0), // ვფილტრავთ ცარიელ მნიშვნელობებს
      switchMap(query =>
      this.bookService.searchBooks(query).pipe(
        catchError(err => {
          console.error('Search error', err);
          return of([]); // თუ error, სტრიმი არ წყდება
        })
      )
    ));
  }


  searchWithSignals() {
    this.searchControl.valueChanges.pipe(
      startWith(''), // საწყისი მნიშვნელობა
      debounceTime(300), // 300მწმ-ის შემდეგ იწყებს ძებნას,
      map(value => value?.trim() || ''), // დამატებით ვწმინდავთ სივრცეებს
      distinctUntilChanged(),
      filter(value => value.length > 0), // ვფილტრავთ ცარიელ მნიშვნელობებს
      switchMap(query =>
      this.bookService.searchBooks(query).pipe(
        catchError(err => {
          console.error('Search error', err);
          return of([]); // თუ error, სტრიმი არ წყდება
        })
      ))
    ).subscribe(res => this.searchResultSignal.set(res));
  }
  ngOnInit(): void {
    this.searchWithSignals();
  }


}
