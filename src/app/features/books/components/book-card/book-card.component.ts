
import { Component, EventEmitter, inject, input, Output } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { BooksView } from '../../types/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {

  book = input.required<BooksView>();
  readonly showDelete = input(false); 
  readonly showFavourite = input(false);
  readonly showDetailsBtn = input(false);
  @Output() bookDelete = new EventEmitter<BooksView>();
  @Output() addInFavourite = new EventEmitter<BooksView>();
  
  private router = inject(Router);
  // private snackbar = inject(MatSnackBar);

  onDelete(): void {
    this.bookDelete.emit(this.book());
  }

  onAddInFavourite(): void {
    this.addInFavourite.emit(this.book());
    this.router.navigateByUrl('/favourites')
    // showSnackbar(this.snackbar, `📚 "${this.book().title}" წარმატებით დაემატა თქვენს ფავორიტებში!`);
  }
}
