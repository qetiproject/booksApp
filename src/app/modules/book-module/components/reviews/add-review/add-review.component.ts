import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '@auth-types/user';
import { ReviewService } from '@book-module/services/review.service';
import { Readly, Review, ReviewForm } from '@book-module/types';
import { TabKey } from '@types';
import { createReviewForm } from '@utils/review-form.factory';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  fb = inject(FormBuilder);
  #reviewService = inject(ReviewService);

  @ViewChild(FormGroupDirective, { static: false })
  private formDir!: FormGroupDirective;
  form: FormGroup<ReviewForm> = createReviewForm(this.fb);
  
  get starCtrl() { return this.form.controls.star; }
  get Readly() { return Readly; }
  
  hoveredStar = 0;
  currentTab = TabKey.reviews;


  onSubmit(e: Event): void {
    const userString = sessionStorage.getItem(environment.USER_STORAGE_KEY);
    const user: User = userString ? JSON.parse(userString) : null;

    const { comment, star } = this.form.getRawValue();
    const addReviewValue: Review = {
      userId: user.id,
      userFullname: `${user.firstName} ${user.lastName}`,
      comment,
      rating: star
    } 
    this.#reviewService.addReview(addReviewValue)
    this.formDir.resetForm(this.form.value);
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.reset(this.form.value);
  }

  setRating(star: number) {
    this.form.controls.star.setValue(star);
  }
}
