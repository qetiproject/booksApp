import { CommonModule } from '@angular/common';
import { Component, inject, signal, TemplateRef } from '@angular/core';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { CatalogueService } from '@pages/catalogues/services/catalogue.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BackButtonComponent],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent {
  
  #catalogueService = inject(CatalogueService);
  #userService = inject(UserService);
  books$ = this.#catalogueService.books$;

  bookCardTemplate = TemplateRef<BooksView>
  readonly userId = signal<number | null>(null);

  constructor() {
    this.#userService.getCurrentUserSafeData().pipe(
      take(1)
    ).subscribe(user => {
      if(!user) return;
      if (user) this.userId.set(user.userId);
      this.#catalogueService.loadCatalogueBooks(user.userId);
    });
  };

  onDeleteBookEvent(book: BooksView) {
    const id = this.userId();
    if(!id) return;
    this.#catalogueService.removeBook(book, id);
  }

}
