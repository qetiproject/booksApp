import { FormBuilder, Validators } from '@angular/forms';
import { ReviewForm } from '../features/books/types/review';

export function starRange(min: number, max: number) {
  return Validators.compose([Validators.min(min), Validators.max(max)]);
}

export function createReviewForm(fb: FormBuilder) {
  return fb.nonNullable.group<ReviewForm>({
    comment: fb.nonNullable.control('', Validators.maxLength(500)),
    star: fb.nonNullable.control(0, starRange(1, 5))
  });
}