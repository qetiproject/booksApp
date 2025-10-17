
import { Component, EventEmitter, inject, model, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BooksView } from '@book-module/types';
import { MessagesService } from '@core/services/messages.service';
import { MessageSeverity } from '@types';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {

  book = model.required<BooksView>();
  showDelete = model(false);
  showFavourite = model(false);
  showDetailsBtn = model(false);
  
  @Output() bookDelete = new EventEmitter<BooksView>();
  @Output() addInFavourite = new EventEmitter<BooksView>();
  
  
  private router = inject(Router);
  private messages = inject(MessagesService);
  
  onDelete(): void {
    this.bookDelete.emit(this.book());
  }

  onAddInFavourite(): void {
    this.addInFavourite.emit(this.book());
    this.router.navigateByUrl('/favourites')
    this.messages.showMessage({
      text: `📚 "${this.book().title}" წარმატებით დაემატა თქვენს ფავორიტებში!`,
      severity: MessageSeverity.Success,
    });
  }
}
