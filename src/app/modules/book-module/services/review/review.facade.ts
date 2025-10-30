import { inject, Injectable } from "@angular/core";
import * as UserActions from '@auth-module';
import { SafeUserData, selectSearchUsers } from "@auth-module";
import { Review } from "@book-module";
import { STORAGE_KEYS } from "@core";
import { Store } from "@ngrx/store";
import { filter, map, Observable, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewFacade {
  #store = inject(Store);
    
  loadReviews(): Review[] {
    const currentReviews = sessionStorage.getItem(STORAGE_KEYS.BOOK_REVIEWS);
    const reviews = currentReviews ? JSON.parse(currentReviews) : [];
    return reviews;
  }

  saveReviewToStorage(review: Review[]) {
    sessionStorage.setItem(STORAGE_KEYS.BOOK_REVIEWS, JSON.stringify(review));
  }
  
  searchUserByEmail(email: string): Observable<SafeUserData | null> {
    this.#store.dispatch(UserActions.searchUsers({ searchText: email }));

    return this.#store.select(selectSearchUsers).pipe(
        filter(response => response.data.length > 0), 
        take(1),
        map(response => {
            const user = response.data.find(u => u.emailId === email);
            return user ?? null;
        })
    );
  }

  canUserAddReview(bookId: string, userId: number): boolean {
    const reviews: Review[] = this.loadReviews() || [];
    const alreadyReviewed = reviews.some(r => r.bookId === bookId && r.userId === userId);

    return !alreadyReviewed; 
  }

  createReview(formValue: { comment: string; star: number }, bookId: string, user: SafeUserData): Review {
    return {
      userId: user.userId,
      userFullname: user.fullName,
      comment: formValue.comment,
      rating: formValue.star,
      bookId
    };
  }
}