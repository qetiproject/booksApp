import { CommonModule } from '@angular/common';
import { Component, effect, inject, Signal, TemplateRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import * as UserSelectors from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { Store } from '@ngrx/store';
import { CatalogueService } from '@pages';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BackButtonComponent],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent {
  
  #catalogueService = inject(CatalogueService);
  books$ = this.#catalogueService.books$;

  bookCardTemplate = TemplateRef<BooksView>

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
        this.#catalogueService.loadCatalogueBooks(id);
      }
    });
  }

  onDeleteBookEvent(book: BooksView) {
    const id = this.userId();
    if(!id) return;
    this.#catalogueService.removeBook(book, id);
  }

}
