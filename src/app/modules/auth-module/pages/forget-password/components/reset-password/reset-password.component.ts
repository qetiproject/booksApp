import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth-services/auth.service';
import { MessagesService } from '@core/services/messages.service';
import { InputComponent, InputType } from '@features/custom-form';
import { DynamicValidatorMessage } from '@features/custom-form/validators';
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
      otp: [null, [Validators.required]],
      newPassword: ['', Validators.required, Validators.minLength(8)]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.authService.resetPassword(this.form.value).subscribe({
        next: (response) => {
          this.messages.showMessage({
            text: response.message,
            severity: MessageSeverity.Success,
          });
          this.router.navigate(['/login'])
        },
        error: (err) => console.log(err)
      })
      console.log('Reset email sent to:', this.form.value.email);
    }
  }
}
