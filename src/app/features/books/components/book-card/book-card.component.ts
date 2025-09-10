import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { showSnackbar } from '../../../../utils/snackbar';
import { BooksView } from '../../types/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  book = input.required<BooksView>();
  @Input() showDelete = false; 
  @Input() showFavourite = false;
  @Output() bookDelete = new EventEmitter<BooksView>();
  @Output() addInFavourite = new EventEmitter<BooksView>();
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  showDetails = this.route.snapshot.data['book'];

  onDelete(): void {
    this.bookDelete.emit(this.book());
  }

  onAddInFavourite(): void {
    this.addInFavourite.emit(this.book());
    this.router.navigateByUrl('/favourites')
    showSnackbar(this.snackbar, `📚 "${this.book().title}" წარმატებით დაემატა თქვენს ფავორიტებში!`);
  }
}
