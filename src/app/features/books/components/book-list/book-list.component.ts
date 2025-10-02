
import { Component, effect, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PagingComponent } from "../../../../components/paging/paging";
import { BooksView } from '../../types/book';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookFacadeService } from './book.facade';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent, PagingComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  #bookFacadeService = inject(BookFacadeService)

  // signals
  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);
  bookToShow = this.#bookFacadeService.getBooksWithPaging;

  constructor() {
    this.initEffects();
  }

  initEffects() {
    effect(() => {
      this.#bookFacadeService.searchBooksByName(this.searchQuery())
    });

    effect(() => {
      this.#bookFacadeService.getBooksByCategory(this.categorySelected())
    });
  }

  onAddInFavouriteEvent(book: BooksView) {
    this.#bookFacadeService.onAddInFavouriteEvent(book);
  }

}
