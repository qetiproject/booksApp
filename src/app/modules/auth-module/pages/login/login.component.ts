import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import * as AuthActions from '@auth-module';
import { AuthService, LoginCredentials, selectUserResponse } from '@auth-module';
import { MessagesService } from '@core';
import { DynamicValidatorMessage, InputComponent, InputType } from '@features';
import { Store } from '@ngrx/store';
import { MessageSeverity } from '@types';
import { filter, take, tap } from 'rxjs';

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
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  messages = inject(MessagesService);
  store = inject(Store);
  InputType = InputType;
  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;

  form = this.fb.nonNullable.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  
  onSubmit(e: Event): void {
    const credentials: LoginCredentials = this.form.value as LoginCredentials;
    
    this.store.dispatch(AuthActions.login(credentials));

    this.store.select(selectUserResponse).pipe(
        filter(response => !!response),
        take(1),
        tap((response) => {
          if(response.result) {
            this.messages.showMessage({
              text: response.message,
              severity: MessageSeverity.Success,
            });
            this.router.navigate(['/books']);
          }
          this.formDir.resetForm();
      })
    ).subscribe();
    this.formDir.resetForm(this.form.value);
  }
}
