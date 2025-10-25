import { Injectable } from "@angular/core";
import { Review } from "@book-module";
import { STORAGE_KEYS } from "@core";

@Injectable({
  providedIn: 'root'
})
export class ReviewFacade {

  loadReviews(): Review[] {
    const currentReviews = sessionStorage.getItem(STORAGE_KEYS.BOOK_REVIEWS);
    const reviews = currentReviews ? JSON.parse(currentReviews) : [];
    return reviews;
  }

  saveReviewToStorage(review: Review[]) {
    sessionStorage.setItem(STORAGE_KEYS.BOOK_REVIEWS, JSON.stringify(review));
  }
  
  canUserAddReview(bookId: string, userId: number): boolean {
      const reviews: Review[] = this.loadReviews();
      const reviewsFiltered = reviews?.some(r => r.bookId === bookId && r.userId === userId);
      return reviewsFiltered
  }
}