import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AddReviewComponent, ReviewListComponent } from "@book-module/components";
import { BookDetailsFacade } from "@book-module/services/book-details.facade";
import { ReviewService } from "@book-module/services/review.service";
import { Tab, TabKey } from "@types";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
    selector: 'app-reviews-tab',
    imports: [AddReviewComponent, CommonModule, TabsComponent, ReviewListComponent],
    standalone: true,
    templateUrl: './reviews-tab.component.html'
})
export class ReviewsTabComponent implements OnInit{
    #bookDetailsFacade = inject(BookDetailsFacade);
    #reviewsService = inject(ReviewService);

    @ViewChild('addReviewTemplate') addReviewTemplate!: TemplateRef<unknown>;
    @ViewChild('reviewsTemplate') reviewsTemplate!: TemplateRef<unknown>;
    
    readonly TabKey = TabKey;
    currentTab: TabKey = TabKey.reviews;
    reviews = toSignal(this.#reviewsService.reviews);
    
    ngOnInit(): void {
        const loaded = this.#reviewsService.loadReviews();
        this.#reviewsService.reviews.next(loaded);
    }

    get tabs(): Tab[] {
        return this.#bookDetailsFacade.tabs(this.reviewsTemplate, this.addReviewTemplate)
    }

    selectTab(tabKey: TabKey) {
        this.currentTab = tabKey;
    }

    onReviewAdded(): void {
        this.currentTab = TabKey.reviews;
    }
}