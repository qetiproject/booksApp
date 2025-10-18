import { CommonModule } from "@angular/common";
import { Component, inject, input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AddReviewComponent, ReviewListComponent } from "@book-module/components";
import { BookDetailsFacade } from "@book-module/services/book-details.facade";
import { ReviewService } from "@book-module/services/review.service";
import { Review } from "@book-module/types";
import { Tab, TabKey } from "@types";
import { Observable } from "rxjs";
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
    bookId = input.required<string>();
    
    @ViewChild('addReviewTemplate') addReviewTemplate!: TemplateRef<unknown>;
    @ViewChild('reviewsTemplate') reviewsTemplate!: TemplateRef<unknown>;
    
    readonly TabKey = TabKey;
    currentTab: TabKey = TabKey.reviews;
    reviews$!: Observable<Review[]>;
    
    ngOnInit(): void {
        this.reviews$ =this.#reviewsService.loadReviewsByBookid(this.bookId());

        this.reviews$.subscribe(reviews => {
            this.currentTab = reviews.length > 0 ? TabKey.reviews : TabKey.addReview
        })
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