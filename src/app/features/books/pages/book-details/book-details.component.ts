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

  // @ViewChild('addReviewTemplate') addReviewTemplate!: TemplateRef<unknown>;
  // @ViewChild('reviewsTemplate') reviewsTemplate!: TemplateRef<unknown>;

  // currentTab: TabKey = 'reviews';
  // newReview: Review = { name: '', rating: 0, comment: '' };
  // reviews: Review[] = [
  //   { name: 'Anne Clark', rating: 5, comment: 'An excellent guide to modern UI design.' },
  //   { name: 'Matthew Turner', rating: 4, comment: 'A solid read with practical advice.' }
  // ];
  
  // get tabs(): Tab[] {
  //   return this.#bookDetailsFacade.tabs(this.reviewsTemplate, this.addReviewTemplate)
  // }

  goBack(): void {
    this.#bookDetailsFacade.goBack()
  }

  addToFavouritesEvent(): void {
    this.#bookDetailsFacade.addToFavouritesEvent(this.book())
  }
  
  addToCatalogueEvent(): void {
    this.#bookDetailsFacade.addToCatalogueEvent(this.book())
  }

  // selectTab(tabKey: TabKey) {
  //   this.currentTab = tabKey;
  // }

}
