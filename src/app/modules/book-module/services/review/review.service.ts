import { inject, Injectable } from "@angular/core";
import { Review } from "@book-module";
import { STORAGE_KEYS } from "@core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { ReviewFacade } from "./review.facade";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private BOOK_REVIEWS = STORAGE_KEYS.BOOK_REVIEWS;
    #reviewFacade = inject(ReviewFacade);

    reviews = new BehaviorSubject<Review[]>([]);
    reviews$ = this.reviews.asObservable();

    constructor() {
        this.refreshReviews()
    }

    refreshReviews(): void {
        this.reviews.next( this.#reviewFacade.loadReviews())
    }

    loadReviewsByBookid(bookId: string) {
        return this.reviews$.pipe(
            map(reviews => reviews.filter(review => review.bookId === bookId))
        )
    }

    addReview(review: Review): Observable<boolean> {
        const currentReviews = this.reviews.value;
        const updated = [review, ...currentReviews];
        this.reviews.next(updated);
        this.#reviewFacade.saveReview(updated);
        return of(true);
    }

    canUserAddReview(bookId: string, userId: number): boolean {
        return this.#reviewFacade.canUserAddReview(bookId, userId);
        
    }
}