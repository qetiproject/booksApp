import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Readly, ReviewForm } from '@book-module/types';
import { createReviewForm } from '@utils/review-form.factory';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  fb = inject(FormBuilder);
  @ViewChild(FormGroupDirective, { static: false })
  private formDir!: FormGroupDirective;
  form: FormGroup<ReviewForm> = createReviewForm(this.fb);
  get starCtrl() { return this.form.controls.star; }
  get Readly() { return Readly; }
  hoveredStar = 0;
  currentTab = 'reviews';
  reviews = [
    { name: 'Anne Clark', rating: 5, comment: 'An excellent guide to modern UI design.' },
    { name: 'Matthew Turner', rating: 4, comment: 'A solid read with practical advice.' },
  ];

  onSubmit(e: Event): void {
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
