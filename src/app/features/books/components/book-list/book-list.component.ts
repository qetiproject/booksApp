import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { BooksView } from '../../types/book';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  private bookService = inject(BookService);

  // inputs
  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);

  // result
  searchedBooks: WritableSignal<BooksView[]> = signal([]);
  booksByCategory: WritableSignal<BooksView[]> = signal([]);
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
      if(!query || query.length <= 3) {
        this.searchedBooks.set([]);
        return;
      }
      this.bookService.searchBooksByName(query)
        .subscribe(result => this.searchedBooks.set(result));
    })

    effect(() => {
      const category = this.categorySelected();
      if(!category) {
        this.booksByCategory.set([]);
        return;
      }
      this.bookService.loadBooksByCategory(category)
        .subscribe(result => this.booksByCategory.set(result));

    })
  }

}
