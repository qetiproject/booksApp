import { inject, Injectable } from "@angular/core";
import { UserService } from "@auth-module";
import { Review } from "@book-module";
import { MessagesService } from "@core";
import { MessageSeverity } from "@types";
import { BehaviorSubject, EMPTY, filter, map, Observable, of, switchMap, take } from "rxjs";
import { ReviewFacade } from "./review.facade";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    #reviewFacade = inject(ReviewFacade);
    #userService = inject(UserService)
    #messages = inject(MessagesService);
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

    addReviewFromForm(formValue: { comment: string; star: number }, bookId: string) {
        return this.#userService.getUserbyEmail().pipe(
        map(users => users.data[0]),
        take(1),
        filter(user => !!user),
        switchMap(user => {
            const addReview: Review = {
            userId: user.userId,
            userFullname: user.fullName,
            comment: formValue.comment,
            rating: formValue.star,
            bookId
            };

            if (this.canUserAddReview(bookId, user.userId)) {
            this.#messages.showMessage({
                text: 'უკვე დამატებულია კომენტარი ამ წიგნზე!',
                severity: MessageSeverity.Info,
            });
            return EMPTY;
            }

            const current = this.reviews.value;
            const updated = [addReview, ...current];
            this.reviews.next(updated);
            this.#reviewFacade.saveReview(updated);

            this.#messages.showMessage({
            text: `${addReview.userFullname} წარმატებით დაამატა კომენტარი!`,
            severity: MessageSeverity.Success
            });

            return of(true);
        })
        );
    }
}