import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['emilys'],
    password: ['emilyspass']
  })

  authService = inject(AuthService);
  router = inject(Router);

  async onLogin() {
    try {
      const {username, password} = this.form.value;
      if(!username || !password) {
       console.log("error")
        return;
      }

      await this.authService.login(username, password);
      await this.router.navigate(['/home']);
    }
    catch(err) {
     console.error(err);
    }
  }
}
