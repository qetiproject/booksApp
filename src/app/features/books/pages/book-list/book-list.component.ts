import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {

  bookService = inject(BookService);

  async searchBooks(name: string) {
    const books = await this.bookService.searchBooks(name);
    console.log(books)
  }
}
