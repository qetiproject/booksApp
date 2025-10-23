import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import * as AuthActions from '@auth-module';
import { AuthService, RegisterCredentionals, selectUserResponse } from '@auth-module';
import { MessagesService } from '@core';
import { DynamicValidatorMessage, InputComponent, InputType, UniqueEmailValidator } from '@features';
import { Store } from '@ngrx/store';
import { MessageSeverity } from '@types';
import { filter, take } from 'rxjs';

@Component({
    selector: 'register-user',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      InputComponent,
      DynamicValidatorMessage,
    ],
    templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  messages = inject(MessagesService);
  store = inject(Store);
  uniqueEmailValidator = inject(UniqueEmailValidator);

  InputType = InputType;
  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;
  
  form = this.fb.nonNullable.group({
    emailId: ['', {
      Validators: [Validators.required, Validators.email],
      asyncValidators: [
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)
        ],
        updateOn: 'blur'
    }],
    fullName: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  
  onSubmit(e: Event): void {
    const credentials: RegisterCredentionals = this.form.value as RegisterCredentionals
    
    this.store.dispatch(AuthActions.register({user: credentials}))
    
    this.store.select(selectUserResponse).pipe(
      filter(response => !!response),
      take(1),
    ).subscribe({
      next: (response) => {
        this.messages.showMessage({
          text: response.message,
          severity: response.result ? MessageSeverity.Success : MessageSeverity.Error,
        });

        if(response.result) {
          this.router.navigate(['/login']);
        }
      },
    })
    this.formDir.resetForm(this.form.value);
  }
}
