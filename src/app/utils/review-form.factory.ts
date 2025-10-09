import { FormBuilder, Validators } from '@angular/forms';
import { ReviewForm } from '../modules/book-module/types/review';

export function starRange(min: number, max: number) {
  return Validators.compose([Validators.min(min), Validators.max(max)]);
}

export function createReviewForm(fb: FormBuilder) {
  return fb.nonNullable.group<ReviewForm>({
    comment: fb.nonNullable.control('', [Validators.maxLength(500), Validators.required]),
    star: fb.nonNullable.control(0, Validators.required)
  });
}