import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MessagesService } from '@core/services/messages.service';
import { InputComponent, InputType } from '@features/custom-form';
import { DynamicValidatorMessage } from '@features/custom-form/validators';
import { UniqueEmailValidator } from '@features/custom-form/validators/unique-email.validator';
import { Store } from '@ngrx/store';
import { MessageSeverity } from '@types';
import { AuthService } from 'modules/auth-module/services/auth.service';
import { selectuserRegistered } from 'modules/auth-module/store/auth.selector';
import { RegisterUserRequest } from 'modules/auth-module/types/user';
import { filter, take } from 'rxjs';
import * as AuthActions from '../../store/auth.action';

@Component({
    selector: 'register-user',
    standalone: true,
    imports: [
      CommonModule,
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
    emailId: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', 
      {
        validators: [Validators.required, Validators.minLength(8)],
        // asyncValidators: [
        //   this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)
        // ],
        // updateOn: 'blur'
      }
    ]
  })
  
  onSubmit(e: Event): void {
    const credentials: RegisterUserRequest = this.form.value as RegisterUserRequest
    
    this.store.dispatch(AuthActions.register({user: credentials}))
    
    this.store.select(selectuserRegistered).pipe(
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
