
import { Component, effect, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFacadeService } from '../../services/book.facade';
import { BooksView } from '../../types/book';
import { BookCardComponent } from '../book-card/book-card.component';

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
        this.#bookFacadeService.searchBooksByName(this.searchQuery())
      }
    });

    effect(() => {
      if(this.categorySelected()){
        this.#bookFacadeService.getBooksByCategory(this.categorySelected())
      }
    });
  }

  onAddInFavouriteEvent(book: BooksView) {
    this.#bookFacadeService.onAddInFavouriteEvent(book);
  }

}
