import { CommonModule } from '@angular/common';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeUserData, UserService } from '@auth-module';
import { Readly, Review, ReviewForm, ReviewService } from '@book-module';
import { MessagesService } from '@core';
import { DynamicValidatorMessage, TextareaComponent } from '@features';
import { Store } from '@ngrx/store';
import { MessageSeverity, TabKey } from '@types';
import { createReviewForm } from '@utils/review-form.factory';
import { EMPTY, exhaustMap, filter, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextareaComponent, DynamicValidatorMessage],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  fb = inject(FormBuilder);
  #reviewService = inject(ReviewService);
  #messages = inject(MessagesService);
  #store = inject(Store);
  bookId = input.required<string>();
  #userService = inject(UserService);
  
  @ViewChild(FormGroupDirective, { static: false })
  private formDir!: FormGroupDirective;
  
  form: FormGroup<ReviewForm> = createReviewForm(this.fb);
  reviewAdded = output();

  get starCtrl() { return this.form.controls.star; }
  get Readly() { return Readly; }
  
  hoveredStar = 0;
  currentTab = TabKey.reviews;

  onSubmit(e: Event): void {
    this.#userService.getUserbyEmail().pipe(
      map(users => users.data[0]),
      take(1),
      filter(user => !!user),
      exhaustMap((user: SafeUserData) => {
        const { comment, star } = this.form.getRawValue();

        const addReviewValue: Review = {
          userId: user.userId,
          userFullname: `${user.fullName}`,
          comment: comment,
          rating: star,
          bookId: this.bookId()
        };

        if(this.#reviewService.canUserAddReview(this.bookId())) {
          this.#messages.showMessage({
            text: 'უკვე დამატებულია კომენტარი ამ წიგნზე!',
            severity: MessageSeverity.Info,
          });
          return EMPTY;
        };
        return this.#reviewService.addReview(addReviewValue).pipe(
          tap(() => {
            this.formDir.resetForm(this.form.value);
            this.reviewAdded.emit();
            this.#messages.showMessage({
              text: `${addReviewValue.userFullname} წარმატებით დაამატა კომენტარი!`,
              severity: MessageSeverity.Success
            });
          })
        );
      })
    ).subscribe();

  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.reset(this.form.value);
  }

  setRating(star: number) {
    this.form.controls.star.setValue(star);
  }
}
