import { Injectable } from "@angular/core";
import { Review } from "@book-module";
import { environment } from "../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ReviewFacade {
    canUserAddReview(bookId: string): boolean {
        const reviews = sessionStorage.getItem(environment.BOOK_REVIEWS);
        const reviewList: Review[] = reviews ? JSON.parse(reviews) : null;

        return reviewList?.some(r => r.bookId === bookId);
    }
}