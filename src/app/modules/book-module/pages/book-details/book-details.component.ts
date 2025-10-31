import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as UserSelectors from '@auth-module';
import { UserSafeInSystem, UserService } from '@auth-module';
import { BookActionsComponent, BookContentComponent, BookDetails, BookDetailsService, BookInfoComponent, ReviewsTabComponent } from '@book-module';
import { BackButtonComponent } from '@components';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule,
    BackButtonComponent, FormsModule, BookInfoComponent, BookContentComponent, BookActionsComponent, ReviewsTabComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
    #route = inject(ActivatedRoute);
    #bookDetailsService = inject(BookDetailsService);
    #userService = inject(UserService);
    user: UserSafeInSystem | null = this.#userService.getCurrentUserFromStorage();
    
    readonly book: WritableSignal<BookDetails> = signal(this.#route.snapshot.data['book']);

    userService = inject(UserService);
    userId: Signal<number | undefined>;
    #store = inject(Store);
    
    constructor(){
      this.userId = toSignal(this.#store.select(UserSelectors.selectActiveUserId).pipe(
        filter((id): id is number => id !== null),
        take(1))
      )
    }
    
    goBack(): void {
        this.#bookDetailsService.goBack()
    }

    addToFavouritesEvent(): void {
      const id = this.userId();
      if (!id) return;
      this.#bookDetailsService.addToFavouritesEvent(this.book(), id)
    }
    
    addToCatalogueEvent(): void {
      const id = this.userId();
      if (!id) return;
      this.#bookDetailsService.addToCatalogueEvent(this.book(), id)
    }
}
