import { inject, Injectable } from "@angular/core";
import * as UserActions from '@auth-module';
import { SafeUserData, selectSearchUsers } from "@auth-module";
import { Review } from "@book-module";
import { MessagesService } from "@core";
import { Store } from "@ngrx/store";
import { MessageSeverity } from "@types";
import { BehaviorSubject, EMPTY, filter, map, Observable, of, switchMap, take } from "rxjs";
import { ReviewFacade } from "./review.facade";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    #reviewFacade = inject(ReviewFacade);
    #messages = inject(MessagesService);

    private readonly reviews = new BehaviorSubject<Review[]>([]);
    readonly reviews$ = this.reviews.asObservable();

    #store = inject(Store);
    
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

    private saveAndNotify(review: Review): void {
        this.reviews.next([review, ...this.reviews.value]);
        this.#reviewFacade.saveReviewToStorage(this.reviews.value);
        this.#messages.showMessage({
            text: `${review.userId} წარმატებით დაამატა კომენტარი!`,
            severity: MessageSeverity.Success
        });
    }

    canUserAddReview(bookId: string, userId: number): boolean {
        return this.#reviewFacade.canUserAddReview(bookId, userId);
    }

    private searchUserByEmail(email: string): Observable<SafeUserData | null> {
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
    addReviewFromForm(formValue: { comment: string; star: number }, bookId: string, email: string) {
        return this.searchUserByEmail(email).pipe(
            take(1),
            switchMap(user => {
                if (!user) return EMPTY;
                if (!this.canUserAddReview(bookId, user.userId)) {
                    this.#messages.showMessage({
                        text: 'უკვე დამატებულია კომენტარი ამ წიგნზე!',
                        severity: MessageSeverity.Info,
                    });
                    return EMPTY;
                }

                const newReview: Review = {
                    userId: user.userId,
                    userFullname: user.fullName,
                    comment: formValue.comment,
                    rating: formValue.star,
                    bookId
                };

                this.saveAndNotify(newReview);
                return of(true);
            })
        );
    }

}