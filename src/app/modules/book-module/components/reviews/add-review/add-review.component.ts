import { CommonModule } from '@angular/common';
import { Component, inject, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '@auth-types/user';
import { canUserAddReview } from '@book-module/services/canuserAddReview';
import { ReviewService } from '@book-module/services/review.service';
import { Readly, Review, ReviewForm } from '@book-module/types';
import { TextareaComponent } from "@features/custom-form/textarea.component";
import { TabKey } from '@types';
import { createReviewForm } from '@utils/review-form.factory';
import { exhaustMap, from } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextareaComponent],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  fb = inject(FormBuilder);
  #reviewService = inject(ReviewService);

  @ViewChild(FormGroupDirective, { static: false })
  private formDir!: FormGroupDirective;
  form: FormGroup<ReviewForm> = createReviewForm(this.fb);
  reviewAdded = output();
  
  get starCtrl() { return this.form.controls.star; }
  get Readly() { return Readly; }
  
  hoveredStar = 0;
  currentTab = TabKey.reviews;


  onSubmit(e: Event): void {
    const userString = sessionStorage.getItem(environment.USER_STORAGE_KEY);
    const user: User = userString ? JSON.parse(userString) : null;

    if(!user) return;

     if(canUserAddReview(user.id)) {
      alert('you have already submitted a review');
      return;
    };

    const { comment, star } = this.form.getRawValue();
    console.log(this.form.value, "value")

    const addReviewValue: Review = {
      userId: user.id,
      userFullname: `${user.firstName} ${user.lastName}`,
      comment: comment,
      rating: star
    } 

    from([addReviewValue]).pipe(
      exhaustMap(() => this.#reviewService.addReview(addReviewValue))
    ).subscribe({
      next: () => {
        this.formDir.resetForm(this.form.value);
        this.reviewAdded.emit();
      }
    })
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.reset(this.form.value);
  }

  setRating(star: number) {
    this.form.controls.star.setValue(star);
  }
}
