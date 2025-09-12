import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith, tap } from 'rxjs';

export enum Readly {
  Read = "Read",
  Unread = "Not Read Yet"
}

export enum WhenToRead {
  Today = "Today",
  In1Week = "In 1 week",
  In2Weeks = "In 2 Weeks",
  In1Month = "In 1 month",
  ThisYear = "This Year"
}

export interface ReviewForm {
  comment: FormControl<string>;
  star: FormControl<number>;
  read: FormControl<Readly>;
  whenToRead?: FormControl<WhenToRead | null>;
}
@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
})
export class AddReviewComponent implements OnInit{
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    comment: this.fb.nonNullable.control('', Validators.maxLength(500)),
    star: this.fb.nonNullable.control(0, [Validators.min(1), Validators.max(5)]),
    read: this.fb.nonNullable.control(Readly.Read),
    whenToRead: this.fb.control<WhenToRead | null>(WhenToRead.Today)
  });

  get readCtrl() { return this.form.controls.read; }
  get whenToReadCtrl() { return this.form.controls.whenToRead; }
  get starCtrl() { return this.form.controls.star; }
  
  whenToReadOptions = Object.values(WhenToRead);
  
  @ViewChild(FormGroupDirective, { static: false })
  private formDir!: FormGroupDirective;
  
  get Readly() {
    return Readly; 
  }

  ngOnInit(): void {
    this.readCtrl.valueChanges.pipe(
      startWith(this.readCtrl.value),
      tap(read => {
        if (read === Readly.Unread) {
          this.whenToReadCtrl.setValidators(Validators.required)
        }else {
          this.whenToReadCtrl.clearValidators();
          this.whenToReadCtrl.setValue(null);
        }
        this.whenToReadCtrl.updateValueAndValidity();
      }),
    ).subscribe();
  }

  onSubmit(e: Event): void {
    this.formDir.resetForm(this.form.value);
  }
  onReset(e: Event) {
    e.preventDefault();
    this.formDir.reset(this.form.value);
  }
}
