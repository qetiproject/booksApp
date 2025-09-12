import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, tap } from 'rxjs';
import { createReviewForm } from '../../../../utils/review-form.factory';
import { Readly, ReviewForm, WhenToRead } from '../../types/review';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit{
  fb = inject(FormBuilder);

  form: FormGroup<ReviewForm> = createReviewForm(this.fb);

  get readCtrl() { return this.form.controls.read; }
  get starCtrl() { return this.form.controls.star; }
  get Readly() { return Readly; }
  get whenToReadCtrl(): FormControl<WhenToRead | null> { 
    return this.form.controls.whenToRead; 
  }
  whenToReadOptions = Object.values(WhenToRead);

  @ViewChild(FormGroupDirective, { static: false })
  private formDir!: FormGroupDirective;

  ngOnInit(): void {
    this.setupReadValidation();
  }

  private setupReadValidation(): void {
    this.readCtrl.valueChanges
      .pipe(
        startWith(this.readCtrl.value),
        distinctUntilChanged(),
        tap(read => {
          if (read === Readly.Unread) {
            this.whenToReadCtrl.setValidators([Validators.required]);
          } else {
            this.whenToReadCtrl.clearValidators();
            this.whenToReadCtrl.setValue(null);
          }
          this.whenToReadCtrl.updateValueAndValidity();
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  onSubmit(e: Event): void {
    this.formDir.resetForm(this.form.value);
  }
  onReset(e: Event) {
    e.preventDefault();
    this.formDir.reset(this.form.value);
  }


    newReview = { name: '', rating: 0, comment: '' };
  currentTab = 'reviews';

  reviews = [
    { name: 'Anne Clark', rating: 5, comment: 'An excellent guide to modern UI design.' },
    { name: 'Matthew Turner', rating: 4, comment: 'A solid read with practical advice.' },
  ];
  addReview() {
    if (this.newReview.name && this.newReview.rating && this.newReview.comment) {
      this.reviews.push({ ...this.newReview });
      this.newReview = { name: '', rating: 0, comment: '' };
      this.currentTab = 'reviews';
    }
  }
}
