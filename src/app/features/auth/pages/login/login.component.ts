import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { login } from '../../store/auth.action';

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

      this.store.dispatch(login({username: username, password: password}))
      
      this.router.navigate(['/home']);
    }
    catch(err) {
     console.error(err);
    }
  }


}
