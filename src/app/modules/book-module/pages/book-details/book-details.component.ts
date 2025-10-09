import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { BookActionsComponent } from "../../components/book-actions/book-actions.component";
import { BookContentComponent } from "../../components/book-content/book-content.component";
import { BookInfoComponent } from "../../components/book-info/book-info.component";
import { ReviewsTabComponent } from "../../components/reviews-tab/reviews-tab.component";
import { BookDetailsFacade } from '../../services/book-details.facade';
import { BookDetails } from '../../types/book-details';

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
