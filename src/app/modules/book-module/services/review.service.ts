import { Injectable } from "@angular/core";
import { Review } from "@book-module/types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private REVIEWS_KEY = environment.BOOK_REVIEWS;

    reviews = new BehaviorSubject<Review[]>([]);
    reviews$ = this.reviews.asObservable();

    loadReviews(): Review[] {
        const currentReviews = sessionStorage.getItem(this.REVIEWS_KEY);
        return currentReviews ? JSON.parse(currentReviews) : []
    }

    addReview(review: Review): Observable<boolean> {
        const currentReviews = this.reviews.value;
        const updated = [review, ...currentReviews];
        this.reviews.next(updated);
        sessionStorage.setItem(this.REVIEWS_KEY, JSON.stringify(updated));
        return of(true);
    }
}