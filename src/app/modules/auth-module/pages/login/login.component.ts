import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import * as AuthActions from '@auth-module';
import { LoginCredentials, selectUserResponse, UserSafeInSystem } from '@auth-module';
import { MessagesService } from '@core';
import { DynamicValidatorMessage, InputComponent, InputType } from '@features';
import { Store } from '@ngrx/store';
import { MessageSeverity } from '@types';
import { filter, take, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      InputComponent,
      FormsModule,
      DynamicValidatorMessage,
      RouterModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #messages = inject(MessagesService);
  #store = inject(Store);

  InputType = InputType;
  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;

  form = this.#fb.nonNullable.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  
  onSubmit(): void {
    if(this.form.invalid) return;

    const credentials: LoginCredentials = this.form.getRawValue() as LoginCredentials;
    
    this.#store.dispatch(AuthActions.login(credentials));

    this.#store
      .select(selectUserResponse)
        .pipe(
          filter(response => !!response),
          take(1),
          tap((response) => {
            if(response.result) {
              const user: UserSafeInSystem = {
                userId: response.data.userId,
                emailId: response.data.emailId
              }

              localStorage.setItem(environment.USER_STORAGE_KEY, JSON.stringify(user))

              this.#messages.showMessage({
                text: response.message,
                severity: MessageSeverity.Success,
              });

              this.#router.navigate(['/books']);
            }
            this.formDir.resetForm();
        })
    ).subscribe();
  }
}
