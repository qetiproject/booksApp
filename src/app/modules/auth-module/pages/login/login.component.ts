import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MessagesService } from '@core/services/messages.service';
import { InputComponent, InputType } from "@features/custom-form";
import { DynamicValidatorMessage } from '@features/custom-form/validators';
import { Store } from '@ngrx/store';
import { MessageSeverity } from '@types';
import { AuthService } from 'modules/auth-module/services/auth.service';
import { selectIsLoggedIn } from 'modules/auth-module/store/auth.selector';
import { LoginCredentials } from 'modules/auth-module/types/user';
import { filter, take, tap } from 'rxjs';
import * as AuthActions from '../../store/auth.action';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    InputComponent,
    FormsModule,
    DynamicValidatorMessage
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

    this.store.select(selectIsLoggedIn).pipe(
        filter(isLoggedIn => isLoggedIn),
        take(1),
        tap(() => {
          this.router.navigate(['/books']);
          this.messages.showMessage({
            text: `${credentials.emailId} წარმატებით შევიდა სისტემაში!`,
            severity: MessageSeverity.Success,
          });
          this.formDir.resetForm();
      })
    ).subscribe();
    this.formDir.resetForm(this.form.value);
  }
}
