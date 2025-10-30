
import { Component, effect, inject, input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import * as UserSelectors from '@auth-module';
import { BookCardComponent, BookService, BooksView } from '@book-module';
import { Store } from '@ngrx/store';
import { FavouriteBookService } from '@pages';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  #bookService = inject(BookService);
  #favouriteBookService = inject(FavouriteBookService);

  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);
  books = this.#bookService.books;
  userId: Signal<number | undefined> ;
  #store = inject(Store);
  
  constructor(){
    this.userId = toSignal(this.#store.select(UserSelectors.selectActiveUserId).pipe(
        filter((id): id is number => id !== null),
        take(1))
    )
    effect(() => {
      const search = this.searchQuery();
      const category = this.categorySelected();
      const id = this.userId();

      if ((!search && !category) || !id) return;

      this.#bookService.getBooks(search ?? null, category ?? null);
    });
  }

  onAddInFavouriteEvent(book: BooksView) {
    const id = this.userId();
    if (!id) return;
    this.#favouriteBookService.addBookToFavourite(book, id);
  }

}
