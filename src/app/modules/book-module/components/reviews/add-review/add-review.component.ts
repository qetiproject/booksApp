import { CommonModule } from '@angular/common';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Readly, ReviewForm, ReviewService } from '@book-module';
import { DynamicValidatorMessage, TextareaComponent } from '@features';
import { TabKey } from '@types';
import { createReviewForm } from '@utils/review-form.factory';
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
  get Readly() { return Readly; }
  
  onSubmit(e: Event): void {
    if(this.form.invalid) return;

    const { comment, star } = this.form.getRawValue();

    this.#reviewService.addReviewFromForm({ comment, star }, this.bookId())
      .pipe(
        take(1),
        tap(() => {
          this.formDir.resetForm(this.form.value);
          this.reviewAdded.emit();
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
