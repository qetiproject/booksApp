
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@auth-module';
import { BookCardComponent, BookFacadeService, BookService, BooksView } from '@book-module';
import { FavouriteBookService } from '@pages/wishlist/services/favourite-book.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  #bookFacadeService = inject(BookFacadeService)
  #bookService = inject(BookService);
  #favouriteBookService = inject(FavouriteBookService);
  #userService = inject(UserService);

  searchQuery = input<string>('');
  categorySelected = input<string | null>(null);
  books = this.#bookFacadeService.books;
  readonly userId = signal<number | null>(null);

  constructor() {
    this.initEffects();
  }


  ngOnInit(): void {
    this.#userService.getCurrentUserSafeData().pipe(
      take(1)
    ).subscribe(user => {
      this.userId.set(user.userId);
      this.#favouriteBookService.loadFavouriteBooks(user.userId);
    });
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
