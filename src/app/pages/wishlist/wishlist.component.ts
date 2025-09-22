
import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { BookCardComponent } from "../../features/books/components/book-card/book-card.component";
import { BooksView } from '../../features/books/types/book';
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
  // private snackbar = inject(MatSnackBar);
  
  readonly favouriteBooks = this.favouriteBookService.favouriteBooks

  onBookDeleteFromFavouritesEvent(book: BooksView): void {
    this.favouriteBookService.removeBookFromFavourite(book);
    // showSnackbar(this.snackbar, `📚 "${book.title}" წარმატებით წაიშალა სიიდან!`);
  }

}
