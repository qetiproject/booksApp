
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { take, tap } from 'rxjs';
import { FavouriteBookService } from './services/favourite-book.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [BackButtonComponent, BookCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit{

  readonly favouriteBookService = inject(FavouriteBookService);
  userService = inject(UserService);
  userId!: number;

  ngOnInit(): void {
    this.userService.getCuurentUserSafeData().pipe(
      take(1), 
      tap(user => this.userId = user.userId),
      tap(user => this.favouriteBookService.loadFavouriteBooks(user.userId)),
    ).subscribe();
  }

  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    if(!this.userId) return;
    this.favouriteBookService.removeBookFromFavourite(book, this.userId);
  }

}
