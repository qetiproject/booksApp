
import { Component, inject } from '@angular/core';
import { BookCardComponent } from '@book-module/components/book-card/book-card.component';
import { BooksView } from '@book-module/types/book';
import { BackButtonComponent } from '@components';
import { MessagesService } from '@core/services/messages.service';
import { MessageSeverity } from '@types';
import { FavouriteBookService } from './services/favouriteBook.service';

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
  
  readonly favouriteBooks = this.favouriteBookService.favouriteBooks

  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    this.favouriteBookService.removeBookFromFavourite(book);
    this.messages.showMessage({
      text: `📚 "${book.title}" წარმატებით წაიშალა სიიდან!`,
      severity: MessageSeverity.Success
    })
  }

}
