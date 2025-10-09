
import { Component, effect, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent } from '@book-module-components/book-card/book-card.component';
import { BookFacadeService } from '@book-module/services/book.facade';
import { BooksView } from '../../types/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  #bookFacadeService = inject(BookFacadeService)

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
        this.#bookFacadeService.getBooks(this.searchQuery(), null)
      }
    });

    effect(() => {
      if(this.categorySelected() != null){
        this.#bookFacadeService.getBooks(null, this.categorySelected())
      }
    });
  }

  onAddInFavouriteEvent(book: BooksView) {
    this.#bookFacadeService.onAddInFavouriteEvent(book);
  }

}
