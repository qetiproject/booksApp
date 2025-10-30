
import { Component, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import * as UserSelectors from '@auth-module';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { Store } from '@ngrx/store';
import { FavouriteBookService } from '@pages';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [BackButtonComponent, BookCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {

  readonly favouriteBookService = inject(FavouriteBookService);
  userService = inject(UserService);
  userId: Signal<number | undefined>;
  #store = inject(Store);

  constructor(){
    this.userId = toSignal(this.#store.select(UserSelectors.selectActiveUserId).pipe(
      filter((id): id is number => id !== null),
      take(1))
    )
    effect(() => {
      const id = this.userId();
      if (id) {
        this.favouriteBookService.loadFavouriteBooks(id);
      }
    });
  }
  
  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    const id = this.userId();
    if (!id) return;
    this.favouriteBookService.removeBookFromFavourite(book, id);
  }

}
