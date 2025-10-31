import { inject, Injectable } from "@angular/core";
import { UserService } from "@auth-module";
import { Review } from "@book-module";
import { MessagesService } from "@core";
import { MessageSeverity } from "@types";
import { BehaviorSubject, EMPTY, map, of, switchMap, take } from "rxjs";
import { ReviewFacade } from "./review.facade";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    #reviewFacade = inject(ReviewFacade);
    #messages = inject(MessagesService);
    #userService = inject(UserService);
    
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
            text: `${review.userId} წარმატებით დაამატა კომენტარი!`,
            severity: MessageSeverity.Success
        });
    }

    addReviewFromForm(formValue: { comment: string; star: number }, bookId: string, email: string) {
        return this.#userService.getUserbyEmail(email).pipe(
            take(1),
            switchMap(user => {
                if (!user) return EMPTY;
                if (!this.#reviewFacade.canUserAddReview(bookId, user.userId)) {
                    this.#messages.showMessage({
                        text: 'უკვე დამატებულია კომენტარი ამ წიგნზე!',
                        severity: MessageSeverity.Info,
                    });
                    return EMPTY;
                }

                const newReview = this.#reviewFacade.createReview(formValue, bookId, user);

                this.saveAndNotify(newReview);
                return of(true);
            })
        );
    }

}