import { Injectable } from "@angular/core";
import { Review } from "@book-module";
import { STORAGE_KEYS } from "@core";

@Injectable({
  providedIn: 'root'
})
export class ReviewFacade {

  loadReviews(): Review[] {
    const currentReviews = sessionStorage.getItem(STORAGE_KEYS.BOOK_REVIEWS);
    return currentReviews ? JSON.parse(currentReviews) : []
  }

  saveReview(review: Review[]) {
    sessionStorage.setItem(STORAGE_KEYS.BOOK_REVIEWS, JSON.stringify(review));
  }
  canUserAddReview(bookId: string, userId: number): boolean {
      const reviews = sessionStorage.getItem(STORAGE_KEYS.BOOK_REVIEWS);
      const reviewList: Review[] = reviews ? JSON.parse(reviews) : null;

      return reviewList?.some(r => r.bookId === bookId && r.userId === userId);
  }
}