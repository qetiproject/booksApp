import { inject, Injectable } from "@angular/core";
import { Review } from "@book-module";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { ReviewFacade } from "./review.facade";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private REVIEWS_KEY = environment.BOOK_REVIEWS;
    #reviewFacade = inject(ReviewFacade);

    reviews = new BehaviorSubject<Review[]>([]);
    reviews$ = this.reviews.asObservable();

    constructor() {
        this.reviews.next(this.loadReviews())
    }

    private loadReviews(): Review[] {
        const currentReviews = sessionStorage.getItem(this.REVIEWS_KEY);
        return currentReviews ? JSON.parse(currentReviews) : []
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
        sessionStorage.setItem(this.REVIEWS_KEY, JSON.stringify(updated));
        return of(true);
    }

    canUserAddReview(bookId: string): boolean {
        return this.#reviewFacade.canUserAddReview(bookId);
        
    }
}