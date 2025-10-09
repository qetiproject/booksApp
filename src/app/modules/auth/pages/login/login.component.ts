import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '@auth-services/auth.service';
import { login } from '@auth-store/auth.action';
import { selectIsLoggedIn } from '@auth-store/auth.selector';
import { InputComponent } from "@features/custom-form";
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    InputComponent
],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  store = inject(Store);
  authService = inject(AuthService);
  router = inject(Router);
  
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  
  onLogin() {
    try {
      console.log(this.form.value, "value")
      const {username, password} = this.form.value;
      if(!username || !password) {
        return;
      }

      this.store.dispatch(login({ username, password }));

      this.store.select(selectIsLoggedIn).pipe(
        filter(loggedIn => loggedIn),
        take(1)
      ).subscribe(() => this.router.navigate(['/books']));
    }
    catch(err) {
     console.error(err);
    }
    console.log(this.form.value, "value")
  }


}
