
import { Component, effect, inject } from '@angular/core';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { MessagesService } from '@core';
import { MessageSeverity } from '@types';
import { FavouriteBookService } from './services/favourite-book.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [BookCardComponent, BackButtonComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent{

  private readonly favouriteBookService = inject(FavouriteBookService);
  private messages = inject(MessagesService);
  private userService = inject(UserService);
  
  readonly favouriteBooks = this.favouriteBookService.favouriteBooks

   constructor() {
    effect(() => {
      const user = this.userService.getCurrentUser();
      if (user) {
        this.favouriteBookService['loadFavouriteBooks'](user.userId);
      }
    });
  }
  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    this.favouriteBookService.removeBookFromFavourite(book);
    this.messages.showMessage({
      text: `📚 "${book.title}" წარმატებით წაიშალა სიიდან!`,
      severity: MessageSeverity.Success
    })
  }

}
