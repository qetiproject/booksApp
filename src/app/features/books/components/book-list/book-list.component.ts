import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FavouriteBookService } from '../../../../pages/wishlist/services/favouriteBook.service';
import { BookService } from '../../services/book.service';
import { LoadBooks, LoadBooksFailure } from '../../store/book.action';
import { selectBooks, selectPageSize, selectTotalItems } from '../../store/book.selector';
import { BooksView } from '../../types/book';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  private bookService = inject(BookService);
  private favouriteService = inject(FavouriteBookService);
  private store = inject(Store);

  // inputs
  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);

  // Signals
  searchedBooks: WritableSignal<BooksView[]> = signal([]);
  currentPage: WritableSignal<number> = signal(0);

  // Store signals
  booksByCategory = toSignal(this.store.select(selectBooks), { initialValue: [] });
  totalItems = toSignal(this.store.select(selectTotalItems), { initialValue: 0 });
  pageSize = toSignal(this.store.select(selectPageSize), { initialValue: 5 });

  // Combined books
  bookToShow = computed(() => {
    const combined = [
      ...this.searchedBooks(),
      ...this.booksByCategory()
    ];
    const uniqueBooksMap = new Map<string, BooksView>();
    combined.forEach(book => uniqueBooksMap.set(book.id, book));
    return Array.from(uniqueBooksMap.values());
  });

  constructor() {
    this.initEffects();
  }

  initEffects() {
    effect(() => {
      const query = this.searchQuery();
      if (!query || query.length <= 3) {
        this.searchedBooks.set([]);
        return;
      }
      this.bookService.searchBooksByName(query)
        .subscribe(result => this.searchedBooks.set(result));
    });
    effect(() => {
      const category = this.categorySelected();
      if (!category) {
        this.store.dispatch(LoadBooksFailure({ error: 'No category selected' }));
        return;
      }

      this.store.dispatch(LoadBooks({
        query: category,
        page: this.currentPage(),
        pageSize: this.pageSize()
      }));
    });
  }

  nextPage() {
    const maxPage = Math.floor((this.totalItems() - 1) / this.pageSize());
    if (this.currentPage() < maxPage) {
      this.currentPage.update(p => p + 1);
      this.loadCurrentPage();
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
      this.loadCurrentPage();
    }
  }

  loadCurrentPage() {
    const category = this.categorySelected();
    if (!category) return;

    this.store.dispatch(LoadBooks({
      query: category,
      page: this.currentPage(),
      pageSize: this.pageSize()
    }));
  }

  onAddInFavouriteEvent(book: BooksView) {
    this.favouriteService.addBookInFavourite(book);
  }

}
