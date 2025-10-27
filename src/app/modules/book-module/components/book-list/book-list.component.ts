
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as UserSelectors from '@auth-module';
import { BookCardComponent, BookService, BooksView } from '@book-module';
import { Store } from '@ngrx/store';
import { FavouriteBookService } from '@pages/wishlist/services/favourite-book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  #bookService = inject(BookService);
  #favouriteBookService = inject(FavouriteBookService);
  #store = inject(Store);

  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);
  books = this.#bookService.books;
  readonly userId = signal<number | null>(null);

  constructor() {
    this.initEffects();
  }

  ngOnInit(): void {    
    this.#store.select(UserSelectors.selectUserResponse)
      .subscribe(user => {
        if(!user?.data) return;
        const userId = user?.data.userId;
        this.userId.set(userId);
        this.#favouriteBookService.loadFavouriteBooks(userId);
      })
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
    const id = this.userId();
    if (!id) return;
    this.#favouriteBookService.addBookToFavourite(book, id);
  }

}
