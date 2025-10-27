
import { Component, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import * as UserSelectors from '@auth-module';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { FavouriteBookService } from './services/favourite-book.service';

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
  // readonly userId = signal<number | null>(null);
  userId: Signal<number | null>;
  #store = inject(Store);
  // ngOnInit(): void {
  //   this.userService.getCurrentUserSafeData().pipe(
  //     take(1)
  //   ).subscribe(user => {
  //     if (!user) return;
  //     this.userId.set(user.userId);
  //     this.favouriteBookService.loadFavouriteBooks(user.userId);
  //   });
  // }

  constructor(){
    this.userId = toSignal(
      this.#store.select(UserSelectors.selectUserResponse).pipe(
        map(user => user?.data?.userId ?? null)
      ),
      { initialValue: null }
    );
    effect(() => {
      const id = this.userId();
      if (id !== null) {
        console.log('UserId is available:', id);
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
