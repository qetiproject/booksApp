import { inject, Injectable } from "@angular/core";
import { UserService } from "@auth-module";
import { Review } from "@book-module";
import { MessagesService } from "@core";
import { MessageSeverity } from "@types";
import { BehaviorSubject, EMPTY, map, of, switchMap } from "rxjs";
import { ReviewFacade } from "./review.facade";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    #reviewFacade = inject(ReviewFacade);
    #userService = inject(UserService)
    #messages = inject(MessagesService);

    private readonly reviews = new BehaviorSubject<Review[]>([]);
    readonly reviews$ = this.reviews.asObservable();

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
            text: `${review.userFullname} წარმატებით დაამატა კომენტარი!`,
            severity: MessageSeverity.Success
        });
    }

    canUserAddReview(bookId: string, userId: number): boolean {
        return this.#reviewFacade.canUserAddReview(bookId, userId);
    }

    addReviewFromForm(formValue: { comment: string; star: number }, bookId: string) {
        return this.#userService.getCuurentUserSafeData().pipe(
            switchMap(user => {
                if (this.canUserAddReview(bookId, user.userId)) {
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
                this.saveAndNotify(newReview)
                return of(true);
            })
        );
    }
}