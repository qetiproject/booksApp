
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { map } from 'rxjs';
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
    this.getUserData();
     this.favouriteBookService.loadFavouriteBooks(this.userId);
  }

  getUserData() {
    this.userService.getCuurentUserSafeData().pipe(
      map(user => this.userId = user.userId)
    ).subscribe()
  }

  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    this.favouriteBookService.removeBookFromFavourite(book, this.userId);
  }

}
