import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth-services/index';
import { MessagesService } from '@core/services/messages.service';
import { InputComponent, InputType } from '@features/custom-form';
import { DynamicValidatorMessage } from '@features/custom-form/validators';
import { MessageSeverity } from '@types';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
   imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage
  ],
  templateUrl: './forget-password.component.html',
})
export class ForgotPasswordComponent  {
  form!: FormGroup;
  InputType = InputType
  authService = inject(AuthService);
  messages = inject(MessagesService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(event: Event) {
    if (this.form.invalid) return;
    this.authService.sendResetotp(this.form.value.email).subscribe({
      next: (response) => {
        this.messages.showMessage({
          text: response.message,
          severity: MessageSeverity.Success,
        });
        this.router.navigate(['/reset-password'])
      },
    })
  }
}
