
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@auth-module';
import { BookCardComponent, BookFacadeService, BookService, BooksView } from '@book-module';
import { FavouriteBookService } from '@pages/wishlist/services/favourite-book.service';
import { take, tap } from 'rxjs/operators';

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
  userId!: number;

  constructor() {
    this.initEffects();
  }

  ngOnInit(): void {
     this.#userService.getCuurentUserSafeData().pipe(
      take(1), 
      tap(user => this.userId = user.userId),
    ).subscribe();
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
    this.#favouriteBookService.addBookToFavourite(book, this.userId);
  }

}
