import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '@auth-services/auth.service';
import { login } from '@auth-store/auth.action';
import { selectIsLoggedIn } from '@auth-store/auth.selector';
import { LoginCredentials } from '@auth-types/user';
import { MessagesService } from '@core/services/messages.service';
import { InputComponent, InputType } from "@features/custom-form";
import { DynamicValidatorMessage } from '@features/custom-form/validators';
import { Store } from '@ngrx/store';
import { MessageSeverity } from '@types';
import { from, of } from 'rxjs';
import { exhaustMap, filter, switchMap, take, tap } from 'rxjs/operators';

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
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })
  
  onSubmit(e: Event): void {
    const credentials: LoginCredentials = this.form.value as LoginCredentials;
    
    from([credentials])
      .pipe(
        exhaustMap(creds =>
          of(this.store.dispatch(login(creds))).pipe(
            switchMap(() =>
              this.store.select(selectIsLoggedIn).pipe(
                filter(isLoggedIn => isLoggedIn),
                take(1),
                tap(() => this.router.navigate(['/books']))
              )
            ),
          )
        )
      )
      .subscribe({
        next: () => {
          this.messages.showMessage({
            text: ` ${credentials.username} წარმატებით შევიდა სისტემაში!`,
            severity: MessageSeverity.Success,
          });
        },
      });
      this.formDir.resetForm(this.form.value);
  }


}
