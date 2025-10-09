import { CommonModule } from "@angular/common";
import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { AddReviewComponent, ReviewItemComponent } from "@book-module/components";
import { BookDetailsFacade } from "@book-module/services/book-details.facade";
import { Review } from "@book-module/types";
import { Tab, TabKey } from "@types";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
    selector: 'app-reviews-tab',
    imports: [AddReviewComponent, CommonModule, ReviewItemComponent, TabsComponent],
    standalone: true,
    templateUrl: './reviews-tab.component.html'
})
export class ReviewsTabComponent {
    #bookDetailsFacade = inject(BookDetailsFacade);
    @ViewChild('addReviewTemplate') addReviewTemplate!: TemplateRef<unknown>;
    @ViewChild('reviewsTemplate') reviewsTemplate!: TemplateRef<unknown>;
    readonly TabKey = TabKey;
    currentTab: TabKey = TabKey.reviews;
    newReview: Review = { name: '', rating: 0, comment: '' };
    reviews: Review[] = [
        { name: 'Anne Clark', rating: 5, comment: 'An excellent guide to modern UI design.' },
        { name: 'Matthew Turner', rating: 4, comment: 'A solid read with practical advice.' }
    ];
    
    get tabs(): Tab[] {
        return this.#bookDetailsFacade.tabs(this.reviewsTemplate, this.addReviewTemplate)
    }

    selectTab(tabKey: TabKey) {
        this.currentTab = tabKey;
    }

}