import { CommonModule } from '@angular/common';
import { Component, effect, inject, Signal, TemplateRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import * as UserSelectors from '@auth-module';
import { UserService } from '@auth-module';
import { BookCardComponent, BooksView } from '@book-module';
import { BackButtonComponent } from '@components';
import { Store } from '@ngrx/store';
import { CatalogueService } from '@pages/catalogues/services/catalogue.service';
import { map } from 'rxjs';

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
  // readonly userId = signal<number | null>(null);

  // constructor() {
  //   this.#userService.getCurrentUserSafeData().pipe(
  //     take(1)
  //   ).subscribe(user => {
  //     if(!user) return;
  //     if (user) this.userId.set(user.userId);
  //     this.#catalogueService.loadCatalogueBooks(user.userId);
  //   });
  // };

  userId: Signal<number | null>;
  #store = inject(Store);
  
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
