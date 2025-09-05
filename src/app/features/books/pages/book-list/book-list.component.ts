import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../services/book.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap, tap } from 'rxjs';
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

  searchBooks() {
    this.searchValue$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => query ? this.bookService.searchBooks(query) : [])
    )
  }

  ngOnInit(): void {
    this.searchBooks();
  }


}
