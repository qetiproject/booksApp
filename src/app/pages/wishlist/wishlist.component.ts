
import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { take } from 'rxjs';
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
  readonly userId = signal<number | null>(null);

  ngOnInit(): void {
    this.userService.getCuurentUserSafeData().pipe(
      take(1)
    ).subscribe(user => {
      if (!user) return;
      this.userId.set(user.userId);
      this.favouriteBookService.loadFavouriteBooks(user.userId);
    });
  }

  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    const id = this.userId();
    if (!id) return;
    this.favouriteBookService.removeBookFromFavourite(book, id);
  }

}
