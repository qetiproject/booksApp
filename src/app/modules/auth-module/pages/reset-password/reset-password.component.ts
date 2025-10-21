import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth-module';
import { MessagesService } from '@core';
import { DynamicValidatorMessage, InputComponent, InputType } from '@features';
import { MessageSeverity } from '@types';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  InputType = InputType
  authService = inject(AuthService);
  messages = inject(MessagesService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(event: Event) {
    if (this.form.invalid) return;
    this.authService.resetPassword(this.form.value)
      .subscribe({
        next: (response) => {
          this.messages.showMessage({
            text: response,
            severity: MessageSeverity.Success,
          });
          this.router.navigate(['/login'])
        }
      })
  }
}
