import { Component, inject, signal } from '@angular/core';
import { BookService } from '../../services/book.service';
import { tap } from 'rxjs';
import { SearchBooksView } from '../../types/book';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {

  #books = signal<SearchBooksView[]>([]);
  bookService = inject(BookService);

  searchBooks(name: string) {
    this.bookService.searchBooks(name)
      .pipe(tap(books => this.#books.set(books)))
      .subscribe(x => console.log(x));
  }

  get books() {
    return this.#books();
  }


  getBooks() {

  }
}
