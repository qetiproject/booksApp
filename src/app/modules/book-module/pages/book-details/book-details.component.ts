import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookActionsComponent, BookContentComponent, BookDetails, BookDetailsFacade, BookInfoComponent, ReviewsTabComponent } from '@book-module';
import { BackButtonComponent } from '@components';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule,
    BackButtonComponent, FormsModule, BookInfoComponent, BookContentComponent, BookActionsComponent, ReviewsTabComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  #bookDetailsFacade = inject(BookDetailsFacade);
  
  readonly book: WritableSignal<BookDetails> = signal(this.route.snapshot.data['book']);

  goBack(): void {
    this.#bookDetailsFacade.goBack()
  }

  addToFavouritesEvent(): void {
    this.#bookDetailsFacade.addToFavouritesEvent(this.book())
  }
  
  addToCatalogueEvent(): void {
    this.#bookDetailsFacade.addToCatalogueEvent(this.book())
  }
}
