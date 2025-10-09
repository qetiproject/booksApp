import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '@auth-services/auth.service';
import { login } from '@auth-store/auth.action';
import { selectIsLoggedIn } from '@auth-store/auth.selector';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  store = inject(Store);
  
  form = this.fb.group({
    username: ['emilys'],
    password: ['emilyspass']
  })

  authService = inject(AuthService);
  router = inject(Router);

  onLogin() {
    try {
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
  }


}
