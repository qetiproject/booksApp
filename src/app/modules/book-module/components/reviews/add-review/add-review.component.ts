import { CommonModule } from '@angular/common';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSafeInSystem } from '@auth-module';
import { ReviewForm, ReviewService } from '@book-module';
import { STORAGE_KEYS } from '@core';
import { DynamicValidatorMessage, TextareaComponent } from '@features';
import { TabKey } from '@types';
import { createReviewForm } from '@utils';
import { take, tap } from 'rxjs/operators';

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
  bookId = input.required<string>();
  reviewAdded = output<void>();
  hoveredStar: number = 0;
  currentTab = TabKey.reviews;

  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;
  
  form: FormGroup<ReviewForm> = createReviewForm(this.fb);

  get starCtrl() { return this.form.controls.star; }
  userFromStorage: UserSafeInSystem | null = null;

  constructor() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    this.userFromStorage = user ? JSON.parse(user) : null;
  }
    
  onSubmit(e: Event): void {
    if(this.form.invalid || !this.userFromStorage?.emailId) return;

    const { comment, star } = this.form.getRawValue();

    this.#reviewService.addReviewFromForm({ comment, star }, this.bookId(),  this.userFromStorage.emailId )
      .pipe(
        take(1),
        tap(() => {
          this.reviewAdded.emit();
          this.formDir.resetForm(this.form.value);
        })
      )
    .subscribe();
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.reset(this.form.value);
  }

  setRating(star: number) {
    this.form.controls.star.setValue(star);
  }
}
