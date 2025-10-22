
import { Component, effect, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent, BookFacadeService, BookService, BooksView } from '@book-module';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  #bookFacadeService = inject(BookFacadeService)
  #bookService = inject(BookService);

  // signals
  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);
  books = this.#bookFacadeService.books;

  constructor() {
    this.initEffects();
  }

  initEffects() {
    effect(() => {
      if(this.searchQuery()){
        this.#bookService.getBooks(this.searchQuery(), null)
      }
    });

    effect(() => {
      if(this.categorySelected() != null){
        this.#bookService.getBooks(null, this.categorySelected())
      }
    });
  }

  onAddInFavouriteEvent(book: BooksView) {
    this.#bookService.onAddInFavouriteEvent(book);
  }

}
